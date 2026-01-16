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
      const response = await fetch('http://127.0.0.1:5001/users', {
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