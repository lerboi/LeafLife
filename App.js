import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useState, useEffect } from 'react';
import { supabase } from './util/supabaseClient';
import LoginScreen from './src/screens/Account/LoginScreen';
import CreateAccountScreen from './src/screens/Account/CreateAccountScreen';
import HomeScreen from './src/screens/Main/HomeScreen';
import MoreScreen from './src/screens/Main/MoreScreen';
import Navbar from './src/components/Navbar';

LogBox.ignoreAllLogs();

if (__DEV__) {
  const isAndroid = require('react-native').Platform.OS === 'android';
  if (isAndroid) {
    console.log = (...args) => {
      args.forEach(arg => {
        if (typeof arg === 'object') {
          arg = JSON.stringify(arg, null, 2);
        }
        console.warn(arg);
      });
    };
  }
}

const MyPlantsScreen = () => <View style={styles.container}></View>;
const CameraScreen = () => <View style={styles.container}></View>;
const AIChatScreen = () => <View style={styles.container}></View>;

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function AuthenticatedStack() {
  return (
    <Tab.Navigator
      tabBar={props => <Navbar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="MyPlants" component={MyPlantsScreen} />
      <Tab.Screen name="Camera" component={CameraScreen} />
      <Tab.Screen name="AIChat" component={AIChatScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session && session.user ? (
          <Stack.Screen name="Main" component={AuthenticatedStack} />
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1b2329',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
