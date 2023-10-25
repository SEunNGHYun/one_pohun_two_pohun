import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  title2,
  title3,
  primaryColor,
  grayColor,
  defaultFont,
} from '../../utils/styles';

export default function AddCost() {
  const [cost, setCost] = useState<string>('0');
  const [open, setOpen] = useState<boolean>(false);
  const [categories, _] = useState([
    {label: '식비', value: '식비'},
    {label: '자기개발비', value: '자기개발비'},
  ]);
  const [checkCate, setCheckCate] = useState<string>('');

  const onChangeCate = useCallback(() => {}, []);
  const onChangeCost = useCallback((text: string) => {
    setCost(text);
  }, []);
  const onPressOkButt = useCallback(() => {}, []);

  return (
    <View style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.todayText}>10월 25일 화요일</Text>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.desc}>지출액</Text>
          <TextInput
            value={cost}
            style={styles.textInput}
            onChangeText={onChangeCost}
          />
        </View>
        <View>
          <Text style={styles.desc}>분류</Text>
          <DropDownPicker
            placeholder="지출금에 붕류를 고르시오"
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
          <Pressable onPress={onPressOkButt}>
            <View style={styles.okButt}>
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
    color: primaryColor,
  },
  desc: {
    ...title3,
    color: primaryColor,
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 0.5,
    borderRadius: 4,
    marginBottom: 36,
  },
  dropdown: {},
  okButt: {
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
