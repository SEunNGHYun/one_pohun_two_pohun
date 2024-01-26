import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {categoryData} from '../../../utils/utils';
import type {UserSpendCost} from '../../../types/types';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';

export default function BottomSheetView({
  selectedDaySpendData,
}: {
  selectedDaySpendData: UserSpendCost[];
}): React.ReactElement {
  return (
    <BottomSheetScrollView>
      {selectedDaySpendData.map((data: UserSpendCost) => (
        <View key={data.cost}>
          <Text>{data.cost}</Text>
          <Text>{data.category}</Text>
        </View>
      ))}
    </BottomSheetScrollView>
  );
}

const styles = StyleSheet.create({
  costItem: {
    width: '100%',
  },
});
