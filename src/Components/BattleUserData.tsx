import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import React from 'react';
import {grayColor, title3, title4, sub} from '../utils/styles';

export default function BattleUserData({
  position,
  userData,
}: {
  position: string;
  userData: any;
}) {
  const {height, width} = useWindowDimensions();
  const data = ['2100원', '2100원', '2100원', '2100원'];
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
        <Text style={styles.totalFont}>현재 지출내역</Text>
        <View style={styles.costLi}>
          {data.map((d, i) => (
            <Text key={i} style={styles.costFont}>
              {d}
            </Text>
          ))}
          <Text style={{fontSize: 12, fontWeight: 'bold', color: 'black'}}>
            .{'\n'}.{'\n'}.
          </Text>
        </View>
        <View style={styles.totalCostView}>
          <Text style={styles.totalCostFont}>총 10000원</Text>
          <Text style={styles.totalCostFont}>2천7백원 절약</Text>
        </View>
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
    color: 'black',
    position: 'absolute',
    paddingTop: 100,
  },
  body: {
    alignItems: 'center',
  },
  totalFont: {
    ...title4,
    color: 'black',
  },
  costLi: {alignItems: 'center', marginTop: 18},
  costFont: {
    ...sub,
    color: 'black',
    fontWeight: '700',
    marginVertical: 4,
  },
  totalCostView: {
    marginTop: 36,
    alignItems: 'center',
  },
  totalCostFont: {
    ...sub,
    fontWeight: '900',
    marginVertical: 4,
    color: 'black',
  },
});
