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
import {Calendar} from 'react-native-calendars';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {useRecoilValue} from 'recoil';
import {LineChart} from 'react-native-chart-kit';
import BottomSheet, {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import firestore from '@react-native-firebase/firestore';
import {getPushNotification} from '../../../utils/PermissionsFuncs';
import {grayColor, title4, title2} from '../../../utils/styles';
import type {MainStackParamList} from '../../../navi/Navigation';
import {month} from '../../../utils/utils';
import type {Themes} from '../../../types/types';
import {appTheme} from '../../../recoils/states';

type Props = NativeStackScreenProps<MainStackParamList, 'AddCost', 'CostList'>;
const {width, height} = Dimensions.get('window');

export default function Main({navigation}: Props): React.ReactElement {
  const [selected, setSelected] = useState<string>('');
  const theme = useRecoilValue<Themes>(appTheme);
  const [months, _] = useState<number>(month);
  const [loading, setLoading] = useState<boolean>(false);
  const [bottomSheetToggle, setBottomSheetToggle] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['1%', '65%'], []);

  const handleSnapPress = useCallback(index => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  const getNotificationPermissionStatus = useCallback(async () => {
    const status = await getPushNotification();
    console.log('Status', status);
  }, []);

  useEffect(() => {
    getNotificationPermissionStatus(); // 핸드폰으로 실행
  }, [getNotificationPermissionStatus, theme]);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Pressable onPress={() => setBottomSheetToggle(false)}>
        <SafeAreaView style={styles.view}>
          <View style={styles.dayTotalCostView}>
            <View style={styles.fontArea}>
              <Text style={[styles.dayTotalCostTextDesc, {color: theme}]}>
                오늘 총 지출액
              </Text>
              <Text style={[styles.dayTotalCostText, {color: theme}]}>
                20,000원
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
              key={theme} // 테마 색 변경시 리렌더링을 위하여
              onDayPress={day => {
                setSelected(day.dateString);
                setBottomSheetToggle(true);
              }}
              theme={{
                selectedDayBackgroundColor: theme,
                todayTextColor: theme,
                textSectionTitleColor: theme,
                textMonthFontWeight: '600',
                textDayFontWeight: '600',
                textDayHeaderFontWeight: '600',
                dayTextColor: '#2d4150',
              }}
              markedDates={{
                [selected]: {
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
              ref={bottomSheetRef}
              index={1}
              snapPoints={snapPoints}
              onChange={handleSheetChanges}>
              <View>
                <Text>Awesome 🎉</Text>
              </View>
            </BottomSheet>
          )}
        </SafeAreaView>
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
