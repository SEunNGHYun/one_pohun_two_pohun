import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

export default function Settings() {
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text>Settings</Text>
      </View>
      <View style={styles.body}>
        <Text>body</Text>
      </View>
      <View style={styles.bottom}>
        <Text>bottom</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  header: {flex: 2, backgroundColor: 'red'},
  body: {flex: 6, backgroundColor: 'green'},
  bottom: {flex: 2, backgroundColor: 'purple'},
});
