import {View, Text, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {grayColor} from '../utils/styles';

export default function TextInputArea({
  value,
  position = 'space-between',
  scale = '100%',
  pressable = true,
  clearFunc,
  pressFunc,
}: {
  value: string;
  position?: 'center' | 'space-between' | 'right';
  scale?: string;
  pressable?: true | false;
  clearFunc?: () => void;
  pressFunc?: () => void;
}) {
  return (
    <View style={[styles.area, {width: scale}]}>
      <Pressable disabled={!pressable} onPress={pressFunc}>
        <View style={[styles.inputArea, {justifyContent: position}]}>
          <Text style={{color: 'black', fontFamily: 'GangyonModu-Light'}}>
            {value}
          </Text>
          {value !== '0' && clearFunc && (
            <Pressable onPress={clearFunc}>
              <MaterialCommunityIcons
                name="close-circle"
                size={22}
                color={grayColor}
              />
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
    paddingHorizontal: 12,
    borderRadius: 4,
  },
});
