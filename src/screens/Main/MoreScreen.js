import React from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../../util/supabaseClient';

export default function MoreScreen() {
    const handleLogout = async () => {
        Alert.alert(
            "Sign Out",
            "Are you sure you want to sign out?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Sign Out",
                    onPress: async () => {
                        try {
                            const { error } = await supabase.auth.signOut();
                            if (error) throw error;
                        } catch (error) {
                            Alert.alert('Error', error.message);
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.signOutButton}
                onPress={handleLogout}
            >
                <Ionicons
                    name="log-out-outline"
                    size={24}
                    color="#D3D3D3"
                />
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1b2329',
        alignItems: 'center',
        justifyContent: 'center',
    },
    signOutButton: {
        padding: 15,
        borderRadius: 10,
    },
});
