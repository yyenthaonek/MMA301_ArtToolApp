import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './types/route';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import Home from './screens/Home';
import Detail from './screens/Detail';
import Favorite from './screens/Favorite';
import { FavoriteProvider } from './context/FavoriteContext';
import { PaperProvider } from 'react-native-paper';
export default function App() {
  return (
    <FavoriteProvider>
      <PaperProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </PaperProvider>
    </FavoriteProvider>
  );
}

const MyStack = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={MyBottomTabs} options={{ headerShown: false }} />
      <Stack.Screen name="DetailScreen" component={Detail} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

const MyBottomTabs = () => {
  const Tabs = createBottomTabNavigator();
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <AntDesign name="home" size={size} color={color} />;
          } else if (route.name === 'Favorite') {
            return <MaterialIcons name="favorite" size={size} color={color} />;
          }
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#9ca3af',
      })}
    >
      <Tabs.Screen name="Home" component={Home} />
      <Tabs.Screen name="Favorite" component={Favorite} />
    </Tabs.Navigator>
  )
}