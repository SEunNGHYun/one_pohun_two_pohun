import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function EachDayCost({route, navigation}) {
  const {pressDay, data} = route.params;
  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Text style={{color: 'black'}}>{pressDay}</Text>
      </View>
      <View style={styles.body}>
        {!!data &&
          data.map((d, index: number) => {
            <View key={d + index}>
              <Text style={{color: 'black'}}>{d}</Text>
            </View>;
          })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flex: 1.5,
    backgroundColor: 'green',
  },
  body: {
    flex: 8.5,
  },
});
