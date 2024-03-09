import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Dimensions,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Calendar, DateData} from 'react-native-calendars';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useRecoilValue} from 'recoil';
import {PaperProvider} from 'react-native-paper';
import database from '@react-native-firebase/database';
import {LineChart} from 'react-native-chart-kit';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetView from './BottomSheetView';
import {getPushNotification} from '../../../utils/PermissionsFuncs';
import {grayColor, title4, title2} from '../../../utils/styles';
import type {MainStackParamList} from '../../../navi/Navigation';
import {
  months,
  thisMonthFirst,
  todayTimeStampFirst,
  changeMoney,
  today,
} from '../../../utils/utils';
import type {Themes, UserData, UserSpendCost} from '../../../types/types';
import {appTheme, userState} from '../../../recoils/states';

type Props = NativeStackScreenProps<MainStackParamList, 'AddCost', 'CostList'>;
const {width, height} = Dimensions.get('window');

export default function Main({navigation}: Props): React.ReactElement {
  const theme = useRecoilValue<Themes>(appTheme);
  const userData = useRecoilValue<UserData>(userState);
  const [selectedDayInModal, setSelectedDayInModal] = useState<string>(today);
  const [selectedDay, setSelectedDay] = useState<string>(today);
  const [loading, setLoading] = useState<boolean>(false);
  const [thisMonthSpendCost, setThisMonthSpendCost] = useState<UserSpendCost[]>(
    [],
  );
  const [selectedDaySpendData, setSelectedDaySpendData] = useState<
    UserSpendCost[]
  >([]);
  const [todaySpendCost, setSpendTodayCost] = useState<string>('0');
  const [monthSpendCost, setMonthSpendCost] = useState<string>('0');
  const [bottomSheetToggle, setBottomSheetToggle] = useState<boolean>(false);
  const sheetRef = useRef<BottomSheet>(null);

  //여기서 부터
  // variables
  const snapPoints = useMemo(() => ['1%', '75%'], []);

  // bottomsheet 실행시에 작동하는 함수
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  //snapPoints 안댁수 값에 따라 bottomsheet 올라오는 높이가 다름
  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);

  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  const bottomSheetDismiss = useCallback(async () => {
    handleClosePress();
    setBottomSheetToggle(false);
  }, [handleClosePress, setBottomSheetToggle]);

  //여기 까지 bottomSheet 관련 코드

  const pressCalendarDay = useCallback(
    (dateData: DateData) => {
      let {timestamp, month, day, dateString} = dateData;
      console.log(dateData);
      setSelectedDay(dateString);
      setSelectedDayInModal(`${month}월 ${day}일 지출내역`);
      if (thisMonthSpendCost && thisMonthSpendCost.hasOwnProperty(timestamp)) {
        let pressDateSpendData: UserSpendCost[] = Object.entries(
          thisMonthSpendCost[timestamp],
        ).map(([_, obj]: [string, UserSpendCost]) => obj);
        pressDateSpendData.sort(
          (a, b) => a.category.localeCompare(b.category) || a.cost - b.cost,
        ); // 1순위. 분류 기준으로 정렬  2순위. 비용기준으로 정렬
        console.log('after ', pressDateSpendData);
        setSelectedDaySpendData(pressDateSpendData);
      }
      setBottomSheetToggle(true);
      handleSnapPress(1);
    },
    [handleSnapPress, thisMonthSpendCost],
  );

  useEffect(() => {
    //일단 AddCost에서 소비금액 추가될 때마다 데이터 가져올 수 있게 살정
    async function getUserData() {
      let res = await database()
        .ref(`/users/${userData.nickname}/spend_cost`)
        .limitToLast(6)
        .once('value');

      let data = res.val();
      let todayTotalCost = 0;
      let monthTotalCost = 0;
      if (data && data.hasOwnProperty(thisMonthFirst)) {
        if (data[thisMonthFirst].hasOwnProperty(todayTimeStampFirst)) {
          Object.entries(data[thisMonthFirst][todayTimeStampFirst]).forEach(
            ([_, obj]: [string, any]) => {
              todayTotalCost += obj.cost;
              monthTotalCost += obj.cost;
            },
          );
        }
        setMonthSpendCost('' + monthTotalCost);
        setSpendTodayCost('' + todayTotalCost);
        setThisMonthSpendCost(data[thisMonthFirst]);
      }
    }
    getUserData();
  }, [userData]);

  useEffect(() => {
    const getNotificationPermissionStatus = async () => {
      const status = await getPushNotification();
      console.log('Status', status);
    };
    getNotificationPermissionStatus(); // 핸드폰으로 테스트 실행 _ 권한 설정 함수
  }, []);

  useEffect(() => {
    //평균겂 6개월 간의 데이터 가져오기
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Pressable onPress={bottomSheetDismiss}>
        <PaperProvider>
          <View
            style={[
              styles.view,
              bottomSheetToggle && {backgroundColor: grayColor},
            ]}>
            <View style={styles.dayTotalCostView}>
              <View style={styles.fontArea}>
                <Text
                  adjustsFontSizeToFit={true}
                  numberOfLines={1}
                  style={[styles.dayTotalCostTextDesc, {color: theme}]}>
                  오늘 총 지출액
                </Text>
                <Text style={[styles.dayTotalCostText, {color: theme}]}>
                  {changeMoney(todaySpendCost)}원
                </Text>
              </View>
              <Pressable onPress={() => navigation.navigate('AddCost')}>
                <View style={[styles.addButt, {backgroundColor: theme}]}>
                  <Text style={styles.addButtText}>+</Text>
                </View>
              </Pressable>
            </View>
            <View>
              <Calendar
                key={theme + bottomSheetToggle + 1} // 테마 색 변경시 리렌더링을 위하여
                onDayPress={dateData => pressCalendarDay(dateData)}
                theme={{
                  calendarBackground: bottomSheetToggle ? grayColor : 'white',
                  selectedDayBackgroundColor: theme,
                  todayTextColor: theme,
                  textSectionTitleColor: theme,
                  'stylesheet.day.basic': {
                    base: {
                      height: 30,
                      width: 30,
                      alignItems: 'center',
                    },
                  },
                  'stylesheet.day.period': {
                    base: {
                      width: 30,
                    },
                  }, // 모듈 view의 크기가 고정되있어서 강제로 수정
                  dayTextColor: '#2d4150',
                }}
                style={{
                  backgroundColor: bottomSheetToggle ? grayColor : 'white',
                }}
                markedDates={{
                  [selectedDay]: {
                    selected: true,
                    disableTouchEvent: false,
                    customContainerStyle: {
                      margin: 0,
                      padding: 0,
                      width: 3,
                      height: 3,
                    },
                  },
                  customTextStyle: {},
                }}
                onDayLongPress={day => {}}
                hideExtraDays={true}
                hideArrows={true}
                enableSwipeMonths={false}
                disableMonthChange={true}
              />
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={1}
                style={[styles.totalCostFont, {color: theme}]}>
                {months}월 총 {changeMoney(monthSpendCost)}원 사용
              </Text>
            </View>
            {bottomSheetToggle && (
              <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <BottomSheetView
                  selectedDaySpendData={selectedDaySpendData}
                  selectDate={selectedDayInModal}
                />
              </BottomSheet>
            )}
          </View>
        </PaperProvider>
      </Pressable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    width: 'auto',
    height: height,
    paddingVertical: 7,
  },
  dayTotalCostView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 7.5,
    paddingHorizontal: 18,
  },
  fontArea: {},
  dayTotalCostText: {
    ...title2,
    fontSize: 48,
  },
  dayTotalCostTextDesc: {
    ...title4,
    fontSize: 26,
  },
  addButt: {
    backgroundColor: grayColor,
    width: 45,
    height: 45,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtText: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'monospace',
  },
  totalCostFont: {
    paddingHorizontal: 18,
    fontFamily: 'beabea',
    fontSize: 22,
  },
});
