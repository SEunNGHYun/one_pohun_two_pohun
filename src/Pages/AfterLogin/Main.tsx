import React, {useCallback, useEffect, useState} from 'react';
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
import {LineChart} from 'react-native-chart-kit';
import firestore from '@react-native-firebase/firestore';
import {getPushNotification} from '../../utils/PermissionsFuncs';
import {primaryColor, grayColor, title4, title2} from '../../utils/styles';
import type {MainStackParamList} from '../../navi/Navigation';
import {month} from '../../utils/utils';

type Props = NativeStackScreenProps<MainStackParamList, 'AddCost', 'CostList'>;
const {width, height} = Dimensions.get('window');

export default function Main({navigation}: Props): React.ReactElement {
  const [selected, setSelected] = useState<string>('');
  const [months, _] = useState<number>(month);
  const [loading, setLoading] = useState<boolean>(false);

  const getNotificationPermissionStatus = useCallback(async () => {
    const status = await getPushNotification();
    console.log('Status', status);
  }, []);

  useEffect(() => {
    getNotificationPermissionStatus(); // 핸드폰으로 실행
  }, []);

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.dayTotalCostView}>
        <View style={styles.fontArea}>
          <Text style={styles.dayTotalCostTextDesc}>오늘 총 지출액</Text>
          <Text style={styles.dayTotalCostText}>20,000원</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('AddCost')}>
          <View style={styles.addButt}>
            <Text style={styles.addButtText}>+</Text>
          </View>
        </Pressable>
      </View>
      <View>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          theme={{
            selectedDayBackgroundColor: primaryColor,
            todayTextColor: primaryColor,
            textSectionTitleColor: primaryColor,
            textMonthFontWeight: '600',
            textDayFontWeight: '600',
            textDayHeaderFontWeight: '600',
            indicatorColor: primaryColor,
            dayTextColor: '#2d4150',
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
          hideArrows={true}
          onDayLongPress={day => {
            console.log('selected day', day);
          }}
          enableSwipeMonths={true}
          hideExtraDays={false}
        />
        <Text style={styles.totalCostFont}>{months}월 총 20,000원 사용</Text>
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
            color: _ => 'rgba(213, 65, 131, 0.2)',
            labelColor: _ => 'rgba(80, 97, 109, 1)',
            style: {
              borderRadius: 1,
            },
            propsForDots: {
              r: '0',
              strokeWidth: '2',
              stroke: primaryColor,
            },
          }}
          withHorizontalLines={false}
          bezier
        />
      </View>
    </SafeAreaView>
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
    color: primaryColor,
  },
  dayTotalCostTextDesc: {
    ...title4,
    fontSize: 26,
    color: primaryColor,
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
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  totalCostFont: {
    ...title4,

    marginVertical: 18,
    color: primaryColor,
  },
});
