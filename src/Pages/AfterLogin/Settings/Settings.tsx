import React, {useCallback} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {useRecoilState} from 'recoil';
import Icon from 'react-native-vector-icons/FontAwesome6';

import {userState} from '../../../recoils/states';
import {UserData} from '../../../types/types';

export default function Settings() {
  const [userData, setUserData] = useRecoilState<UserData>(userState);

  const togglePushNotification = useCallback((changeVal: boolean) => {
    setUserData(pre => {
      return {
        ...pre,
        push_notification: changeVal,
      };
    });
  }, []);

  return (
    <View style={styles.view}>
      <View style={styles.header}>
        <Image
          style={styles.userImage}
          source={{
            uri:
              userData.img === null
                ? 'https://cdn.pixabay.com/photo/2023/09/07/14/26/cat-8239223_1280.png'
                : userData.img,
          }}
        />
        <Text style={styles.userNickname}>dddd</Text>
      </View>
      <View style={styles.body}>
        <Pressable>
          <View style={[styles.buttArea, {paddingTop: 16}]}>
            <Text style={styles.defaultFont}>회원정보 수정하기</Text>
          </View>
        </Pressable>
        <View style={styles.buttArea}>
          <Text style={styles.defaultFont}>푸시알림 설정</Text>
          {userData.push_notification ? (
            <Pressable onPress={() => togglePushNotification(false)}>
              <Icon name="toggle-on" size={45} />
            </Pressable>
          ) : (
            <Pressable onPress={() => togglePushNotification(true)}>
              <Icon name="toggle-off" size={45} />
            </Pressable>
          )}
        </View>
        <Pressable>
          <View style={[styles.buttArea, {paddingBottom: 16}]}>
            <Text style={styles.defaultFont}>회원탈퇴</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  header: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  userNickname: {
    fontSize: 36,
  },
  body: {flex: 5},
  buttArea: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  defaultFont: {
    fontSize: 28,
  },
});
