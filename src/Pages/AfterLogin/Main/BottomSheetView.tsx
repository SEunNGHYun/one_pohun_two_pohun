import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import type {UserSpendCost} from '../../../types/types';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

export default function BottomSheetView({
  selectedDaySpendData,
  selectDate,
}: {
  selectedDaySpendData: UserSpendCost[] | [];
  selectDate: string;
}): React.ReactElement {
  return (
    <BottomSheetScrollView>
      <View style={styles.todayView}>
        <Text style={styles.todayFont}>{selectDate}</Text>
      </View>
      {selectedDaySpendData.length > 0 ? (
        <>
          <View style={styles.costItemForm}>
            <Text style={styles.costCateFont}>금액</Text>
            <Text style={styles.costCateFont}>분류</Text>
          </View>
          <View style={styles.line} />
          {selectedDaySpendData.map((data: UserSpendCost, index: number) => (
            <View
              key={data.category + index}
              style={[styles.costItemForm, styles.constItemBlank]}>
              <Text style={styles.costItemFont}>{data.cost}</Text>
              <Text style={styles.costItemFont}>{data.category}</Text>
            </View>
          ))}
        </>
      ) : (
        <View style={styles.emptyView}>
          <Text style={{color: 'black', fontFamily: 'GangyonModu-Bold'}}>
            지출 내역이 없습니다.
          </Text>
        </View>
      )}
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  todayView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  todayFont: {
    paddingTop: 16,
    paddingBottom: 24,
    paddingHorizontal: 8,
    fontSize: 24,
    color: 'black',
    fontFamily: 'GangyonModu-Bold',
  },
  costItemForm: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  costCateFont: {fontSize: 24, fontFamily: 'GangyonModu-Bold', color: 'black'},
  line: {
    width: '100%',
    height: 1,
    backgroundColor: 'lightgray',
    marginVertical: 8,
  },
  costItemFont: {
    fontSize: 16,
    fontFamily: 'GangyonModu-Light',
    color: 'black',
  },
  constItemBlank: {
    marginVertical: 4,
  },
  emptyView: {
    width: '100%',
    marginTop: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
