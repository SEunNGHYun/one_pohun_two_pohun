import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function UnderLineText({
  txt,
  color,
}: {
  txt: string;
  color: string;
}) {
  return (
    <View style={styles.txtView}>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        style={[styles.txt, {color}]}>
        "
      </Text>
      <View>
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit={true}
          style={[styles.txt, {color}]}>
          {txt}
        </Text>
        <View style={[styles.underline, {backgroundColor: color}]} />
      </View>
      <Text
        numberOfLines={1}
        adjustsFontSizeToFit={true}
        style={[styles.txt, {color}]}>
        "
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  txtView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 18,
  },
  txt: {
    fontSize: 54,
    color: 'black',
    fontFamily: 'GangyonTunTun',
  },
  underline: {
    width: '100%',
    height: 5,
    borderRadius: 12,
  },
});
