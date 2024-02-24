import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {useSetRecoilState} from 'recoil';
import database from '@react-native-firebase/database';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
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

type Props = NativeStackScreenProps<
  BeforeLoginStackParamList,
  'Targetcost2More'
>;

export default function Targetcost2More({route}: Props) {
  const [choice, setChoice] = useState<string>('');
  const [cost, setCost] = useState(0);
  const [disable, setDisable] = useState<boolean>(true);

  const setUserData = useSetRecoilState(userState);

  const pressChoiceButt = useCallback(
    (t: 'yes' | 'no'): void => {
      const {userCost} = route.params;

      setChoice(t);
      setDisable(false);

      if (t === 'yes') {
        setCost(userCost - 0.3); // 3천원 부터 절약
      } else if (t === 'no') {
        setCost(userCost); //그대로0
      }
    },
    [route],
  );

  const successSignUp = useCallback(async () => {
    const {img, nickname, userCost} = route.params;
    const userData = {
      nickname,
      img,
      day_cost: userCost,
      day_goal_cost: cost,
      push_notification: false,
    };
    try {
      await database().ref(`/users/${nickname}`).set(userData);
      await AsyncStorage.setItem('user_data', JSON.stringify(userData));
    } catch (err) {
      console.log(err);
    } finally {
      setUserData(userData);
    }
  }, [route, cost, setUserData]);

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>다른 사용자보다</Text>
        <UnderLineText txt="더 많이" color={primaryColor} />
        <Text style={styles.headerTitle}>사용중이에요.</Text>
      </View>
      <View style={[styles.body]}>
        <Text style={styles.requestFont}>" 절약 " 해보실래요?</Text>
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
        <TouchableWithoutFeedback disabled={disable} onPress={successSignUp}>
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
