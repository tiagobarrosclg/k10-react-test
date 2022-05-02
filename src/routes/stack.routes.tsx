import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import { ToDo } from '~/screens/ToDo';

export type RootStackParamList = {
  ToDo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
      cardStyle: { backgroundColor: 'transparent' },
      headerShown: false,
    }}
  >
    <Stack.Screen name="ToDo" component={ToDo} />
  </Stack.Navigator>
);
