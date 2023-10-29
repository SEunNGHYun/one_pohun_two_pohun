import {View, Text, StyleSheet, ScrollView} from 'react-native';
import React from 'react';
import {grayColor, title3} from '../utils/styles';

export default function BattleData() {
  return (
    <View>
      <View style={styles.header}>
        <View style={styles.userImgBack} />
        <Text style={styles.nickname}>닉네임</Text>
      </View>
      <View style={styles.body}>
        <Text>현재 지출내역</Text>
        <View>
          <Text>2100원</Text>
          <Text>2100원</Text>
          <Text>2100원</Text>
          <Text>2100원</Text>
          <Text>...</Text>
        </View>
        <Text>총 10000원</Text>
        <Text>2천7백원 절약</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userImgBack: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: grayColor,
    marginBottom: 32,
  },
  nickname: {
    ...title3,
  },
  body: {},
});
