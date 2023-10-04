import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import React, {useMemo, useState, useCallback} from 'react';
import {primaryColor, descColor, title, subtitle} from '../tools/styles';
import DropDownPicker from 'react-native-dropdown-picker';

// DropDownPicker.setListMode('SCROLLVIEW');

export default function Targetcost1({navigation}) {
  const [million, setMillion] = useState(-1);
  const [thousand, setThousand] = useState(-1);
  const [mOpen, setMOpen] = useState(false);
  const [tOpen, setTOpen] = useState(false);

  const [disable, setDisable] = useState(false);
  const moneyRange = [
    {label: '0', value: 0},
    {label: '1', value: 1},
    {label: '2', value: 2},
    {label: '3', value: 3},
    {label: '4', value: 4},
    {label: '5', value: 5},
    {label: '6', value: 6},
    {label: '7', value: 7},
    {label: '8', value: 8},
    {label: '9', value: 9},
  ];

  const onChangeMoney = () => {
    if (million <= 0 && thousand <= 0) {
      // 초기값 -1이 아니면서 두가지 모두 0이 들어오면 안될경우
      setDisable(false);
    } else {
      setDisable(true);
    }
  };

  const nextPageMove = () => {
    navigation.navigate('Targetcost2', {/*nickname*/ million, thousand});
  };

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headertitle}>하루에 얼마나 쓰시나요?</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.costView}>
          <DropDownPicker
            placeholder="0"
            open={mOpen}
            value={million}
            items={moneyRange}
            setOpen={setMOpen}
            setValue={setMillion}
            onChangeValue={onChangeMoney}
            style={styles.dropdown}
            containerStyle={{width: 85}}
          />
          <Text style={styles.choiceCostFont}>만</Text>
          <DropDownPicker
            open={tOpen}
            placeholder="0"
            value={thousand}
            items={moneyRange}
            setOpen={setTOpen}
            setValue={setThousand}
            onChangeValue={onChangeMoney}
            style={styles.dropdown}
            containerStyle={{width: 85}}
          />
          <Text style={styles.choiceCostFont}>천</Text>
          <Text style={[styles.choiceCostFont, {marginLeft: 30}]}>원</Text>
        </View>
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
  },
  header: {
    flex: 3,
    justifyContent: 'center',
  },
  body: {
    flex: 7,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  foot: {
    flex: 2,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  headertitle: {
    color: primaryColor,
    ...title,
  },
  costView: {
    width: '100%',
    height: 58,
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  dropdown: {
    width: 85,
    height: 68,
  },
  choiceCostFont: {
    ...subtitle,
    color: 'black',
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
