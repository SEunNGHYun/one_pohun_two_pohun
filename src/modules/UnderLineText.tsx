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
      <View>
        <Text style={[styles.txt, {color}]}>{txt}</Text>
        <View style={[styles.underline, {backgroundColor: color}]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  txtView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 18,
    marginBottom: 18,
  },
  txt: {
    fontSize: 54,
    color: 'black',
    fontFamily: 'beabea',
  },
  underline: {
    width: '100%',
    height: 2,
  },
});
