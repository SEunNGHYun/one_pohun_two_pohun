import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
  lightGrayColor,
  title4,
  defaultFont,
  descColor,
  grayColor,
} from '../utils/styles';
import {useRecoilValue} from 'recoil';
import {today} from '../utils/utils';
import {Themes} from '../types/types';
import {appTheme} from '../recoils/states';
import {liType, liTypeCheck} from '../utils/datas';
import {changeMoney} from '../utils/utils';
import TextInputArea from './TextInputArea';
import React, {useCallback, useState} from 'react';

export default function InputButts({
  title,
  subtitle,
  type,
  setGroupGoalCost,
  groupGoalCost,
}: {
  title: string;
  subtitle?: string;
  type: 'cost' | 'date';
  setGroupGoalCost: React.Dispatch<React.SetStateAction<number>>;
  groupGoalCost: number;
}) {
  const [value, setValue] = useState<number>(0);
  const [period, setPeriod] = useState<string>(today);
  const [cost, setButtons] = useState<liTypeCheck[]>([
    {label: '+5천원', value: 5000},
    {label: '+1만원', value: 10000},
    {label: '+5만원', value: 50000},
    {label: '+10만원', value: 100000},
  ]);
  const [days, setDays] = useState<{label: string; checked: boolean}[]>([
    {label: '1주', checked: false},
    {label: '3주', checked: false},
    {label: '1개월', checked: false},
    {label: '3개월', checked: false},
  ]);
  const theme = useRecoilValue<Themes>(appTheme);

  const pressButton = useCallback(
    (index: number) => {
      if (value < 800000) {
        console.log(value);
        setValue(pre => pre + cost[index].value);
      }
    },
    [value, setValue, cost],
  );

  const changePeriod = useCallback(
    (pressPeriod: string) => {
      let date = new Date(period);

      if (pressPeriod === '1주') {
        date.setDate(date.getDate() + 7);
      } else if (pressPeriod === '3주') {
        date.setDate(date.getDate() + 21);
      } else if (pressPeriod === '1개월') {
        date.setMonth(date.getMonth() + 1);
      } else if (pressPeriod === '3개월') {
        date.setMonth(date.getMonth() + 3);
      }

      return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    },
    [period],
  );

  const pressDay = useCallback(
    (index: number) => {
      let periodValue = '';
      const re_day = days.map((day, i) => {
        if (index === i) {
          periodValue = changePeriod(day.label);
          return {...day, checked: true};
        }
        return {...day, checked: false};
      });
      setPeriod(periodValue);
      setDays(re_day);
    },
    [setDays, days, changePeriod],
  );

  const pressClearButt = useCallback(() => {
    setValue(0);
  }, []);

  return (
    <View style={styles.InputView}>
      <Text style={[styles.titleFont, {color: theme}]}>
        {title} {'\t'}
        {subtitle && <Text style={styles.subtitle}>({subtitle})</Text>}
      </Text>
      {type === 'cost' && (
        <>
          <TextInputArea
            value={changeMoney(String(value))}
            clearFunc={pressClearButt}
          />
          <View style={styles.buttonsView}>
            {cost.map((butt: liTypeCheck, index: number) => (
              <TouchableOpacity key={index} onPress={() => pressButton(index)}>
                <View style={styles.butt}>
                  <Text style={styles.buttFont}>{butt.label}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}
      {type === 'date' && (
        <>
          <View style={styles.dateView}>
            <TextInputArea value={period} position="center" />
          </View>
          <View style={styles.buttonsView}>
            {days.map(
              (butt: {label: string; checked: boolean}, index: number) => (
                <TouchableOpacity
                  key={index + butt.label}
                  onPress={() => pressDay(index)}>
                  <View
                    style={[butt.checked ? styles.checkedButt : styles.butt]}>
                    <Text
                      style={[
                        butt.checked ? styles.checkedButtFont : styles.buttFont,
                      ]}>
                      {butt.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ),
            )}
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
  checkedButt: {
    height: 36,
    width: 72,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: grayColor,
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
  dateView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateArea: {
    width: '45%',
  },
  buttFont: {
    marginHorizontal: 3,
    fontSize: 12,
  },
  checkedButtFont: {
    marginHorizontal: 3,
    fontSize: 12,
    color: 'white',
  },
});
