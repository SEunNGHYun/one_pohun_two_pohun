import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Dimensions,
} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {
  primaryColor,
  grayColor,
  title4,
  title2,
  primaryColorRGBA,
} from '../../utils/styles';
import {LineChart} from 'react-native-chart-kit';
export default function Main() {
  const {width} = Dimensions.get('window');
  const [selected, setSelected] = useState('');
  return (
    <ScrollView contentContainerStyle={styles.view}>
      <View style={styles.dayTotalCostView}>
        <View>
          <Text style={styles.dayTotalCostTextDesc}>오늘 총 지출액</Text>
          <Text style={styles.dayTotalCostText}>20,000원</Text>
        </View>
        <Pressable onPress={() => console.log('press')}>
          <View style={styles.addButt}>
            <Text>+</Text>
          </View>
        </Pressable>
      </View>
      <View>
        <Calendar
          onDayPress={day => {
            setSelected(day.dateString);
          }}
          markedDates={{
            [selected]: {
              selected: true,
              disableTouchEvent: true,
            },
          }}
        />
        <Text style={styles.totalCostFont}>10월 총20,000원 사용</Text>
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
          height={220}
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  dayTotalCostView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  dayTotalCostText: {
    ...title2,
    color: primaryColor,
  },
  dayTotalCostTextDesc: {
    ...title4,
    color: primaryColor,
  },
  addButt: {
    backgroundColor: grayColor,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  totalCostFont: {
    ...title4,
    marginVertical: 18,
    color: primaryColor,
  },
});
