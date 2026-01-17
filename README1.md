## phase 1: Create the Main Project Folder

## Phase 2: The Server (Backend)
1. Step 1: Initialize Server
cd (main name) server

2.  Initialize Node.js (creates `package.json`):
    
    npm init -y

### Step 2: Install Libraries
Run these two commands to get the tools you need:


npm install express cors
npm install --save-dev nodemon

### Step 3: Configure Scripts
1.  Open `package.json` in VS Code.
2.  Find the `"scripts"` section.
3.  **Delete** the `"test"` line and **Paste** these two lines:
    ```json

    "start": "node server.js",
    "dev": "nodemon server.js"
    ```
    *(WARNING: Do not write comments like // inside this file)*

# change 
"main": "server.js",
### Step 4: Write the Server Code
1.  Create the file:
    ```powershell
    ni server.js
    ```
    *(Or just standard file creation in VS Code)*

2.  Paste this code into `server.js`:
    ```javascript

# before pasting lets create database, setting up the db ,so that the db name dont give any error
## Phase 5: Database Setup (XAMPP)

1. **Start XAMPP:**
   - Open **XAMPP Control Panel**.
   - Start **Apache** and **MySQL**.

2. **Create Database:**
   - Click **Admin** next to MySQL to open **phpMyAdmin**.
   - Create a NEW database named `react_native_db`.
3. **Create Table:**
   - Run this SQL (or use the UI) to create the `users` table:
   ```sql
   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     email VARCHAR(100)
   );
   ```

   ## Phase 6: Updated Server Code (Full Version)

We installed `mysql2` to handle the connection:
```bash
cd server
npm install mysql2
```

### `server/server.js` (Complete File)
Copy and paste this into your `server.js`. This version includes the **Port 5001** fix and **Debug Logging**.
```
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2'); // 1. Import the mysql2 library

const app = express();
const PORT = 5001;

// Middleware
app.use(cors());
app.use(express.json());

// Request logger to help debug
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// 2. Create the Database Connection
const db = mysql.createConnection({
    host: 'localhost',      // XAMPP is running locally
    user: 'root',           // Default XAMPP MySQL username
    password: '',           // Default XAMPP MySQL password is empty
    database: 'react_native_db' // database name you created in Step 1
});

// 3. Connect to the Database
db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('✅ Connected to MySQL database successfully!');
});

// Basic Route
app.get('/', (req, res) => {
    res.send('Hello from the Expres Server!');
});
// Get all users
app.get('/users', (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});
// Create a new user
app.post('/users', (req, res) => {
    // 1. Log what we received (To verify data is arriving)
    console.log("POST /users received:", req.body);

    const sql = "INSERT INTO users (name, email) VALUES (?, ?)";
    const values = [req.body.name, req.body.email];

    db.query(sql, values, (err, data) => {
        if (err) {
            // 2. Log the critical SQL error
            console.error("SQL Error:", err);
            // 3. Return it as JSON so the app doesn't get "<!DOCTYPE html>"
            return res.status(500).json({ error: err.message, sqlMessage: err.sqlMessage });
        }
        return res.json({ message: "User added successfully", id: data.insertId });
    });
});


// Start Server
app.listen(PORT, 'localhost', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// 404 Catch-all (to prevent HTML responses)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found", path: req.url });
});

```





### Frontend -------------------------------------------------
## Phase 3: The Client (Frontend)
**Goal:** Create the Mobile App.

### Step 1: Create the App
1.  Open a **NEW Terminal** (Do not close the server terminal).
2.  Navigate back to your main project folder:
    ```powershell
    cd ..
    # Ensure you are in 'ExamProject', NOT 'ExamProject/server'
    ```
3.  Run the Expo creator:
    ```powershell
    npx create-expo-app@latest client
    ```
    *(Press 'y' if asked to install anything)*

### Step 2: Connect Code (Web Method)
• A client/
 folder for the Expo app (app/index.tsx for input, 

                        app/display.tsx for the list).

### code for index.tsx
import { StyleSheet, Button, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router'; // Import Router for navigation

export default function HomeScreen() {
  const router = useRouter(); // Initialize navigation
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Function to save data and then navigate
  const handleSubmit = async () => {
    if (!name || !email) {
      alert("Please fill all fields");
      return;
    }

    try {
      console.log("Sending data to MySQL...");
      const response = await fetch('http://localhost:5001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      const result = await response.json();

      if (response.ok) {
        alert('Work 1 Done: Saved to Database!');

        // Clear fields
        setName('');
        setEmail('');

        // Work 2: Navigate to the next page
        console.log("Navigating to Display Page...");
        router.push('/display');
      } else {
        alert('Server Error: ' + JSON.stringify(result));
      }
    } catch (error: any) {
      alert('Network Error: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Entry Form</Text>
      <Text style={styles.subtitle}>Phase 1: Enter details to save in DB</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name:</Text>
        <TextInput
          placeholder="Enter your name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        <Text style={styles.label}>Email Address:</Text>
        <TextInput
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit & View Results</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.footer}>Clicking Submit saves to DB AND takes you to Page 2</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    elevation: 5, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 20,
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  }
});


### display.tsx
import { StyleSheet, Text, View, ScrollView, Button } from 'react-native';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function DisplayScreen() {
    const [users, setUsers] = useState([]);
    const router = useRouter();

    // Fetch from DB as soon as this page opens
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
           const response = await fetch('http://localhost:5001/users');
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            alert("Error fetching data from Database");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Data Display Page</Text>
            <Text style={styles.info}>This data is coming directly from MySQL</Text>

            <ScrollView style={styles.listContainer}>
                {users.map((user: any) => (
                    <View key={user.id} style={styles.card}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={{ marginTop: 20, width: '100%' }}>
                <Button title="Go Back to Form" onPress={() => router.back()} color="#007AFF" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 50,
        backgroundColor: '#fff',
        alignItems: 'center'
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333'
    },
    info: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
        fontStyle: 'italic'
    },
    listContainer: {
        width: '100%',
    },
    card: {
        padding: 15,
        backgroundColor: '#f8f9fa',
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#eee',
        width: '100%'
    },
    name: { fontSize: 18, fontWeight: 'bold', color: '#000' },
    email: { fontSize: 14, color: '#555' }
});


