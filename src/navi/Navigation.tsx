import React, {useEffect} from 'react';

import {useRecoilState} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

import {LoginState} from '../recoils/states';
import Nickname from '../Pages/Nickname';
import Targetcost1 from '../Pages/Targetcost1';
import Targetcost2 from '../Pages/Targetcost2';
import Mains from '../Pages/Main';
import Pigs from '../Pages/Pig';
import Settings from '../Pages/Settings';

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

export type BeforeLoginStackParamList = {
  Targetcost2: undefined;
  Targetcost1: undefined;
  Nickname: undefined;
};

export type AfterLoginTabParamList = {
  Mains: undefined;
  Pigs: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  afterLogin: undefined;
  beforeLogin: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const BeforeLoginStack =
  createNativeStackNavigator<BeforeLoginStackParamList>();
const MainTab = createMaterialBottomTabNavigator<AfterLoginTabParamList>();

function FirstNavigation() {
  const {Navigator, Screen} = BeforeLoginStack;
  return (
    <Navigator screenOptions={options}>
      <Screen name="Nickname" component={Nickname} />
      <Screen name="Targetcost1" component={Targetcost1} />
      <Screen name="Targetcost2" component={Targetcost2} />
    </Navigator>
  );
}

function TabNavigation() {
  return (
    <MainTab.Navigator>
      <MainTab.Screen name="Mains" component={Mains} />
      <MainTab.Screen name="Pigs" component={Pigs} />
      <MainTab.Screen name="Settings" component={Settings} />
    </MainTab.Navigator>
  );
}

export default function RootNavigation() {
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const {Navigator, Screen} = RootStack;

  return (
    <NavigationContainer>
      <Navigator screenOptions={options}>
        {isLogin ? (
          <Screen name="afterLogin" component={TabNavigation} />
        ) : (
          <Screen name="beforeLogin" component={FirstNavigation} />
        )}
      </Navigator>
    </NavigationContainer>
  );
}
