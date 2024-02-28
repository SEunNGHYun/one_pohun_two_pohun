import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSetRecoilState} from 'recoil';
import database from '@react-native-firebase/database';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type {BeforeLoginStackParamList} from '../../navi/Navigation';
import UnderLineText from '../../modules/UnderLineText';
import {userState} from '../../recoils/states';
import {
  primaryColor,
  lightGrayColor,
  title2,
  subtitle,
  descColor,
  defaultFont,
} from '../../utils/styles';
import type {UserData} from '../../types/types';

type Props = NativeStackScreenProps<
  BeforeLoginStackParamList,
  'Targetcost2Less'
>;

export default function Targetcost2Less({route}: Props) {
  const [choice, setChoice] = useState<string>('');
  const [cost, setCost] = useState(0);
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState<boolean>(true);

  const setUserData = useSetRecoilState<UserData>(userState);

  const pressChoiceButt = useCallback(
    (t: 'yes' | 'no'): void => {
      const {userCost} = route.params;

      setChoice(t);
      setDisable(false);
      if (t === 'yes') {
        if (userCost > 0.3) {
          setCost(userCost - 0.3); // 3천원 부터 절약
        } else {
          setCost(0);
        }
      } else if (t === 'no') {
        setCost(userCost); //그대로
      }
    },
    [route],
  );

  const saveUserImageInStorage = useCallback(async () => {
    const {nickname, img} = route.params;
    const {uri, fileName, selectType} = img;
    const saveStorage = storage().ref(`profils/${nickname}/${fileName}`);
    if (selectType === 'defult') {
      return uri;
    }
    try {
      if (uri) {
        await saveStorage.putFile(uri);
      }
    } catch (err) {}

    return await saveStorage.getDownloadURL();
  }, [route.params]);

  const pressSignUp = useCallback(async () => {
    const {nickname, userCost} = route.params;
    let userData = {};
    setLoading(true);
    try {
      userData = {
        nickname,
        img: await saveUserImageInStorage(), //storage에 저장된 뒤에 나온 링크리턴
        day_cost: userCost,
        day_goal_cost: cost,
        push_notification: false,
      };
      await database().ref(`/users/${nickname}`).set(userData);
      await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    } catch (err) {
      console.log(err);
    } finally {
      setUserData(userData);
      setLoading(false);
    }
  }, [route, cost, setUserData, saveUserImageInStorage]);

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>다른 사용자보다</Text>
        <UnderLineText txt="더 적게" color={primaryColor} />
        <Text style={styles.headerTitle}>사용중이에요.</Text>
      </View>
      <View style={[styles.body, {alignItems: 'flex-start'}]}>
        <Text style={styles.requestFont}>그대로 " 절약 " 하실래요?</Text>
        <View style={styles.discountButtonView}>
          <TouchableWithoutFeedback onPress={() => pressChoiceButt('yes')}>
            <View
              style={
                choice === 'yes' ? styles.ablePress : styles.discountButton
              }>
              <Text
                style={
                  choice === 'yes'
                    ? {...styles.buttonFont, color: 'white'}
                    : styles.buttonFont
                }>
                네!
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => pressChoiceButt('no')}>
            <View
              style={
                choice === 'no' ? styles.ablePress : styles.discountButton
              }>
              <Text
                style={
                  choice === 'no'
                    ? {...styles.buttonFont, color: 'white'}
                    : styles.buttonFont
                }>
                유지할게요!
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.descFont}>
          * 현재 사용금액 - 3000원으로 목표 자동 설정됩니다. {'\n'}* 나중에
          변경가능합니다.
        </Text>
      </View>
      <View style={styles.foot}>
        <TouchableWithoutFeedback disabled={disable} onPress={pressSignUp}>
          <Text style={disable ? styles.disabledpress : styles.nextpress}>
            다음
          </Text>
        </TouchableWithoutFeedback>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 36,
    paddingVertical: 70,
    backgroundColor: 'white',
  },
  header: {
    flex: 3,
    justifyContent: 'center',
  },
  body: {
    flex: 7,
    justifyContent: 'center',
  },
  foot: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  headerTitle: {
    ...title2,
    color: primaryColor,
    textAlign: 'right',
  },
  requestFont: {
    ...subtitle,
    color: 'black',
    marginBottom: 18,
  },
  discountButtonView: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  discountButton: {
    width: 126,
    height: 48,
    backgroundColor: lightGrayColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  descFont: {color: descColor, textAlign: 'right', width: '100%'},
  buttonFont: {
    ...defaultFont,
  },
  nextpress: {
    ...subtitle,
    color: primaryColor,
  },
  disabledpress: {
    ...subtitle,
    color: descColor,
  },
  ablePress: {
    width: 126,
    height: 48,
    backgroundColor: primaryColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
