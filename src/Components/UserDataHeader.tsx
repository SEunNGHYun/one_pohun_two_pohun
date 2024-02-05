import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {title4} from '../utils/styles';
import {userState, appTheme} from '../recoils/states';
import type {UserData, Themes} from '../types/types';

export default function UserDataHeader({
  headerRange,
  imgSize,
  theme,
  userData,
}: {
  headerRange: number;
  imgSize: number;
  theme: Themes;
  userData: UserData;
}) {
  const {height} = Dimensions.get('window');

  return (
    <View
      style={[
        styles.header,
        {
          height: height / headerRange,
          backgroundColor: theme,
        },
      ]}>
      <View
        style={{
          width: imgSize + 18,
          height: imgSize + 18,
          borderRadius: imgSize + 18,
          padding: 3,
          backgroundColor: 'white',
        }}>
        <View
          style={{
            width: imgSize + 12,
            height: imgSize + 12,
            borderRadius: imgSize + 12,
            padding: 6,
            backgroundColor: theme,
          }}>
          <Image
            source={{
              uri:
                userData.img === null
                  ? 'https://cdn.pixabay.com/photo/2023/09/07/14/26/cat-8239223_1280.png'
                  : userData.img,
            }}
            resizeMode="contain"
            style={[
              styles.userImage,
              {
                width: imgSize,
                height: imgSize,
                borderRadius: imgSize,
              },
            ]}
          />
        </View>
      </View>
      <Text style={styles.nickname}>{userData.nickname}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {alignItems: 'center', justifyContent: 'space-evenly'},
  userImageBackgroundDefult: {},
  userImage: {},
  nickname: {
    ...title4,
    color: 'white',
  },
});
