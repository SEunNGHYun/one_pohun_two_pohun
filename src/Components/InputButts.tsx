import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import {
  lightGrayColor,
  title4,
  defaultFont,
  primaryColor,
  descColor,
} from '../utils/styles';
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

  useLayoutEffect(() => {
    setButtons(buttonList(type));
  }, []);

  return (
    <View style={styles.InputView}>
      <Text style={styles.titleFont}>
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
    marginTop: 36,
  },
  titleFont: {
    ...title4,
    color: primaryColor,
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
