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

export default function CreateAccountScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email) => {
        return email.match(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        );
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    async function handleSignUp() {
        console.warn('Starting sign up process...');
        if (!email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        try {
            setLoading(true);
            console.warn('Making Supabase API call...');

            // Add timeout to the API call
            const signUpPromise = supabase.auth.signUp({
                email: email.trim(),
                password: password,
                options: {
                    data: {
                        created_at: new Date().toISOString(),
                    }
                }
            });

            // Create a timeout promise
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Request timed out')), 10000)
            );

            // Race between the API call and timeout
            const { data, error } = await Promise.race([
                signUpPromise,
                timeoutPromise
            ]);

            console.warn('Supabase response received:', { data, error });

            if (error) {
                throw error;
            }

            if (data?.user) {
                console.warn('Account created successfully');
                Alert.alert(
                    'Success',
                    'Registration successful! Please check your email to verify your account.',
                    [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
                );
            } else {
                throw new Error('No user data received');
            }

        } catch (error) {
            console.warn('Sign up error:', error.message);
            Alert.alert('Error', error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
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
                autoComplete="password-new"
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#666"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                autoComplete="password-new"
            />
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleSignUp}
                disabled={loading}
            >
                <Text style={styles.buttonText}>
                    {loading ? 'Creating Account...' : 'Create Account'}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate('Login')}
                disabled={loading}
            >
                <Text style={styles.link}>Already have an account? Sign in</Text>
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
