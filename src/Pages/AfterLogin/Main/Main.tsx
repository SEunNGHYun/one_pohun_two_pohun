import React, {useCallback, useEffect, useRef, useState, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  ScrollView,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Calendar, DateData} from 'react-native-calendars';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useRecoilState, useRecoilValue} from 'recoil';
import {PaperProvider} from 'react-native-paper';
import database from '@react-native-firebase/database';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import messaging from '@react-native-firebase/messaging';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetView from './BottomSheetView';
import {getPushNotification} from '../../../utils/PermissionsFuncs';
import {grayColor, title4, title2} from '../../../utils/styles';
import type {MainStackParamList} from '../../../navi/Navigation';
import {
  months,
  thisMonthFirst,
  changeTimeStamp,
  todayTimeStampFirst,
  todayTimeStampLast,
  changeMoney,
  today,
} from '../../../utils/utils';
import {descColor} from '../../../utils/styles';
import type {Themes, UserData, UserSpendCost} from '../../../types/types';
import {appTheme, userState} from '../../../recoils/states';

type Props = NativeStackScreenProps<MainStackParamList, 'AddCost', 'CostList'>;
const {width, height} = Dimensions.get('window');

export default function Main({navigation}: Props): React.ReactElement {
  const theme = useRecoilValue<Themes>(appTheme);
  const [userData, setUserData] = useRecoilState<UserData>(userState);
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
    console.log('is pressed?');
    setBottomSheetToggle(false);
  }, [handleClosePress, setBottomSheetToggle]);

  //여기 까지 bottomSheet 관련 코드

  const pressCalendarDay = useCallback(
    (dateData: DateData) => {
      let {timestamp, month, day, dateString} = dateData;
      setSelectedDay(dateString);
      setSelectedDayInModal(`${month}월 ${day}일 지출내역`);
      if (thisMonthSpendCost && thisMonthSpendCost.hasOwnProperty(timestamp)) {
        let pressDateSpendData: UserSpendCost[] = Object.entries(
          thisMonthSpendCost[timestamp],
        ).map(([_, obj]: [string, UserSpendCost]) => obj);
        pressDateSpendData.sort(
          (a, b) => a.category.localeCompare(b.category) || a.cost - b.cost,
        ); // 1순위. 분류 기준으로 정렬  2순위. 비용기준으로 정렬

        setSelectedDaySpendData(pressDateSpendData);
        setBottomSheetToggle(true);
        handleSnapPress(1);
        return;
      } else {
        setSelectedDaySpendData([]);
        setBottomSheetToggle(true);
        handleSnapPress(1);
      }
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
        // 해당 달에 입력된게 있는 지 확인
        Object.entries(data[thisMonthFirst]).forEach(
          ([today, obj]: [string, any]) => {
            const costDataInDay = Object.entries(obj);
            if (costDataInDay.length > 0) {
              costDataInDay.forEach(([day2, obj2]: [string, any]) => {
                // 오늘 소비 금액만 더하기
                monthTotalCost += obj2.cost;
                if (todayTimeStampFirst === Number(today)) {
                  todayTotalCost += obj2.cost;
                }
              });
            }
            //이번달 소비 슴액 더하기
          },
        );
        setMonthSpendCost('' + monthTotalCost);
        setSpendTodayCost('' + todayTotalCost);
        setThisMonthSpendCost(data[thisMonthFirst]);
      }
    }
    getUserData();
  }, [userData]);

  const getFCMtoken = useCallback(async () => {
    const token = await messaging().getToken();
    return token;
  }, []);

  useEffect(() => {
    const getNotificationPermissionStatus = async () => {
      const status = await getPushNotification();
      if (!userData.push_notification) {
        if (status === 'granted') {
          const userFCMtoken = await getFCMtoken();
          await database().ref(`/users/${userData.nickname}`).update({
            token: userFCMtoken,
          });
          setUserData((pre: UserData) => {
            const data = {
              ...pre,
              push_notification: userFCMtoken,
            };
            return data;
          });
        }
      }
    };
    getNotificationPermissionStatus();
    // 핸드폰으로 테스트 실행 _ 권한 설정 함수
  }, [setUserData, getFCMtoken, userData]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
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
            <Pressable onPress={bottomSheetDismiss}>
              <Calendar
                key={theme + bottomSheetToggle} // 테마 색 변경시 리렌더링을 위하여
                onDayPress={dateData => pressCalendarDay(dateData)}
                theme={{
                  calendarBackground: bottomSheetToggle ? grayColor : 'white',
                  selectedDayBackgroundColor: theme,
                  todayTextColor: theme,
                  textSectionTitleColor: theme,
                  textMonthFontFamily: 'GangyonModu-Bold',
                  textDayFontFamily: 'GangyonModu-Light',
                  textDayHeaderFontFamily: 'GangyonModu-Light',
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
            </Pressable>

            <Text
              adjustsFontSizeToFit={true}
              numberOfLines={1}
              style={[styles.totalCostFont, {color: theme}]}>
              {months}월 총 {changeMoney(monthSpendCost)}원 사용
            </Text>
            <ScrollView horizontal={true} style={styles.sideBox}>
              <Pressable onPress={() => navigation.push('EventPage_G')}>
                <View style={styles.box}>
                  <Icon name="chart-pie" size={width / 1.8} color={'#6d6d6d'} />
                  <View style={styles.iconBack}>
                    <Icon
                      name="account-cash-outline"
                      size={width / 7}
                      color={'#7c9360'}
                    />
                  </View>
                  <Text
                    adjustsFontSizeToFit={true}
                    numberOfLines={2}
                    style={[styles.boxFont, {color: theme}]}>
                    지출 유형{'\n'}그래프
                  </Text>
                </View>
              </Pressable>
            </ScrollView>
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
    fontFamily: 'GangyonTunTun',
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
    fontSize: 11.25,
    color: 'white',
    fontFamily: 'GangyonTunTun',
  },
  totalCostFont: {
    paddingHorizontal: 18,
    fontFamily: 'GangyonTunTun',
    fontSize: 22,
  },
  sideBox: {
    margin: 18,
  },
  box: {
    alignItems: 'center',
    marginRight: 10,
    width: width * 0.6,
    height: height * 0.25,
    borderRadius: 5,
    borderColor: descColor,
    borderWidth: 0.45,
  },
  image: {width: '90%', height: '90%', margin: 10},
  boxFont: {
    fontFamily: 'GangyonTunTun',
    fontSize: 26,
    zIndex: 3,
    bottom: 4,
    width: width * 0.5,
    position: 'absolute',
    color: '#383838',
    marginLeft: 18,
  },
  iconBack: {
    width: width / 6.5,
    height: width / 6.5,
    borderRadius: 40,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    bottom: 18,
    right: 22,
  },
});
