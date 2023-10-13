import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {primaryColor, grayColor, title, title2} from '../../utils/styles';

export default function Main() {
  const [selected, setSelected] = useState('');
  return (
    <ScrollView contentContainerStyle={styles.view}>
      <View style={styles.dayTotalCostView}>
        <View>
          <Text style={styles.dayTotalCostTextDesc}>오늘 총 지출액</Text>
          <Text style={styles.dayTotalCostText}>20,000원</Text>
        </View>
        <Pressable>
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
    ...title,
    color: primaryColor,
  },
  dayTotalCostTextDesc: {
    ...title2,
    color: primaryColor,
  },
  addButt: {
    backgroundColor: grayColor,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
