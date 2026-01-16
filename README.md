# 🎓 MASTER EXAM GUIDE: React Native + Express

Follow this guide strictly from **Top to Bottom**. Do not skip steps.

---

## phase 1: Create the Main Project Folder
**Goal:** Create the container for your whole project.

1.  Open your Terminal (Command Prompt or PowerShell).
2.  Navigate to where you want to work (e.g., Desktop or D: drive):
    ```powershell
    cd D:
    ```
3.  Create the main project folder (Name it whatever you want, e.g., `ExamProject`):
    ```powershell
    mkdir ExamProject
    cd ExamProject
    ```

---

## Phase 2: The Server (Backend)
**Order:** We create the Server **FIRST** because it is faster and allows us to test the connection immediately after creating the App.

### Step 1: Initialize Server
1.  Create the server folder:
    ```powershell
    mkdir server
    cd server
    ```
2.  Initialize Node.js (creates `package.json`):
    ```powershell
    npm init -y
    ```

### Step 2: Install Libraries
Run these two commands to get the tools you need:
```powershell
npm install express cors
npm install --save-dev nodemon
```

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
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow cross-origin requests (important for React Native)
app.use(express.json()); // Parse incoming JSON data

// Basic Route
app.get('/', (req, res) => {
    res.send('Hello from the Express Serverrrrrrrrrrrrrr!');
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
    ```

### Step 5: Start the Server
Run this command and **keep this terminal open**:
```powershell
npm run dev
```

---

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
**Note:** For this exam strategy, we are testing on the **Web Browser**, so we can skip the IP address step and just use `localhost`.

1.  Open `client/app/(tabs)/index.tsx`.
2.  Delete the existing code and paste this:
    ```tsx
    import { Image, StyleSheet, Platform, Button, Text, View } from 'react-native';
import { useState } from 'react';

export default function HomeScreen() {
  const [message, setMessage] = useState('Waiting for server...');

  // The Fetch Function
  const fetchData = async () => {
    try {
      // Web-only Exam configuration (Using localhost)
      const response = await fetch('http://localhost:5000');
      const data = await response.text();
      setMessage(data);
    } catch (error) {
      console.error(error);
      setMessage('Error connecting to server');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MadCT App</Text>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Server Status:</Text>
        <Text style={styles.serverMessage}>{message}</Text>
      </View>

      <Button title="Test Connection" onPress={fetchData} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  serverMessage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF', // Blue color
  },
});



---

## Phase 4: Run & Test (The Execution Order)

**CRITICAL RULE: Always start the SERVER first.**

### Step 1: Start the Backend (Terminal 1)
1.  Open a Terminal.
2.  Navigate to server:
    ```powershell
    cd server
    ```
3.  Run the server:
    ```powershell
    npm run dev
    ```
    *Wait until you see: "Server is running..."*

### Step 2: Start the Frontend (Terminal 2)
1.  Open a **NEW** Terminal (Do not close the first one).
2.  Navigate to client:
    ```powershell
    cd client
    ```
3.  Run the app:
    ```powershell
    npx expo start
    ```

### Step 3: View the App
-   **For Web (Exam Recommended):** Press `w` in the second terminal.
-   **For Mobile:** Scan the QR code.
-   **Result:** Press the button and see "Hello from Server...".
