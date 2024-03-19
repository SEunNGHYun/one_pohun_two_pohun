import {View, Text, StyleSheet, useWindowDimensions, Image} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {appTheme} from '../recoils/states';
import type {Themes} from '../types/types';
import {
  changeMoney,
  compareTimeStamp,
  changeTimeStamp,
  todayTimeStampFirst,
  todayTimeStampLast,
} from '../utils/utils';
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
  const [textTodaySaveMoney, setTextTodaySaveMoney] = useState<string>('');
  const userImage = useMemo(() => {
    return userData
      ? userData.img
      : 'https://cdn.pixabay.com/photo/2023/09/07/14/26/cat-8239223_1280.png';
  }, [userData]);

  const changeSpendCostForm = useCallback(() => {
    let {roomGoalCost, day_cost}: {roomGoalCost: number; day_cost: number} =
      userData;
    day_cost = day_cost * 1000;
    let saveMoneyArr = []; // 절약 성공한 날 모음
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
            daySpendCost = 0;
          for (let dayTimeStamp in val[startDayTimeStamp]) {
            let last = spendCost.length - 1;
            if (spendCost.length < 5) {
              if (
                last >= 0 &&
                spendCost[last].type === 'costData' &&
                compareTimeStamp(
                  spendCost[last].timestamp as string,
                  startDayTimeStamp,
                )
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
                timestamp: startDayTimeStamp,
              });
            }
            daySpendCost += val[startDayTimeStamp][dayTimeStamp].cost; //전체 소비금액
          }
          saveDayMoney = day_cost - daySpendCost; // 하루 목표 금액보다 많이 사용했는지 체크
          console.log(roomGoalCost, saveDayMoney);

          if (saveDayMoney >= 0) {
            // 하루 목표 금액
            saveMoneyArr.push(saveDayMoney);
            if (todayTimeStampFirst === Number(startDayTimeStamp)) {
              let t = changeMoney(saveDayMoney + '');
              setTextTodaySaveMoney(`오늘 ${t}원 절약`);
            }
            roomGoalCost -= saveDayMoney; // 사용자가 절약해서 모은 돈이 현재 방의 목푯 금액의 절반에 해당하는지 학인
            if (roomGoalCost <= 0) {
              setUserFinish(true); // 사용자는 다 모음
            }
          } else {
            if (todayTimeStampFirst === Number(startDayTimeStamp)) {
              let t = changeMoney(saveDayMoney * -1 + '');
              setTextTodaySaveMoney(`오늘 ${t}원 초과`);
            }
          } // 현재 절약 상황을 파악하는 로작
        }
      });
      // 총 절약한 금액들saveMoneyArr. Reduce하기
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
          | 하루 목표금액 |{'\n'}
          <Text style={{fontFamily: 'GangyonModu-Light'}}>
            {changeMoney(userData.day_cost * 1000 + '')}원
          </Text>
        </Text>
        <View style={[styles.fontBack, {backgroundColor: theme}]}>
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit={true}
            style={styles.totalFont}>
            지출현황
          </Text>
        </View>
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
                  <View style={styles.dateLi} key={d.date}>
                    <Text
                      numberOfLines={1}
                      adjustsFontSizeToFit={true}
                      style={styles.dateFont}>
                      -----{d.date}-----
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
            {textTodaySaveMoney === ''
              ? `오늘 ${changeMoney(userData.day_cost * 1000 + '')}원 절약`
              : textTodaySaveMoney}
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
    fontFamily: 'GangyonModu-Bold',
    textAlign: 'center',
    marginBottom: 18,
  },
  fontBack: {
    paddingHorizontal: 18,
    paddingVertical: 4,
    borderRadius: 5,
    marginBottom: 2,
  },
  totalFont: {
    color: '#f2f2f2',
    fontSize: 18,
    fontFamily: 'GangyonModu-Bold',
  },
  costLiView: {
    width: '65%',
    height: '51%',
    justifyContent: 'center',
  },
  costLi: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 6,
    flexDirection: 'row',
  },
  dateLi: {
    alignItems: 'center',
  },
  dateFont: {
    fontSize: 10,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'GangyonModu-Bold',
    marginVertical: 6,
  },
  costFont: {
    fontSize: 18,
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
    fontFamily: 'GangyonModu-Bold',
    marginVertical: 2,
  },
});
