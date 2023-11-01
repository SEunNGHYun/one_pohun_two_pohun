import React from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import BattleUserData from '../../../Components/BattleUserData';
import {primaryColor, title2} from '../../../utils/styles';

export default function PigBattleRoom() {
  let {width} = useWindowDimensions();

  return (
    <View style={styles.view}>
      <Text style={styles.totalCost}>남은 목표금액{'\t'}30,000원</Text>
      <View style={{flexDirection: 'row'}}>
        <BattleUserData position="left" />
        <MaterialCommunityIcons
          name="piggy-bank"
          color={primaryColor}
          size={68}
          style={[
            styles.pigIcon,
            {marginLeft: (width - 36) / 2 - 30, marginTop: 120},
          ]}
        />
        <BattleUserData position="right" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 18,
  },
  totalCost: {
    ...title2,
    color: primaryColor,
  },
  pigIcon: {
    zIndex: 2,
    height: 150,
    position: 'absolute',
  },
});
