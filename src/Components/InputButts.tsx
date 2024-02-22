import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
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
import {liTypeCheck} from '../utils/datas';
import {changeMoney} from '../utils/utils';
import TextInputArea from './TextInputArea';
import React, {useCallback, useState} from 'react';

type PropsNumber = {
  type: 'number';
  title: string;
  subtitle?: string;
  mode: 'cost' | 'date';
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
};
type PropsString = {
  type: 'string';
  title: string;
  subtitle?: string;
  mode: 'cost' | 'date';
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

export default function InputButts(props: PropsNumber | PropsString) {
  const {title, subtitle, mode, value, setValue, type} = props;
  const [cost, _] = useState<liTypeCheck[]>([
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
      console.log(type);
      if (type === 'number' && value < 800000) {
        setValue((pre: number) => pre + cost[index].value);
      }
    },
    [value, setValue, cost, type],
  );

  const changePeriod = useCallback(
    (pressPeriod: string) => {
      let date = new Date(value);

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
    [value],
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
      if (type === 'string') {
        setValue(periodValue);
      }
      setDays(re_day);
    },
    [setDays, days, setValue, changePeriod, type],
  );

  const pressClearButt = useCallback(() => {
    if (type === 'number') {
      setValue(0);
    }
  }, [setValue, type]);

  return (
    <View style={styles.InputView}>
      <Text style={[styles.titleFont, {color: theme}]}>
        {title} {'\t'}
        {subtitle && <Text style={styles.subtitle}>({subtitle})</Text>}
      </Text>
      {mode === 'cost' && (
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
      {mode === 'date' && (
        <>
          <View style={styles.dateView}>
            <TextInputArea
              value={typeof value === 'string' ? value : ''}
              position="center"
            />
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
    marginTop: 8,
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
