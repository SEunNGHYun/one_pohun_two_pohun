import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TextInputArea({
  value,
  position = 'left',
  scale = '100%',
  clearFunc,
  pressFunc,
}: {
  value: string;
  position?: 'center' | 'left' | 'right';
  scale?: string;
  clearFunc?: () => void;
  pressFunc?: () => void;
}) {
  return (
    <View style={[styles.area, {width: scale}]}>
      <Pressable disabled={!pressFunc}>
        <View style={[styles.inputArea, {justifyContent: position}]}>
          <Text>{value}</Text>
          {value !== '0' && clearFunc && (
            <Pressable onPress={clearFunc}>
              <MaterialCommunityIcons name="close-circle" size={22} />
            </Pressable>
          )}
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  area: {
    marginVertical: 16,
  },
  inputArea: {
    flexDirection: 'row',
    height: 45,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.2,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
});