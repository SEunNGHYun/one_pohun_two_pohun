import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';

import UserDataHeader from '../../../Components/UserDataHeader';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Modal, Portal, PaperProvider} from 'react-native-paper';
import {userState, appTheme} from '../../../recoils/states';
import {UserData, Themes} from '../../../types/types';
import {grayColor} from '../../../utils/styles';

export default function Settings(): React.ReactElement {
  const [userData, setUserData] = useRecoilState<UserData>(userState);
  const [visible, setVisible] = useState<boolean>(false);
  const [themesModalVisible, setThemesVisibleModal] = useState<boolean>(false);
  const [theme, setTheme] = useRecoilState<Themes>(appTheme);
  const [themeList, setThemeList] = useState<
    {color: Themes; checked: boolean}[]
  >([
    {color: '#d54183', checked: true},
    {color: '#59b54f', checked: false},
    {color: '#2121ba', checked: false},
  ]);
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

  const pressThemeShowModal = useCallback(() => {
    setThemesVisibleModal(true);
  }, []);
  const pressThemeHideModal = useCallback(() => {
    setThemesVisibleModal(false);
  }, []);

  const pressEditSetting = useCallback(() => {}, []);
  const pressThemeColor = useCallback(
    (i: number) => {
      const newThemeList = themeList.map((t, idx) => {
        if (i === idx) {
          return {...t, checked: true};
        }
        return {...t, checked: false};
      });
      setThemeList(newThemeList);
    },
    [themeList],
  );

  const pressThemeOkButt = useCallback(() => {
    themeList.forEach(async t => {
      if (t.checked) {
        setTheme(t.color);
        await AsyncStorage.setItem('appThemeColor', t.color);
      }
    });
    pressThemeHideModal();
  }, [themeList, pressThemeHideModal, setTheme]);

  const showExitModal = useCallback(() => setVisible(true), []);
  const hideExitModal = useCallback(() => setVisible(false), []);
  const pressExitButt = useCallback(async () => {
    setUserData({
      nickname: '',
      img: null,
      current_cost: 0,
      goal_cost: 0,
      push_notification: false,
    });
    await database().ref(`/phoun/users/${userData.nickname}`).remove();
    await AsyncStorage.removeItem('user_data');
  }, [setUserData, userData]);

  return (
    <PaperProvider>
      <View style={styles.view}>
        <UserDataHeader
          headerRange={2.5}
          imgSize={175}
          userData={userData}
          theme={theme}
        />
        <View style={styles.body}>
          <Pressable onPress={pressThemeShowModal}>
            <View style={[styles.buttArea, {paddingTop: 16}]}>
              <Text style={[styles.defaultFont, {color: theme}]}>
                테마색 설정
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={pressEditSetting}>
            <View style={[styles.buttArea, {paddingTop: 16}]}>
              <Text style={[styles.defaultFont, {color: theme}]}>
                회원정보 수정하기
              </Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => togglePushNotification(!userData.push_notification)}>
            <View style={styles.buttArea}>
              <Text style={[styles.defaultFont, {color: theme}]}>
                푸시알림 설정
              </Text>
              {userData.push_notification ? (
                <Icon name="toggle-on" size={36} color={theme} />
              ) : (
                <Icon name="toggle-off" size={36} color={theme} />
              )}
            </View>
          </Pressable>
          <Pressable onPress={showExitModal}>
            <View style={[styles.buttArea, {paddingBottom: 16}]}>
              <Text style={[styles.defaultFont, {color: theme}]}>회원탈퇴</Text>
            </View>
          </Pressable>
        </View>
        <Portal>
          <Modal
            contentContainerStyle={styles.modalView}
            onDismiss={hideExitModal}
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
          <Modal
            contentContainerStyle={styles.modalView}
            onDismiss={pressThemeHideModal}
            visible={themesModalVisible}>
            <View>
              <View style={styles.themesModalHeader}>
                {themeList.map((t, i) => (
                  <Pressable key={t.color} onPress={() => pressThemeColor(i)}>
                    <View
                      style={[
                        styles.themesColorPoint,
                        {
                          backgroundColor: t.color,
                          borderColor: t.checked ? grayColor : 'white',
                        },
                      ]}
                    />
                  </Pressable>
                ))}
              </View>
              <View style={styles.modalBottom}>
                <Pressable onPress={pressThemeOkButt}>
                  <View style={styles.modalPressView}>
                    <Text style={styles.modalButtText}>확인</Text>
                  </View>
                </Pressable>
              </View>
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
    flex: 4.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  userImageBackground1: {
    width: 210,
    height: 210,
    borderRadius: 210,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  userImageBackground2: {
    width: 200,
    height: 200,
    padding: 5,
    borderRadius: 200,
  },
  userImage: {
    width: 190,
    height: 190,
    borderWidth: 10,
    borderRadius: 190,
    marginBottom: 36,
  },
  userNickname: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  body: {flex: 5.5},
  buttArea: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  defaultFont: {
    fontSize: 26,
    fontWeight: 'bold',
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
  themesModalHeader: {
    paddingVertical: 35,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  themesColorPoint: {
    width: 50,
    height: 50,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
  },
});
