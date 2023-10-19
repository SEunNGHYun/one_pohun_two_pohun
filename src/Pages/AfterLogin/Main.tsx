import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {primaryColor, grayColor, title4, title2} from '../../utils/styles';
import {LineChart} from 'react-native-chart-kit';
export default function Main() {
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
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={300} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
      />
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
    color: primaryColor,
  },
});
