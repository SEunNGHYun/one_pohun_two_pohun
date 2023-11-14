import React, {useEffect} from 'react';

import {useRecoilState} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {
  NativeStackScreenProps,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {LoginState} from '../recoils/states';
import Nickname from '../Pages/BeforeLogin/Nickname';
import Targetcost1 from '../Pages/BeforeLogin/Targetcost1';
import Targetcost2More from '../Pages/BeforeLogin/Targetcost2More';
import Targetcost2Less from '../Pages/BeforeLogin/Targetcost2Less';

import Main from '../Pages/AfterLogin/Main';
import AddCost from '../Pages/AfterLogin/AddCost';
import CostList from '../Pages/AfterLogin/CostList';
// 메인
import Pig from '../Pages/AfterLogin/Pigs/Pig';
import MakePigBattleRoom from '../Pages/AfterLogin/Pigs/MakePigBattleRoom';
import PigBattleRoom from '../Pages/AfterLogin/Pigs/PigBattleRoom';
import MatchingRoom from '../Pages/AfterLogin/Pigs/MatchingRoom';
//배틀

import Settings from '../Pages/AfterLogin/Settings';

import {primaryColor, descColor} from '../utils/styles';

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
  Nickname: undefined;
};

export type AfterLoginTabParamList = {
  MainStack: MainStackParamList;
  Pigs: PigStackParamList;
  Settings: undefined;
};

export type RootStackParamList = {
  afterLogin: undefined;
  beforeLogin: undefined;
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
      <Screen name="Nickname" component={Nickname} />
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
  const [isLogin, setIsLogin] = useRecoilState(LoginState);
  const {Navigator, Screen} = RootStack;

  return (
    <NavigationContainer>
      <Navigator screenOptions={options}>
        {isLogin ? (
          <Screen name="afterLogin" component={TabNavigation} />
        ) : (
          <Screen name="beforeLogin" component={BeforeLoginNavigation} />
        )}
      </Navigator>
    </NavigationContainer>
  );
}

export type PigUseNaviProps = NativeStackNavigationProp<PigStackParamList>;
export type PigNaviProps = NativeStackScreenProps<PigStackParamList>;
