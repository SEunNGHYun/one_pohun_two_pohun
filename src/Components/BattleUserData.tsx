import {View, Text, StyleSheet, useWindowDimensions, Image} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {appTheme} from '../recoils/states';
import type {Themes} from '../types/types';
import {changeMoney, compareTimeStamp, changeTimeStamp} from '../utils/utils';
import {grayColor, title3, title4, sub} from '../utils/styles';

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
  const [spendCostData, setSpendCostList] = useState<
    {
      type: 'date' | 'costData';
      cost?: number;
      category?: string;
      date?: string;
      timestamp?: string;
    }[]
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
      let spendCost: {
        type: 'date' | 'costData';
        cost?: number;
        category?: string;
        date?: string;
        timestamp?: string;
      }[] = [];
      Object.entries(userData.spend_cost).forEach(([_, val]: [_, any]) => {
        for (let startDayTimeStamp in val) {
          let saveDayMoney = 0,
            totalSpendDayMoney = 0;
          // console.log(val[startDayTimeStamp]);
          for (let dayTimeStamp in val[startDayTimeStamp]) {
            // console.log('obj', val[startDayTimeStamp][dayTimeStamp]);
            totalSpendDayMoney += val[startDayTimeStamp][dayTimeStamp].cost; // 하루 총 사용 금액
            let last = spendCost.length - 1;
            if (last >= 0) {
              console.log(
                'here :',
                spendCost[last].cost,
                compareTimeStamp(spendCost[last].timestamp, dayTimeStamp),
                val[startDayTimeStamp][dayTimeStamp].cost,
              );
            }
            if (spendCost.length < 5) {
              if (
                last >= 0 &&
                spendCost[last].type === 'costData' &&
                compareTimeStamp(spendCost[last].timestamp, dayTimeStamp)
              ) {
                // 이전 값이 이전 날의 값인지 확인 후 날짜 데이터를 추가
                spendCost.push({
                  type: 'date',
                  date: changeTimeStamp(startDayTimeStamp),
                });
              }
              spendCost.push({
                ...val[startDayTimeStamp][dayTimeStamp],
                type: 'costData',
                timestamp: dayTimeStamp,
              });
            }
          }
          console.log('spnedCost', spendCost);
          saveDayMoney = day_cost - totalSpendDayMoney; // 하루 목표 금액보다 많이 사용했는지 체크
          if (saveDayMoney > 0) {
            setUserSaveCost(saveDayMoney);
            roomGoalCost -= saveDayMoney; // 사용자가 절약해서 모은 돈이 현재 방의 목푯 금액의 절반에 해당하는지 학인
            if (roomGoalCost <= 0) {
              setUserFinish(true); // 사용자는 다 모음
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
          | 절약 목표금액 |{'\n'}
          <Text style={{fontFamily: 'GangyonModu-Light'}}>
            {changeMoney(userData.day_cost * 1000 + '')}원
          </Text>
        </Text>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={styles.totalFont}>
          지출현황
        </Text>
        <View style={styles.costLiView}>
          {spendCostData &&
            spendCostData.map((d, i) => {
              if (d.type === 'costData') {
                return (
                  <View style={styles.costLi} key={i}>
                    <Text
                      numberOfLines={2}
                      adjustsFontSizeToFit={true}
                      style={styles.costFont}>
                      {changeMoney(d.cost + '')}원
                    </Text>
                    <Text style={styles.costCategoryFont}>({d.category})</Text>
                  </View>
                );
              } else {
                return (
                  <View style={styles.costLi}>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit={true}
                      style={styles.costFont}>
                      ======{d.date}======
                    </Text>
                  </View>
                );
              }
            })}
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
  },
  costLiView: {
    width: '75%',
    height: '55%',
    justifyContent: 'center',
  },
  costLi: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
    flexDirection: 'row',
  },
  costFont: {
    fontSize: 20,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'GangyonModu-Bold',
    marginVertical: 4,
  },
  costCategoryFont: {
    marginLeft: 3,
    fontSize: 8,
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
