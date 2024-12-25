// src/components/Navbar.js
import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Navbar = ({ navigation, activeTab }) => {
    return (
        <View style={navbarStyles.navbar}>
            <TouchableOpacity
                style={navbarStyles.tab}
                onPress={() => navigation.navigate('Home')}
            >
                <Ionicons
                    name={activeTab === 'Home' ? 'home' : 'home-outline'}
                    size={24}
                    color={activeTab === 'Home' ? '#8A9A5B' : '#D3D3D3'}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={navbarStyles.tab}
                onPress={() => navigation.navigate('MyPlants')}
            >
                <Ionicons
                    name={activeTab === 'MyPlants' ? 'leaf' : 'leaf-outline'}
                    size={24}
                    color={activeTab === 'MyPlants' ? '#8A9A5B' : '#D3D3D3'}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={navbarStyles.centerTab}
                onPress={() => navigation.navigate('Camera')}
            >
                <View style={navbarStyles.centerButton}>
                    <Ionicons name="camera" size={32} color="white" />
                </View>
            </TouchableOpacity>

            <TouchableOpacity
                style={navbarStyles.tab}
                onPress={() => navigation.navigate('AIChat')}
            >
                <Ionicons
                    name={activeTab === 'AIChat' ? 'chatbubble' : 'chatbubble-outline'}
                    size={24}
                    color={activeTab === 'AIChat' ? '#8A9A5B' : '#D3D3D3'}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={navbarStyles.tab}
                onPress={() => navigation.navigate('More')}
            >
                <Ionicons
                    name={activeTab === 'More' ? 'menu' : 'menu-outline'}
                    size={24}
                    color={activeTab === 'More' ? '#8A9A5B' : '#D3D3D3'}
                />
            </TouchableOpacity>
        </View>
    );
};

const navbarStyles = StyleSheet.create({
    navbar: {
        flexDirection: 'row',
        backgroundColor: '#1b2329',
        height: 60,
        justifyContent: 'space-around',
        alignItems: 'center',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopWidth: 0.7,
        borderTopColor: '#D3D3D3',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centerTab: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -20,
    },
    centerButton: {
        backgroundColor: '#8A9A5B',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
});

export default Navbar;