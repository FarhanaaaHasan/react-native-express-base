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
