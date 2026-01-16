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
