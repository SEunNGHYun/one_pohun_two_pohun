import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BattleData from '../../../Components/BattleData';
import {primaryColor} from '../../../utils/styles';
export default function PigBattleRoom() {
  return (
    <View style={styles.view}>
      <BattleData />
      <MaterialCommunityIcons
        name="piggy-bank"
        color={primaryColor}
        size={68}
      />
      <BattleData />
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flexDirection: 'row',
  },
});
