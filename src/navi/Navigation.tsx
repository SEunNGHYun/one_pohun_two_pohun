import React, {useEffect, useCallback, useState} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useRecoilState, useSetRecoilState, useRecoilValue} from 'recoil';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {userState, appTheme} from '../recoils/states';
//회원가입
import NickName from '../Pages/BeforeSignUp/NickName';
import Targetcost1 from '../Pages/BeforeSignUp/Targetcost1';
import Targetcost2More from '../Pages/BeforeSignUp/Targetcost2More';
import Targetcost2Less from '../Pages/BeforeSignUp/Targetcost2Less';
// 메인
import Main from '../Pages/AfterLogin/Main/Main';
import AddCost from '../Pages/AfterLogin/Main/AddCost';
import EachDayCost from '../Pages/AfterLogin/Main/EachDayCost';
import EventPage_Graph from '../Pages/AfterLogin/Main/EventPage_Graph';
//배틀
import Pig from '../Pages/AfterLogin/Pigs/Pig';
import MakePigBattleRoom from '../Pages/AfterLogin/Pigs/MakePigBattleRoom';
import PigBattleRoom from '../Pages/AfterLogin/Pigs/PigBattleRoom';
import MatchingRoom from '../Pages/AfterLogin/Pigs/MatchingRoom';
//세팅
import Settings from '../Pages/AfterLogin/Settings/Settings';

import {descColor} from '../utils/styles';
import type {NewAsset, UserData, Themes} from '../types/types';

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

export type MainStackParamList = {
  Main: undefined;
  AddCost: undefined;
  EventPage_G: undefined;
};

export type PigStackParamList = {
  Pig: undefined;
  MakePigBattleRoom: undefined;
  MatchingRoom: {
    roomKey: string;
  };
  PigBattleRoom: {
    roomKey: string;
  };
};

export type BeforeLoginStackParamList = {
  Targetcost2More: {
    img: NewAsset;
    nickname: string;
    userCost: number;
  };
  Targetcost2Less: {
    img: NewAsset;
    nickname: string;
    userCost: number;
  };
  Targetcost1: {
    img: NewAsset;
    nickname: string;
  };
  NickName: undefined;
};

export type AfterLoginTabParamList = {
  MainStack: MainStackParamList;
  PigStack: PigStackParamList;
  Settings: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  AfterLogin: AfterLoginTabParamList;
  BeforeLogin: BeforeLoginStackParamList;
};

const MainStack = createNativeStackNavigator<MainStackParamList>();
const PigStack = createNativeStackNavigator<PigStackParamList>();

const MainTab = createMaterialBottomTabNavigator<AfterLoginTabParamList>();

const BeforeLoginStack =
  createNativeStackNavigator<BeforeLoginStackParamList>();

const RootStack = createNativeStackNavigator<RootStackParamList>();

function BeforeLoginNavigation() {
  const {Navigator, Screen} = BeforeLoginStack;
  return (
    <Navigator screenOptions={options}>
      <Screen name="NickName" component={NickName} />
      <Screen name="Targetcost1" component={Targetcost1} />
      <Screen name="Targetcost2More" component={Targetcost2More} />
      <Screen name="Targetcost2Less" component={Targetcost2Less} />
    </Navigator>
  );
}

function MainNavigation() {
  const {Navigator, Screen} = MainStack;

  return (
    <Navigator screenOptions={options}>
      <Screen name="Main" component={Main} />
      <Screen name="AddCost" component={AddCost} />
      <Screen name="EventPage_G" component={EventPage_Graph} />
    </Navigator>
  );
}

function PigNavigation() {
  const {Navigator, Screen} = PigStack;

  return (
    <Navigator screenOptions={options}>
      <Screen name="Pig" component={Pig} />
      <Screen name="MakePigBattleRoom" component={MakePigBattleRoom} />
      <Screen name="MatchingRoom" component={MatchingRoom} />
      <Screen name="PigBattleRoom" component={PigBattleRoom} />
    </Navigator>
  );
}

function TabNavigation() {
  const {Navigator, Screen} = MainTab;
  const getAppTheme = useRecoilValue<Themes>(appTheme);

  return (
    <Navigator activeColor={getAppTheme} inactiveColor={descColor}>
      <Screen
        name="MainStack"
        component={MainNavigation}
        options={{
          title: '홈',
          tabBarIcon: ({_, color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Screen
        name="PigStack"
        component={PigNavigation}
        options={{
          title: '배틀',
          tabBarIcon: ({_, color}) => (
            <MaterialCommunityIcons name="piggy-bank" color={color} size={26} />
          ),
        }}
      />
      <Screen
        name="Settings"
        component={Settings}
        options={{
          title: '설정',
          tabBarIcon: ({_, color}) => (
            <MaterialCommunityIcons name="cog" color={color} size={26} />
          ),
        }}
      />
    </Navigator>
  );
}

export default function RootNavigation() {
  const {Navigator, Screen} = RootStack;
  const [userData, setUserData] = useRecoilState<UserData>(userState);
  const setAppTheme = useSetRecoilState<Themes>(appTheme);

  const getUserDataInDevice = useCallback(async () => {
    try {
      const [getUserDataArr, getAppThemeArr] = await AsyncStorage.multiGet([
        'user_data',
        'appThemeColor',
      ]);
      const [__, getUserData] = getUserDataArr;
      const [_, getAppTheme] = getAppThemeArr;
      if (getUserData !== null) {
        let userDataInDevice = JSON.parse(getUserData);
        setUserData(userDataInDevice);
      }
      if (getAppTheme !== null) {
        setAppTheme(getAppTheme as Themes);
      }
    } catch (err) {
    } finally {
      console.log('splash end');
      LottieSplashScreen.hide();
    }
  }, [setUserData, setAppTheme]);

  useEffect(() => {
    getUserDataInDevice();
  }, [getUserDataInDevice]);

  return (
    <NavigationContainer>
      <Navigator screenOptions={options}>
        {userData.nickname === '' ? (
          <Screen name="BeforeLogin" component={BeforeLoginNavigation} />
        ) : (
          <Screen name="AfterLogin" component={TabNavigation} />
        )}
      </Navigator>
    </NavigationContainer>
  );
}

export type PigUseNaviProps = NativeStackNavigationProp<PigStackParamList>;
export type PigNaviProps = NativeStackScreenProps<PigStackParamList>;
