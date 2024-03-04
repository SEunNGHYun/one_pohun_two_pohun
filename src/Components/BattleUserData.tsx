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
  setUserSaveCost,
}: {
  position: string;
  userData: any;
  setUserSaveCost: React.Dispatch<React.SetStateAction<number>>;
}) {
  const {height, width} = useWindowDimensions();
  const theme = useRecoilValue<Themes>(appTheme);
  const [spendCostList, setSpendCostList] = useState<
    {cost: number; category: string}[]
  >([]);
  const [totalSaveMoney, setTotalSaveMoney] = useState<number>(0);
  const userImage = useMemo(() => {
    return userData
      ? userData.img
      : 'https://cdn.pixabay.com/photo/2023/09/07/14/26/cat-8239223_1280.png';
  }, [userData]);

  const changeSpendCostForm = useCallback(() => {
    let {roomGoalCost, day_cost}: {roomGoalCost: number; day_cost: number} =
      userData;
    day_cost = day_cost * 1000;
    if (userData && userData.hasOwnProperty('spend_cost')) {
      let spendCost: {cost: number; category: string}[] = [];
      Object.entries(userData.spend_cost).forEach(([_, val]: [_, any]) => {
        for (let startDayTimeStamp in val) {
          let saveDayMoney = 0,
            totalSpendDayMoney = 0;
          for (let dayTimeStamp in val[startDayTimeStamp]) {
            totalSpendDayMoney += val[startDayTimeStamp][dayTimeStamp].cost; // 하루 총 사용 금액
            if (spendCost.length < 5) {
              spendCost.push(val[startDayTimeStamp][dayTimeStamp]);
            }
            saveDayMoney = day_cost - totalSpendDayMoney; // 하루 목표 금액에서 얼마 절약했는지 파악
            if (saveDayMoney > 0) {
              // 목표 금액 - 사용 금액
              setUserSaveCost(saveDayMoney);
            } else {
            }
          }
        }
      });
      setSpendCostList(spendCost);
    }
  }, [userData, setUserSaveCost]);

  useEffect(() => {
    changeSpendCostForm();
  }, [changeSpendCostForm]);

  return (
    <View
      style={{
        width: (width - 40) / 2,
      }}>
      <View
        style={[
          styles.header,
          {alignItems: position === 'left' ? 'flex-start' : 'flex-end'},
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
          numberOfLines={2}
          style={[
            styles.nickname,
            {
              textAlign: position === 'left' ? 'left' : 'right',
            },
          ]}>
          {userData && userData.nickname}
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.totalFont}>실시간 지출현황</Text>
        <Text style={{fontSize: 12, fontWeight: 'bold', color: 'black'}}>
          .{'\n'}.{'\n'}.
        </Text>
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
    fontSize: 26,
    fontWeight: 'bold',
    width: '80%',
    color: 'black',
    position: 'absolute',
    bottom: 0,
  },
  body: {
    alignItems: 'center',
  },
  totalFont: {
    color: 'black',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  costLi: {alignItems: 'center', width: 'auto'},
  costFont: {
    ...sub,
    color: 'black',
    fontWeight: '700',
    marginVertical: 4,
  },
  totalCostView: {
    marginTop: 8,
    alignItems: 'center',
  },
  totalCostFont: {
    ...sub,
    fontWeight: '900',
    marginVertical: 4,
    color: 'black',
  },
});
