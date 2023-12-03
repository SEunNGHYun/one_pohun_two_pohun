import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRecoilValue} from 'recoil';
import type {BeforeLoginStackParamList} from '../../navi/Navigation';
import {AvgDayCostState} from '../../recoils/states';
import {primaryColor, descColor, title, subtitle} from '../../utils/styles';
import {moneyRange} from '../../utils/datas';
// DropDownPicker.setListMode('SCROLLVIEW');
type Props = NativeStackScreenProps<BeforeLoginStackParamList, 'Targetcost1'>;

export default function Targetcost1({route, navigation}: Props) {
  const [tenWon, setTenWon] = useState<number>(0);
  const [oneWon, setOneWon] = useState<number>(0);
  const [tOpen, setMOpen] = useState<boolean>(false);
  const [oOpen, setOOpen] = useState<boolean>(false);
  const [disable, setDisable] = useState<boolean>(false);

  const AvgDayCost = useRecoilValue<number>(AvgDayCostState); //전역에서 평균 소비가격 저장

  const onChangeMoney = useCallback(() => {
    if (tenWon <= 0 && oneWon <= 0) {
      // 초기값 -1이 아니면서 두가지 모두 0이 들어오면 안될경우
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [tenWon, oneWon]);

  const nextPageMove = useCallback(() => {
    const {img, nickname} = route.params;
    const userDayCost: number = tenWon + 0.1 * oneWon; //하루 소비금액을 소숫점 ex) 3.4형식

    if (AvgDayCost < userDayCost) {
      navigation.navigate('Targetcost2More', {
        img,
        nickname,
        userCost: userDayCost, // 하루 소비금액
      });
    } else {
      navigation.navigate('Targetcost2Less', {
        img,
        nickname,
        userCost: userDayCost,
      });
    }
  }, [route, AvgDayCost, tenWon, oneWon, navigation]);

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headertitle}>하루 지출액을 알려주세요</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.costView}>
          <DropDownPicker
            placeholder="0"
            open={tOpen}
            value={tenWon}
            onPress={() => setOOpen(false)}
            items={moneyRange}
            setOpen={setMOpen}
            setValue={setTenWon}
            onChangeValue={onChangeMoney}
            style={styles.dropdown}
            containerStyle={{width: 85}}
          />
          <Text style={styles.choiceCostFont}>만</Text>
          <DropDownPicker
            open={oOpen}
            placeholder="0"
            value={oneWon}
            onPress={() => setMOpen(false)}
            items={moneyRange}
            setOpen={setOOpen}
            setValue={setOneWon}
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
    backgroundColor: 'white',
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
