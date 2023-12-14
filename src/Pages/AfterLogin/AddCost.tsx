import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {useRecoilValue} from 'recoil';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AddCostData} from '../../types/types';
import type {MainStackParamList} from '../../navi/Navigation';
import {userState, appTheme} from '../../recoils/states';
import {title2, title3, grayColor, defaultFont} from '../../utils/styles';
import type {UserData, Themes} from '../../types/types';
import {day, date, month, today} from '../../utils/utils';

type Props = NativeStackScreenProps<MainStackParamList, 'Main'>;

export default function AddCost({navigation}: Props) {
  const [cost, setCost] = useState<string>('0');
  const [viewCost, setViewCost] = useState<string>('0');
  const userData = useRecoilValue<UserData>(userState);
  const theme = useRecoilValue<Themes>(appTheme);
  const [open, setOpen] = useState<boolean>(false);
  const [categories, _] = useState<{label: string; value: string}[]>([
    {label: '식비', value: '식비'},
    {label: '자기개발비', value: '자기개발비'},
    {label: '취미', value: '취미'},
    {label: '기타', value: '기타'},
  ]);
  const [checkCate, setCheckCate] = useState<string>('');

  const onChangeCate = useCallback(() => {}, []);
  const onChangeCost = useCallback((text: string) => {
    setCost(text);
    let reversedStr = text.replace(/\D/g, '').split('').reverse().join('');

    // 3자리 단위로 쉼표 추가
    let formattedStr = reversedStr.replace(/(\d{3})/g, '$1,');

    // 다시 역순으로 변환하여 최종 결과 얻기12
    let result = formattedStr.split('').reverse();
    if (result[0] === ',') {
      result = result.slice(1);
    }
    setViewCost(result.join(''));
  }, []);

  const saveCostAndMovePage = useCallback(async () => {
    const fireStoreDoc = firestore().collection('personal_cost');
    const data: AddCostData = {
      nickname: userData.nickname,
      categories: checkCate,
      cost: Number(cost.replace(/\,/g, '')),
      timestamp: today.toDateString(),
    };
    try {
      await fireStoreDoc.doc().set(data);
    } catch (e) {
    } finally {
      navigation.replace('Main');
    }
  }, [userData, checkCate, cost, navigation]);

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={[styles.todayText, {color: theme}]}>
          {month}월 {date}일 {day}요일
        </Text>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={[styles.desc, {color: theme}]}>지출액</Text>
          <TextInput
            value={viewCost}
            style={styles.textInput}
            onChangeText={onChangeCost}
            keyboardType="number-pad"
          />
        </View>
        <View>
          <Text style={[styles.desc, {color: theme}]}>지출 분류</Text>
          <DropDownPicker
            placeholder="지출금에 분류를 고르시오"
            open={open}
            value={checkCate}
            items={categories}
            setOpen={setOpen}
            setValue={setCheckCate}
            onChangeValue={onChangeCate}
            style={styles.dropdown}
            closeOnBackPressed
          />
        </View>
        <View style={styles.bottom}>
          <Pressable onPress={saveCostAndMovePage}>
            <View
              style={
                cost && checkCate
                  ? [styles.okButtActive, {backgroundColor: theme}]
                  : styles.okButtDisable
              }>
              <Text style={styles.buttText}>확인</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 18,
  },
  header: {
    flex: 1.5,
    justifyContent: 'flex-end',
  },
  body: {
    flex: 6.5,
    paddingTop: 40,
  },
  bottom: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    paddingBottom: 50,
  },
  todayText: {
    ...title2,
  },
  desc: {
    ...title3,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 4,
    marginBottom: 36,
  },
  dropdown: {},
  okButtActive: {
    width: 100,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  okButtDisable: {
    backgroundColor: grayColor,
    width: 100,
    height: 50,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttText: {
    ...defaultFont,
    color: 'white',
  },
});
