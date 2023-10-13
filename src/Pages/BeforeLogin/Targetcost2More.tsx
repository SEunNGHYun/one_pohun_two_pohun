import React, {useMemo, useState, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import UnderLineText from '../../modules/UnderLineText';

import {
  primaryColor,
  grayColor,
  title2,
  subtitle,
  descColor,
  defaultFont,
} from '../../utils/styles';

// DropDownPicker.setListMode('SCROLLVIEW');

export default function Targetcost2More({navigation}) {
  const [choice, setChoice] = useState<number>(-1);
  const [disable, setDisable] = useState<boolean>(false);

  const discountChoice = () => {
    //전페이지에서 설정한 값에서 3000원 절약된 가격 넘겨주기
    //회원가입 성공
    navigation.navigate('Targetcost2', {
      /*nickname,  million, thousand - 3*/
    });
  };
  const noDiscoutChoice = () => {
    navigation.navigate('Targetcost2', {
      /*nickname, million, thousand*/
    });
  };
  const nextPageMove = () => {};

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>다른 사용자보다</Text>
        <UnderLineText txt="1만원" next="더" color={primaryColor} />
        <Text style={styles.headerTitle}>사용중이에요.</Text>
      </View>
      <View style={[styles.body, {alignItems: 'flex-start'}]}>
        <Text style={styles.requestFont}>" 절약 " 해보실래요?</Text>
        <View style={styles.discountButtonView}>
          <TouchableWithoutFeedback onPress={discountChoice}>
            <View style={styles.discountButton}>
              <Text style={styles.buttonFont}>네!</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={noDiscoutChoice}>
            <View style={styles.discountButton}>
              <Text style={styles.buttonFont}>그대로 갈게요</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text style={styles.descFont}>
          * 하루절약 목표를 3000원으로 자동 설정됩니다. {'\n'}* 나중에
          변경가능합니다.
        </Text>
      </View>
      <View style={styles.foot}>
        <TouchableWithoutFeedback disabled={!disable} onPress={nextPageMove}>
          <Text style={!disable ? styles.disabledpress : styles.nextpress}>
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
    backgroundColor: grayColor,
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
});
