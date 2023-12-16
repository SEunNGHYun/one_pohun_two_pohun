import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useRecoilValue} from 'recoil';
import {userState, appTheme} from '../recoils/states';
import type {UserData, Themes} from '../types/types';

export default function UserDataHeader({headerFlex}: {headerFlex: number}) {
  const userData = useRecoilValue<UserData>(userState);
  const theme = useRecoilValue<Themes>(appTheme);

  return (
    <View>
      <Image
        source={{
          uri:
            userData.img === null
              ? 'https://cdn.pixabay.com/photo/2023/09/07/14/26/cat-8239223_1280.png'
              : userData.img,
        }}
        resizeMode="contain"
        style={styles.userImgBack}
      />
      <Text style={[styles.nickname, {color: theme}]}>닉네임</Text>
    </View>
  );
}
