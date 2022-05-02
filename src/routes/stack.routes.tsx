import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import TodoListScreen from '../screens/TodoListScreen';

export type RootStackParamList = {
  ToDo: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const StackRoutes = () => (
  <Stack.Navigator
    screenOptions={{
      ...TransitionPresets.SlideFromRightIOS,
      cardStyle: { backgroundColor: 'transparent' },
      headerShown: true,
    }}
  >
    <Stack.Screen
      name="ToDo"
      component={TodoListScreen}
      options={{ title: 'To do List' }}
    />
  </Stack.Navigator>
);
