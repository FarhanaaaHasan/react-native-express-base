import { Image, StyleSheet, Platform, Button, Text, View, ScrollView, TextInput } from 'react-native'; // NEW: Added TextInput
import { useState } from 'react';

export default function HomeScreen() {
  const [users, setUsers] = useState([]);
  // NEW: State for the form inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Fetch Function (Existing)
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5001/users');
      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      console.error("Fetch Error:", error);
      alert('Error connecting to server: ' + error.message);
    }
  };

  // NEW: Function to Add User
  // NEW: Function to Add User (With Error Alerts)
  const addUser = async () => {
    console.log("Attempting to add user to 127.0.0.1:", name, email); // Debug log

    try {
      const response = await fetch('http://127.0.0.1:5001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email })
      });

      const result = await response.json(); // Get the actual response from server

      if (response.ok) {
        alert('Success: User Added!');
        setName('');
        setEmail('');
        fetchData();
      } else {
        // If the server says "No" (e.g. Database Error)
        alert('Server Error: ' + JSON.stringify(result));
      }
    } catch (error: any) {
      // If the internet/connection fails
      alert('Network Error: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Manager</Text>

      {/* NEW: Input Form */}
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Enter Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <Button title="Add New User" onPress={addUser} />
      </View>

      <View style={styles.divider} />

      <Button title="Refresh List" onPress={fetchData} color="gray" />

      <ScrollView style={styles.listContainer}>
        {users.map((user: any) => (
          <View key={user.id} style={styles.card}>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to start so it doesn't push to center
    backgroundColor: '#fff',
    padding: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  // NEW STYLES
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: '100%',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    width: '100%',
    marginVertical: 20,
  },
  // Existing styles...
  listContainer: {
    width: '100%',
    marginTop: 20,
  },
  card: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 14,
    color: 'gray',
  },
});