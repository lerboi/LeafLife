import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';
import { supabase } from '../../../util/supabaseClient';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin() {
        console.warn('Starting login process...');
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            console.warn('Attempting login with:', email);

            // Add timeout to the API call
            const loginPromise = supabase.auth.signInWithPassword({
                email: email.trim(),
                password: password,
            });

            // Create a timeout promise
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), 10000)
            );

            // Race between the API call and timeout
            const { data, error } = await Promise.race([
                loginPromise,
                timeoutPromise
            ]);

            console.warn('Login response:', { data, error });

            if (error) throw error;

            if (data?.user) {
                console.warn('Login successful');
                // No need to navigate manually - App.js will handle this
                // based on the session state
            } else {
                throw new Error('No user data received');
            }

        } catch (error) {
            console.warn('Login error:', error.message);
            let errorMessage = error.message;
            if (error.message.includes('Invalid login credentials')) {
                errorMessage = 'Invalid email or password';
            }
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to LeafLife</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoComplete="password"
            />
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('CreateAccount')}
                disabled={loading}
            >
                <Text style={styles.link}>Don't have an account? Create one</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1b2329',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#2c353d',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
        color: '#fff',
    },
    button: {
        backgroundColor: '#8A9A5B',
        padding: 15,
        borderRadius: 10,
        marginBottom: 15,
    },
    buttonDisabled: {
        backgroundColor: '#4a5a3b',
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    link: {
        color: '#8A9A5B',
        textAlign: 'center',
    },
});
