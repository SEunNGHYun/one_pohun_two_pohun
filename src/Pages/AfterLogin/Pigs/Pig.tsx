import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {PigStackParamList} from '../../../navi/Navigation';
import {grayColor} from '../../../utils/styles';

type Props = NativeStackScreenProps<
  PigStackParamList,
  'MakePigBattleRoom',
  'PigBattleRoom'
>;

export default function Pig({navigation}: Props) {
  return (
    <View style={styles.view}>
      <View style={styles.userImgBack} />
      <Pressable onPress={() => navigation.navigate('MakePigBattleRoom')}>
        <View style={styles.butt}>
          <Text style={styles.buttText}>만들기</Text>
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate('PigBattleRoom')}>
        <View style={styles.butt}>
          <Text style={styles.buttText}>입장하기</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImgBack: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: grayColor,
    marginBottom: 120,
  },
  butt: {
    width: 130,
    height: 50,
    backgroundColor: grayColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 54,
  },
  buttText: {
    fontSize: 20,
    color: 'white',
  },
});
