import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {BeforeLoginStackParamList} from '../../navi/Navigation';
import UnderLineText from '../../modules/UnderLineText';
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
  'Targetcost2Less'
>;

export default function Targetcost2Less({route, navigation}: Props) {
  const [choice, setChoice] = useState<string>('');
  const [cost, setCost] = useState(0);
  const [disable, setDisable] = useState<boolean>(true);

  const pressChoiceButt = useCallback(
    (t: 'yes' | 'no'): void => {
      const {userCost} = route.params;

      setChoice(t);
      setDisable(false);
      if (t === 'yes') {
        setCost(userCost - 0.3); // 3천원 부터 절약
      } else if (t === 'no') {
        setCost(userCost); //그대로
      }
    },
    [route],
  );

  const nextPageMove = useCallback(() => {
    console.log('회원가입 성공');
  }, [navigation]);

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>다른 사용자보다</Text>
        <UnderLineText txt="1만원" next="더 적게" color={primaryColor} />
        <Text style={styles.headerTitle}>사용중이에요.</Text>
      </View>
      <View style={[styles.body, {alignItems: 'flex-start'}]}>
        <Text style={styles.requestFont}>그대로 유지하실래요?</Text>
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
                그대로 갈게요
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.descFont}>
          * 하루절약 목표를 3000원으로 자동 설정됩니다.
          {'\n'}* 나중에 변경가능합니다.
        </Text>
      </View>
      <View style={styles.foot}>
        <TouchableWithoutFeedback disabled={disable} onPress={nextPageMove}>
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
    paddingHorizontal: 40,
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
    width: 150,
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
    width: 150,
    height: 48,
    backgroundColor: primaryColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
