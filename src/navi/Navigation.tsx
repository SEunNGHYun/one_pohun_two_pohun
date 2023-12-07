import React, {useEffect, useCallback} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useRecoilState} from 'recoil';
import LottieSplashScreen from 'react-native-lottie-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {userState} from '../recoils/states';
//회원가입
import NickName from '../Pages/BeforeSignUp/NickName';
import Targetcost1 from '../Pages/BeforeSignUp/Targetcost1';
import Targetcost2More from '../Pages/BeforeSignUp/Targetcost2More';
import Targetcost2Less from '../Pages/BeforeSignUp/Targetcost2Less';
// 메인
import Main from '../Pages/AfterLogin/Main';
import AddCost from '../Pages/AfterLogin/AddCost';
import CostList from '../Pages/AfterLogin/CostList';
//배틀
import Pig from '../Pages/AfterLogin/Pigs/Pig';
import MakePigBattleRoom from '../Pages/AfterLogin/Pigs/MakePigBattleRoom';
import PigBattleRoom from '../Pages/AfterLogin/Pigs/PigBattleRoom';
import MatchingRoom from '../Pages/AfterLogin/Pigs/MatchingRoom';
//세팅
import Settings from '../Pages/AfterLogin/Settings/Settings';

import {primaryColor, descColor} from '../utils/styles';
import type {UserData} from '../types/types';

const options: NativeStackNavigationOptions = {
  headerShown: false,
};

export type MainStackParamList = {
  Main: undefined;
  AddCost: undefined;
  CostList: undefined;
};

export type PigStackParamList = {
  Pig: undefined;
  MakePigBattleRoom: undefined;
  MatchingRoom: undefined;
  PigBattleRoom: undefined;
};

export type BeforeLoginStackParamList = {
  Targetcost2More: {
    img: string | null;
    nickname: string;
    userCost: number;
  };
  Targetcost2Less: {
    img: string | null;
    nickname: string;
    userCost: number;
  };
  Targetcost1: {
    img: string | null;
    nickname: string;
  };
  NickName: undefined;
};

export type AfterLoginTabParamList = {
  MainStack: MainStackParamList;
  Pigs: PigStackParamList;
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
      <Screen name="CostList" component={CostList} />
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

  return (
    <Navigator activeColor={primaryColor} inactiveColor={descColor}>
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
        name="Pigs"
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

  const getLoginState = useCallback(async () => {
    try {
      const getUserData = await AsyncStorage.getItem('user_data');
      if (getUserData != null) {
        setUserData(JSON.parse(getUserData));
      }
    } catch (err) {
    } finally {
      LottieSplashScreen.hide();
    }
  }, [setUserData]);

  useEffect(() => {
    getLoginState();
  }, [getLoginState]);

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
