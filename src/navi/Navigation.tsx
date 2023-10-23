import React, {useEffect} from 'react';

import {useRecoilState} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';

import {LoginState} from '../recoils/states';
import Nickname from '../Pages/BeforeLogin/Nickname';
import Targetcost1 from '../Pages/BeforeLogin/Targetcost1';
import Targetcost2More from '../Pages/BeforeLogin/Targetcost2More';
import Targetcost2Less from '../Pages/BeforeLogin/Targetcost2Less';

import Mains from '../Pages/AfterLogin/Main';
import Pigs from '../Pages/AfterLogin/Pig';
import Settings from '../Pages/AfterLogin/Settings';

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

export type BeforeLoginStackParamList = {
  Targetcost2More: undefined;
  Targetcost2Less: undefined;
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
      <Screen name="Targetcost2More" component={Targetcost2More} />
      <Screen name="Targetcost2Less" component={Targetcost2Less} />
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