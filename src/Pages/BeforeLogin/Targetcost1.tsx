import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {useRecoilValue} from 'recoil';
import {AvgDayCostState} from '../../recoils/states';
import {primaryColor, descColor, title, subtitle} from '../../utils/styles';
import {moneyRange} from '../../utils/datas';
// DropDownPicker.setListMode('SCROLLVIEW');

export default function Targetcost1({navigation}) {
  const [million, setMillion] = useState<number>(-1);
  const [thousand, setThousand] = useState<number>(-1);
  const [mOpen, setMOpen] = useState<boolean>(false);
  const [tOpen, setTOpen] = useState<boolean>(false);

  const AvgDayCost = useRecoilValue<number>(AvgDayCostState);
  const [disable, setDisable] = useState<boolean>(false);

  const onChangeMoney = useCallback(() => {
    if (million <= 0 && thousand <= 0) {
      // 초기값 -1이 아니면서 두가지 모두 0이 들어오면 안될경우
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [million, thousand]);

  const nextPageMove = useCallback(() => {
    const userDayCost: number = million + 0.1 * thousand;
    if (AvgDayCost < userDayCost) {
      navigation.navigate('Targetcost2More', {/*nickname*/ million, thousand});
    } else {
      navigation.navigate('Targetcost2Less', {/*nickname*/ million, thousand});
    }
  }, [AvgDayCost, million, thousand, navigation]);

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={styles.headertitle}>하루 지출액을 알려주세요</Text>
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
