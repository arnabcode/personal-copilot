import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import TasksScreen from './src/screens/TasksScreen';
import PlacesScreen from './src/screens/PlacesScreen';
import SettingsScreen from './src/screens/SettingsScreen';

function Screen({ title }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0b1220' }}>
      <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>{title}</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#0b1220',
    card: '#0f172a',
    text: '#fff',
    border: '#1f2937',
    primary: '#6366f1',
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navTheme}>
        <Tab.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#0f172a' },
            headerTitleStyle: { color: '#fff' },
            tabBarStyle: { backgroundColor: '#0f172a', borderTopColor: '#1f2937' },
            tabBarActiveTintColor: '#6366f1',
            tabBarInactiveTintColor: '#94a3b8',
          }}
        >
          <Tab.Screen name="Tasks" component={TasksScreen} />
          <Tab.Screen name="Places" component={PlacesScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar style="light" />
    </SafeAreaProvider>
  );
}
