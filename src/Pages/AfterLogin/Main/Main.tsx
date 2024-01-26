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
  thisMonthLast,
  todayTimeStampFirst,
  todayTimeStampLast,
  getDayTimeStampEnd,
} from '../../../utils/utils';
import type {Themes, UserData, UserSpendCost} from '../../../types/types';
import {appTheme, userState} from '../../../recoils/states';

type Props = NativeStackScreenProps<MainStackParamList, 'AddCost', 'CostList'>;
const {width, height} = Dimensions.get('window');

export default function Main({navigation}: Props): React.ReactElement {
  const theme = useRecoilValue<Themes>(appTheme);
  const userData = useRecoilValue<UserData>(userState);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [spendCostData, setSpendCostData] = useState<UserSpendCost[]>([]);
  const [selectedDaySpendData, setSelectedDaySpendData] = useState<
    UserSpendCost[]
  >([]);
  const [before6MonthSpendData, setBefore6MonthSpendData] = useState([]);
  const [todaySpendCost, setSpendTodayCost] = useState<number>(0);
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
      const {dateString, timestamp, year, month, day} = dateData;
      const endTimeStamp = getDayTimeStampEnd(year, month, day);
      setSelectedDay(dateString);
      let pressDateSpendData = spendCostData.filter(
        data => data.timestamp >= timestamp && data.timestamp <= endTimeStamp,
      );
      setSelectedDaySpendData(pressDateSpendData);
      setBottomSheetToggle(true);
      handleSnapPress(1);
    },
    [handleSnapPress, spendCostData],
  );

  const getNotificationPermissionStatus = useCallback(async () => {
    const status = await getPushNotification();
    console.log('Status', status);
  }, []);

  useEffect(() => {
    //일단 AddCost에서 소비금액 추가될 때마다 데이터 가져올 수 있게 살정
    async function getUserData() {
      let getData = await database()
        .ref(`/users/${userData.nickname}`)
        .child('spend_cost')
        .orderByChild('timestamp')
        .startAt(thisMonthFirst)
        .endAt(thisMonthLast)
        .once('value');
      let data = getData.val();
      let todayTotalCost = 0;
      let dataToList: Array<UserSpendCost> = [];
      for (let key in data) {
        if (
          todayTimeStampFirst <= data[key].timestamp &&
          data[key].timestamp <= todayTimeStampLast
        ) {
          todayTotalCost += data[key].cost;
        }
        dataToList.push(data[key]);
      }

      setSpendTodayCost(todayTotalCost);
      setSpendCostData(dataToList);
    }
    getUserData();
    return () => {};
  }, [userData]);

  useEffect(() => {
    // getNotificationPermissionStatus(); // 핸드폰으로 테스트 실행 _ 권한 설정 함수
  }, []);

  useEffect(() => {
    //평균겂 6개월 간의 데이터 가져오기
  });

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Pressable onPress={bottomSheetDismiss}>
        <PaperProvider>
          <SafeAreaView
            style={[
              styles.view,
              bottomSheetToggle && {backgroundColor: grayColor},
            ]}>
            <View style={styles.dayTotalCostView}>
              <View style={styles.fontArea}>
                <Text style={[styles.dayTotalCostTextDesc, {color: theme}]}>
                  오늘 총 지출액
                </Text>
                <Text style={[styles.dayTotalCostText, {color: theme}]}>
                  {todaySpendCost}원
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
                key={theme + bottomSheetToggle} // 테마 색 변경시 리렌더링을 위하여
                onDayPress={dateData => pressCalendarDay(dateData)}
                theme={{
                  calendarBackground: bottomSheetToggle ? grayColor : 'white',
                  selectedDayBackgroundColor: theme,
                  todayTextColor: theme,
                  textSectionTitleColor: theme,
                  textMonthFontWeight: '600',
                  textDayFontWeight: '600',
                  textDayHeaderFontWeight: '600',
                  dayTextColor: '#2d4150',
                }}
                style={{
                  backgroundColor: bottomSheetToggle ? grayColor : 'white',
                }}
                markedDates={{
                  [selectedDay]: {
                    selected: true,
                    disableTouchEvent: true,
                  },
                }}
                onDayLongPress={day => {}}
                hideExtraDays={true}
                hideArrows={true}
                enableSwipeMonths={false}
                disableMonthChange={true}
              />
              <Text style={[styles.totalCostFont, {color: theme}]}>
                {months}월 총 20,000원 사용
              </Text>
              <LineChart
                data={{
                  labels: ['1월', '2월', '3월', '4월', '5월', '6월'],
                  datasets: [
                    {
                      data: [
                        Math.random() * 1000,
                        Math.random() * 1000,
                        Math.random() * 1000,
                        Math.random() * 1000,
                        Math.random() * 1000,
                        Math.random() * 1000,
                      ],
                    },
                  ],
                }}
                width={width} // from react-native
                height={200}
                yAxisSuffix="원"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundGradientFrom: 'white',
                  backgroundGradientTo: 'white',
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: _ => theme,
                  labelColor: _ => 'rgba(80, 97, 109, 1)',
                  style: {
                    borderRadius: 1,
                  },
                  propsForDots: {
                    r: '0',
                    strokeWidth: '2',
                    stroke: theme,
                  },
                }}
                withHorizontalLines={false}
                bezier
              />
            </View>
            {bottomSheetToggle && (
              <BottomSheet
                ref={sheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}>
                <BottomSheetView selectedDaySpendData={selectedDaySpendData} />
              </BottomSheet>
            )}
          </SafeAreaView>
        </PaperProvider>
      </Pressable>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    width: width,
    height: height,
    paddingHorizontal: 18,
  },
  dayTotalCostView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingVertical: 7.5,
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
    fontWeight: 'bold',
  },
  totalCostFont: {
    ...title4,
    marginVertical: 18,
  },
});
