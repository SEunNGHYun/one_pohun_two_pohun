import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import {lightGrayColor, title4, defaultFont, descColor} from '../utils/styles';
import {useRecoilValue} from 'recoil';
import {Themes} from '../types/types';
import {appTheme} from '../recoils/states';
import {buttonList, liType} from '../utils/datas';
import React, {useLayoutEffect, useState} from 'react';

export default function InputButts({
  title,
  subtitle,
  type,
}: {
  title: string;
  subtitle: string;
  type: string;
}) {
  const [buttons, setButtons] = useState<liType[]>([
    {label: '', value: 0},
    {label: '', value: 0},
    {label: '', value: 0},
    {label: '', value: 0},
  ]);
  const theme = useRecoilValue<Themes>(appTheme);

  useLayoutEffect(() => {
    setButtons(buttonList(type));
  }, []);

  return (
    <View style={styles.InputView}>
      <Text style={[styles.titleFont, {color: theme}]}>
        {title} {'\t'}
        <Text style={styles.subtitle}>({subtitle})</Text>
      </Text>
      <TextInput />
      <View style={styles.buttonsView}>
        <Pressable>
          <View style={styles.butt}>
            <Text style={styles.buttoFont}>+{buttons[0].label}</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.butt}>
            <Text style={styles.buttoFont}>+{buttons[1].label}</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.butt}>
            <Text style={styles.buttoFont}>+{buttons[2].label}</Text>
          </View>
        </Pressable>
        <Pressable>
          <View style={styles.butt}>
            <Text style={styles.buttoFont}>+{buttons[3].label}</Text>
          </View>
        </Pressable>
      </View>
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
    height: 40,
    backgroundColor: lightGrayColor,
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttoFont: {
    marginHorizontal: 8,
  },
});
