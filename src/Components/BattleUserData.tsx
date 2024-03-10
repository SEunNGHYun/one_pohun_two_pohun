import {View, Text, StyleSheet, useWindowDimensions, Image} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {appTheme} from '../recoils/states';
import type {Themes} from '../types/types';
import {changeMoney} from '../utils/utils';
import {grayColor, title3, title4, sub} from '../utils/styles';
import {ViewBase} from 'react-native';

export default function BattleUserData({
  position,
  userData,
  setUserSaveCost,
  setUserFinish,
}: {
  position: string;
  userData: any;
  setUserSaveCost: React.Dispatch<React.SetStateAction<number>>;
  setUserFinish: React.Dispatch<React.SetStateAction<boolean>>;
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
            saveDayMoney = day_cost - totalSpendDayMoney; // 하루 목표 금액보다 많이 사용했는지 체크
            if (saveDayMoney > 0) {
              setUserSaveCost(saveDayMoney);
              roomGoalCost -= saveDayMoney; // 사용자가 절약해서 모은 돈이 현재 방의 목푯 금액의 절반에 해당하는지 학인
              if (roomGoalCost <= 0) {
                setUserFinish(true); // 사용자는 다 모음
              }
            } else {
            }
          }
        }
      });
      setSpendCostList(spendCost);
    }
  }, [userData, setUserSaveCost, setUserFinish]);

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
          numberOfLines={1}
          adjustsFontSizeToFit={true}
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
        <Text
          numberOfLines={2}
          adjustsFontSizeToFit={true}
          style={styles.userGoalCostFont}>
          | 목표 금액 |{'\n'}
          {changeMoney(userData.day_cost * 1000 + '')}원<Text />
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={styles.totalFont}>
          실시간 지출현황
        </Text>
        <Text
          style={{fontSize: 6, fontFamily: 'GangyonModu-Bold', color: 'black'}}>
          .{'\n'}.{'\n'}.
        </Text>
        <View style={styles.costLi}>
          {spendCostList &&
            spendCostList.map((d, i) => (
              <View style={styles.costLi} key={i}>
                <Text
                  numberOfLines={2}
                  adjustsFontSizeToFit={true}
                  style={styles.costFont}>
                  {changeMoney(d.cost + '')} 원{' '}
                </Text>
                <Text style={styles.costCategoryFont}>({d.category})</Text>
              </View>
            ))}
        </View>
        <View style={styles.totalCostView}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={styles.totalCostFont}>
            2천7백원 절약
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: '100%',
    justifyContent: 'center',
    marginTop: 18,
    marginBottom: 32,
  },
  userImgBack: {
    borderRadius: 300,
    marginHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nickname: {
    fontSize: 36,
    fontFamily: 'GangyonTunTun',
    width: '80%',
    color: 'black',
    position: 'absolute',
    bottom: -10,
  },
  body: {
    alignItems: 'center',
  },
  userGoalCostFont: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'GangyonTunTun',
    textAlign: 'center',
    marginBottom: 18,
  },
  totalFont: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'GangyonTunTun',
    marginBottom: 4,
  },
  costLi: {alignItems: 'center', width: 'auto', marginVertical: 1},
  costFont: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'GangyonModu-Bold',
    marginVertical: 4,
  },
  costCategoryFont: {
    fontSize: 12,
    fontFamily: 'GangyonModu-Light',
    color: 'gray',
  },
  totalCostView: {
    marginTop: 4,
    alignItems: 'center',
  },
  totalCostFont: {
    fontSize: 18,
    fontFamily: 'GangyonTunTun',
    marginVertical: 4,
    color: 'black',
  },
});
