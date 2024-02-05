import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  lightGrayColor,
  title4,
  defaultFont,
  descColor,
  grayColor,
} from '../utils/styles';
import {useRecoilValue} from 'recoil';
import {Themes} from '../types/types';
import {appTheme} from '../recoils/states';
import {liType, liTypeCheck} from '../utils/datas';
import {changeMoney} from '../utils/utils';
import React, {useCallback, useState} from 'react';

export default function InputButts({
  title,
  subtitle,
  type,
  setGroupGoalCost,
  groupGoalCost,
}: {
  title: string;
  subtitle: string;
  type: string;
  setGroupGoalCost: React.Dispatch<React.SetStateAction<number>>;
  groupGoalCost: number;
}) {
  const [value, setValue] = useState<number>(0);
  const [buttons, setButtons] = useState<liTypeCheck[]>([
    {label: '+5천원', value: 5000},
    {label: '+1만원', value: 10000},
    {label: '+5만원', value: 50000},
    {label: '+10만원', value: 100000},
  ]);
  const theme = useRecoilValue<Themes>(appTheme);

  const pressButton = useCallback((index: number) => {
    if (index === 4) {
      //초기화
      setValue(0);
    } else {
      setValue(pre => pre + buttons[index].value);
    }
  }, []);

  return (
    <View style={styles.InputView}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}>
        <Text style={[styles.titleFont, {color: theme}]}>
          {title} {'\t'}
          <Text style={styles.subtitle}>({subtitle})</Text>
        </Text>
        <TouchableOpacity onPress={() => pressButton(4)}>
          <View style={styles.resetButt}>
            <Text style={[styles.resetButtFont, {color: theme}]}>초기화</Text>
          </View>
        </TouchableOpacity>
      </View>

      {type === 'cost' && (
        <>
          <TextInput value={changeMoney(String(value))} />

          <View style={styles.buttonsView}>
            {buttons.map((butt: liTypeCheck, index: number) => (
              <TouchableOpacity key={index} onPress={() => pressButton(index)}>
                <View style={styles.butt}>
                  <Text style={styles.buttoFont}>{butt.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  InputView: {
    marginBottom: 18,
    marginTop: 26,
  },
  titleFont: {
    ...title4,
  },
  subtitle: {
    ...defaultFont,
    color: descColor,
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  butt: {
    height: 36,
    width: 72,
    borderWidth: 1,
    borderColor: grayColor,
    backgroundColor: lightGrayColor,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  resetButt: {},
  resetButtFont: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  buttoFont: {
    marginHorizontal: 3,
    fontSize: 12,
  },
});
