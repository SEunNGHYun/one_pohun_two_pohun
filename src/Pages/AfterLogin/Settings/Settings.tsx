import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Modal, Portal, PaperProvider, Snackbar} from 'react-native-paper';
import {userState} from '../../../recoils/states';
import {UserData} from '../../../types/types';

export default function Settings(): React.ReactElement {
  const [userData, setUserData] = useRecoilState<UserData>(userState);
  const [visible, setVisible] = useState<boolean>(false);

  const togglePushNotification = useCallback(
    (changeVal: boolean) => {
      setUserData(pre => {
        return {
          ...pre,
          push_notification: changeVal,
        };
      });
    },
    [setUserData],
  );

  const showModal = useCallback(() => setVisible(true), []);
  const hideModal = useCallback(() => setVisible(false), []);
  const pressExitButt = useCallback(async () => {
    setUserData({
      nickname: '',
      img: null,
      current_cost: 0,
      goal_cost: 0,
      push_notification: false,
    });
    await AsyncStorage.removeItem('user_data');
  }, [setUserData]);

  const editPageMove = useCallback(() => {}, []);

  return (
    <PaperProvider>
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
            resizeMode="contain"
            resizeMethod="scale"
          />
          <Text style={styles.userNickname}>dddd</Text>
        </View>
        <View style={styles.body}>
          <Pressable onPress={editPageMove}>
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
          <Pressable onPress={showModal}>
            <View style={[styles.buttArea, {paddingBottom: 16}]}>
              <Text style={styles.defaultFont}>회원탈퇴</Text>
            </View>
          </Pressable>
        </View>
        <Portal>
          <Modal
            contentContainerStyle={styles.modalView}
            onDismiss={hideModal}
            visible={visible}>
            <View style={styles.modalTop}>
              <Text style={styles.modalText}>정말 나가실건가요?</Text>
            </View>
            <View style={styles.modalBottom}>
              <Pressable onPress={pressExitButt}>
                <View style={styles.modalPressView}>
                  <Text style={styles.modalButtText}>확인</Text>
                </View>
              </Pressable>
            </View>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
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
  modalView: {
    marginHorizontal: 30,
    backgroundColor: 'white',
  },
  modalTop: {
    marginBottom: 30,
    marginTop: 80,
    alignItems: 'center',
  },
  modalBottom: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    height: 80,
  },
  modalPressView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    height: '100%',
  },
  modalButtText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  modalText: {
    color: 'black',
    fontSize: 22,
  },
});
