import React, {useCallback, useState} from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {useRecoilState} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Modal, Portal, PaperProvider, Snackbar} from 'react-native-paper';
import {userState, appTheme} from '../../../recoils/states';
import {UserData, Themes} from '../../../types/types';
import {grayColor} from '../../../utils/styles';

export default function Settings(): React.ReactElement {
  const [userData, setUserData] = useRecoilState<UserData>(userState);
  const [visible, setVisible] = useState<boolean>(false);
  const [themesModalVisible, setThemesVisibleModal] = useState<boolean>(false);
  const [themes, setTheme] = useRecoilState<Themes>(appTheme);
  const [themeList, setThemeList] = useState<
    {color: Themes; checked: boolean}[]
  >([
    {color: '#d54183', checked: true},
    {color: '#f5c9ff', checked: false},
    {color: '#99ffec', checked: false},
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
    themeList.forEach(t => t.checked && setTheme(t.color));
    pressThemeHideModal();
  }, []);

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
          />
          <Text style={styles.userNickname}>dddd</Text>
        </View>
        <View style={styles.body}>
          <Pressable onPress={pressThemeShowModal}>
            <View style={[styles.buttArea, {paddingTop: 16}]}>
              <Text style={styles.defaultFont}>테마색 설정</Text>
            </View>
          </Pressable>
          <Pressable onPress={pressEditSetting}>
            <View style={[styles.buttArea, {paddingTop: 16}]}>
              <Text style={styles.defaultFont}>회원정보 수정하기</Text>
            </View>
          </Pressable>
          <Pressable
            onPress={() => togglePushNotification(!userData.push_notification)}>
            <View style={styles.buttArea}>
              <Text style={styles.defaultFont}>푸시알림 설정</Text>
              {userData.push_notification ? (
                <Icon name="toggle-on" size={45} />
              ) : (
                <Icon name="toggle-off" size={45} />
              )}
            </View>
          </Pressable>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImage: {
    width: 200,
    height: 200,
    borderRadius: 200,
    borderWidth: 1.5,
    borderColor: grayColor,
    marginBottom: 36,
  },
  userNickname: {
    fontSize: 36,
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
    fontSize: 28,
    color: 'black',
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
