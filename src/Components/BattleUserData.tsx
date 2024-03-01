import {View, Text, StyleSheet, useWindowDimensions, Image} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {appTheme} from '../recoils/states';
import type {Themes} from '../types/types';
import {thisMonthFirst} from '../utils/utils';
import {grayColor, title3, title4, sub} from '../utils/styles';

export default function BattleUserData({
  position,
  userData,
}: {
  position: string;
  userData: any;
}) {
  const {height, width} = useWindowDimensions();
  const theme = useRecoilValue<Themes>(appTheme);
  const [spendCostList, setSpendCostList] = useState<
    {cost: number; category: string}[]
  >([]);
  const [saveMoney, setSaveMoney] = useState<number>(0);

  const data = ['2100원', '2100원', '2100원', '2100원'];

  const userImage = useMemo(() => {
    return userData
      ? userData.img
      : 'https://cdn.pixabay.com/photo/2023/09/07/14/26/cat-8239223_1280.png';
  }, [userData]);

  const changeSpendCostForm = useCallback(() => {
    if (userData && userData.hasOwnProperty('spend_cost')) {
      let spendCost: {cost: number; category: string}[] = [];
      Object.entries(userData.spend_cost).forEach(([_, val]: [_: any]) => {
        for (let key1 in val) {
          for (let key2 in val[key1]) {
            spendCost.push(val[key1][key2]);
            if (spendCost.length === 5) {
              return;
            }
          }
        }
      });
      setSpendCostList(spendCost);
    }
  }, [userData]);

  useEffect(() => {
    changeSpendCostForm();
  }, [changeSpendCostForm]);

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
            {
              width: (width - 40) / 2.5,
              height: (width - 40) / 2.5,
              backgroundColor: theme,
            },
          ]}>
          <View
            style={[
              styles.userImgBack,
              {
                width: (width - 60) / 2.5,
                height: (width - 60) / 2.5,
                backgroundColor: 'white',
              },
            ]}>
            <Image
              source={{
                uri: userImage,
              }}
              resizeMode="contain"
              style={[
                styles.userImgBack,
                {
                  width: (width - 75) / 2.5,
                  height: (width - 75) / 2.5,
                  backgroundColor: 'white',
                },
              ]}
            />
          </View>
        </View>
        <Text
          style={[
            styles.nickname,
            {textAlign: position === 'left' ? 'left' : 'right'},
          ]}>
          {userData && userData.nickname}
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.totalFont}>실시간 지출현황</Text>
        <View style={styles.costLi}>
          {spendCostList &&
            spendCostList.map((d, i) => (
              <Text key={i} style={styles.costFont}>
                {d.cost}원
              </Text>
            ))}
          <Text style={{fontSize: 12, fontWeight: 'bold', color: 'black'}}>
            .{'\n'}.{'\n'}.
          </Text>
        </View>
        <View style={styles.totalCostView}>
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
    alignItems: 'center',
    justifyContent: 'center',
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
  costLi: {alignItems: 'center', marginTop: 18, width: 'auto'},
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
