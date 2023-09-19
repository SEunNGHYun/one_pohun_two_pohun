import React, {useState} from 'react';
import codePush from 'react-native-code-push';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';

import Nickname from './src/Pages/Nickname';
import Targetcost1 from './src/Pages/Targetcost1';
import Targetcost2 from './src/Pages/Targetcost2';
import Mains from './src/Pages/Main';
import Pigs from './src/Pages/Pig';
import Settings from './src/Pages/Settings';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function FirstNavigation() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Targetcost2" component={Targetcost2} />
      <Stack.Screen name="Targetcost1" component={Targetcost1} />
      <Stack.Screen name="Nickname" component={Nickname} />
    </Stack.Navigator>
  );
}

function TabNavigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Mains" component={Mains} />
      <Tab.Screen name="Pigs" component={Pigs} />
      <Tab.Screen name="Setting" component={Settings} />
    </Tab.Navigator>
  );
}

function App() {
  const [first, setFirst] = useState(false);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {first ? (
          <Stack.Screen name="afterLogin" component={TabNavigation} />
        ) : (
          <Stack.Screen name="beforeLogin" component={FirstNavigation} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
//export default codePush(App);
