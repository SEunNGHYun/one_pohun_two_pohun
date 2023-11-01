import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import {grayColor, title3, title4} from '../utils/styles';

export default function BattleUserData({position}: {position: string}) {
  const {height, width} = useWindowDimensions();

  return (
    <View style={{width: (width - 40) / 2}}>
      <View
        style={[
          styles.header,
          {alignItems: position === 'left' ? 'flex-end' : 'flex-start'},
        ]}>
        <View
          style={[
            styles.userImgBack,
            {width: (width - 40) / 2.5, height: (width - 40) / 2.5},
          ]}
        />
        <Text
          style={[
            styles.nickname,
            {textAlign: position === 'left' ? 'left' : 'right'},
          ]}>
          닉네임
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.totalCostFont}>현재 지출내역</Text>
        <View style={{alignItems: 'center'}}>
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
    width: '100%',
    justifyContent: 'center',
    marginVertical: 36,
  },
  userImgBack: {
    borderRadius: 300,
    marginHorizontal: 8,
    backgroundColor: grayColor,
  },
  nickname: {
    ...title3,
    width: '100%',
    position: 'absolute',
    paddingTop: 100,
  },
  body: {
    alignItems: 'center',
  },
  totalCostFont: {
    ...title4,
    color: 'black',
  },
});
