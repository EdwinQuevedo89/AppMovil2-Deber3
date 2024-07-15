import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ListPatientsScreen from '../screens/ListPatientsScreen';
import AddPatientScreen from '../screens/AddPatientScreen';

const Stack = createStackNavigator();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} options={{ headerShown: false }}/>
      <Stack.Screen name="ListPatientsScreen" component={ListPatientsScreen} options={{ headerShown: false }} />
      <Stack.Screen name="AddPatientScreen" component={AddPatientScreen} options={{ headerShown: false }} />
      
    </Stack.Navigator>
  );
}
