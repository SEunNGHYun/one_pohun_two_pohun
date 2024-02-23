import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import database from '@react-native-firebase/database';
import UserDataHeader from '../../../Components/UserDataHeader';
import {userState, appTheme} from '../../../recoils/states';
import type {UserData, Themes} from '../../../types/types';
import {title4, defaultFont, descColor, grayColor} from '../../../utils/styles';
import TextAreaAndButtons from '../../../Components/InputButts';
import type {PigUseNaviProps} from '../../../navi/Navigation';
import {today} from '../../../utils/utils';

export default function MakePigBattleRoom() {
  const navigation = useNavigation<PigUseNaviProps>();
  const theme = useRecoilValue<Themes>(appTheme);
  const userData = useRecoilValue<UserData>(userState);
  const [cost, setCost] = useState<number>(0);
  const [period, setPeriod] = useState<string>(today);
  const [goal, setGoal] = useState<string>('');

  const pressInviteButt = useCallback(async () => {
    const createRoom = {
      user1: userData.nickname,
      user2: '',
      cost,
      period,
      goal,
    };
    try {
      const {key} = await database().ref('/battles').push(createRoom);
      if (typeof key === 'string') {
        navigation.navigate('MatchingRoom', {
          roomKey: key,
        });
      }
    } catch (err) {}
  }, [navigation, goal, period, cost, userData]);

  const changeGoalInput = useCallback((input: string) => {
    setGoal(input);
  }, []);

  return (
    <View style={styles.view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserDataHeader
          headerRange={3.5}
          imgSize={150}
          theme={theme}
          userData={userData}
        />
        <View style={styles.body}>
          <TextAreaAndButtons
            type="number"
            title={'총 목표 금액'}
            subtitle="최대 80만원"
            value={cost}
            setValue={setCost}
            mode="cost"
          />
          <TextAreaAndButtons
            type="string"
            title={'목표 기간'}
            mode="date"
            value={period}
            setValue={setPeriod}
          />
          <Text style={[styles.titleFont, {color: theme}]}>
            목표 {'\t'}
            <Text style={styles.subtitle}>(15자 이내로)</Text>
          </Text>
          <TextInput
            style={styles.textinput}
            placeholder="예시) 11월 일본여행?"
            onChangeText={changeGoalInput}
          />
          <Pressable
            disabled={!cost || !goal || period === today}
            onPress={pressInviteButt}>
            <View style={styles.bottom}>
              <Text
                style={[
                  styles.buttFont,
                  {
                    color:
                      !cost || !goal || period === today ? descColor : theme,
                  },
                ]}>
                초대하기
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={!cost || !goal || period === today ? descColor : theme}
                size={44}
              />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    paddingTop: 8,
    paddingHorizontal: 18,
  },

  titleFont: {
    ...title4,
    marginTop: 8,
  },
  subtitle: {
    ...defaultFont,
    fontSize: 15,
    color: descColor,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttFont: {fontSize: 22, fontWeight: 'bold'},
  textinput: {
    marginVertical: 18,
    borderWidth: 0.8,
    borderRadius: 8,
    padding: 10,
    borderColor: 'lightgray',
  },
});
