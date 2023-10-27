import React from 'react';
import {View, Text, StyleSheet, TextInput, ScrollView} from 'react-native';
import {grayColor, title4, defaultFont, descColor} from '../../../utils/styles';
import InputButtons from '../../../Components/InputButts';
export default function MakePigBattleRoom() {
  return (
    <View style={styles.view}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.userImgBack} />
          <Text style={styles.nickname}>닉네임</Text>
        </View>
        <InputButtons
          title={'총 목표 금액'}
          subtitle="최대 50만원"
          type="total"
        />
        <InputButtons
          title={'하루 사용 목표액'}
          subtitle="만3천원 추천"
          type="day"
        />
        <Text style={styles.titleFont}>
          목표 {'\t'}
          <Text style={styles.subtitle}>(15자 이내로)</Text>
        </Text>
        <TextInput placeholder="11월 일본여행?" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 18,
  },
  header: {
    alignItems: 'center',
    paddingTop: 36,
  },
  userImgBack: {
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: grayColor,
    marginBottom: 18,
  },
  nickname: {
    ...title4,
  },
  titleFont: {
    ...title4,
    color: 'black',
    marginTop: 36,
  },
  subtitle: {
    ...defaultFont,
    fontSize: 15,
    color: descColor,
  },
});
