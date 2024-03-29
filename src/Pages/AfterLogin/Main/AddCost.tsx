import React, {useState, useCallback, useMemo} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {useRecoilValue, useRecoilState} from 'recoil';
import DropDownPicker from 'react-native-dropdown-picker';
import database from '@react-native-firebase/database';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {MainStackParamList} from '../../../navi/Navigation';
import {userState, appTheme} from '../../../recoils/states';
import {
  title2,
  title3,
  grayColor,
  defaultFont,
  descColor,
} from '../../../utils/styles';
import type {UserData, Themes} from '../../../types/types';
import {
  korea_date,
  categoryData,
  date,
  months,
  nowTimeStamp,
  changeMoney,
  thisMonthFirst,
  todayTimeStampFirst,
} from '../../../utils/utils';

type Props = NativeStackScreenProps<MainStackParamList, 'Main'>;

export default function AddCost({navigation}: Props) {
  const [cost, setCost] = useState<string>('0');
  const [userData, __] = useRecoilState<UserData>(userState);
  const theme = useRecoilValue<Themes>(appTheme);
  const [open, setOpen] = useState<boolean>(false);
  const [categories, _] =
    useState<{label: string; value: string}[]>(categoryData);
  const [checkCate, setCheckCate] = useState<string>('');

  const onChangeCate = useCallback(() => {}, []);
  const onChangeCost = useCallback((text: string) => {
    setCost(text);
  }, []);

  const saveCostAndMovePage = useCallback(async () => {
    const spendCost: number = Number(cost.replace(/\,/g, ''));
    try {
      await database()
        .ref(
          `/users/${
            userData.nickname
          }/spend_cost/${thisMonthFirst}/${todayTimeStampFirst}/${nowTimeStamp()}`,
        )
        .set({
          category: checkCate,
          cost: spendCost,
        });
    } catch (err) {
    } finally {
      //여기에 데이터 Main애 데이터 값 변한게 설정
      navigation.reset({
        index: 0,
        routes: [{name: 'Main'}],
      });
    }
  }, [userData, cost, checkCate, navigation]);

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={[styles.todayText, {color: theme}]}>
          {months}월 {date}일 {korea_date}요일
        </Text>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={[styles.desc, {color: theme}]}>지출액</Text>
          <TextInput
            placeholderTextColor={descColor}
            value={changeMoney(cost)}
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
    color: 'black',
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
    color: 'black',
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
