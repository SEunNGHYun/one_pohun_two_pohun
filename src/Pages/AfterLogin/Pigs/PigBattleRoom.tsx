import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import {Modal, Portal, PaperProvider} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import BattleUserData from '../../../Components/BattleUserData';
import {descColor, primaryColor, title2} from '../../../utils/styles';
import {changeMoney, today} from '../../../utils/utils';
import type {Themes} from '../../../types/types';
import {appTheme} from '../../../recoils/states';

export default function PigBattleRoom({route, navigation}) {
  const {roomKey} = route.params;
  let {width} = useWindowDimensions();
  const [user1Data, setUser1] = useState<object>({});
  const [user2Data, setUser2] = useState<object>({});
  const [roomEndDay, setRoomEndDay] = useState<string | null>(null);
  const [isRoomFinish, setIsRoomFinish] = useState<boolean>(false);
  const [isOutRoomModal, setIsOutRoomModal] = useState<boolean>(false);
  const [user1Finish, setUser1Finish] = useState<boolean>(false);
  const [user2Finish, setUser2Finish] = useState<boolean>(false);
  const [user1SaveCost, setUser1SaveCost] = useState<number>(0);
  const [user2SaveCost, setUser2SaveCost] = useState<number>(0);
  const [currentSaveRoomCost, setCurrentSaveRoomCost] = useState<number>(0);
  const theme = useRecoilValue<Themes>(appTheme);

  const isRoomTrueCheck = useCallback(async () => {
    const roomCheck = await database().ref('/battles/').once('value');
    const value = roomCheck.hasChild(`${roomKey}`);

    return !value;
  }, [roomKey]);

  useEffect(() => {
    const getRoomInformation = async () => {
      try {
        if (await isRoomTrueCheck()) {
          return;
        }
        return await database()
          .ref(`/battles/${roomKey}`)
          .on('value', async snap => {
            const {startDay, user1, user2, cost, endDay} = snap.val();
            setCurrentSaveRoomCost(cost);
            setRoomEndDay(endDay);
            await database()
              .ref(`/users/${user1}`)
              .on('value', value =>
                setUser1({
                  ...value.val(),
                  roomGoalCost: cost / 2,
                  roomStartDay: startDay,
                }),
              );
            await database()
              .ref(`/users/${user2}`)
              .on('value', value =>
                setUser2({
                  ...value.val(),
                  roomGoalCost: cost / 2,
                  roomStartDay: startDay,
                }),
              );
          });
      } catch (err) {}
    };
    getRoomInformation();

    return () =>
      database().ref(`/battles/${roomKey}`).off('value', getRoomInformation);
  }, [roomKey, isRoomTrueCheck]);

  useEffect(() => {
    if (user1Finish && user2Finish) {
      setIsRoomFinish(true);
      // 둘다 모았을 때
    } else if (roomEndDay === today) {
      setIsRoomFinish(true);
      // 방 마감일 일 때
    }
  }, [roomEndDay, user1Finish, user2Finish]);

  const pressOutModalYesButton = useCallback(async () => {
    try {
      await database().ref(`/battles/${roomKey}`).remove();
      const keys = ['playingState', 'playingRoomId'];
      await AsyncStorage.multiRemove(keys);
    } catch (err) {
    } finally {
      navigation.replace('Pig');
    }
  }, [navigation, roomKey]);

  const pressOutRoomButton = useCallback(() => {
    setIsOutRoomModal(true);
  }, []);
  const closeOutRoomModal = useCallback(() => {
    setIsOutRoomModal(false);
  }, []);

  return (
    <PaperProvider>
      <View style={styles.view}>
        <View style={styles.header}>
          <Text
            numberOfLines={2}
            adjustsFontSizeToFit={true}
            style={[styles.totalCost, {color: theme}]}>
            남은 목표금액{'\n'}
            {changeMoney(
              currentSaveRoomCost - (user2SaveCost + user1SaveCost) + '',
            )}
            원
          </Text>
          <Pressable onPress={pressOutRoomButton}>
            <View style={styles.outButt}>
              <MaterialCommunityIcons
                name="exit-run"
                color={descColor}
                size={30}
              />
            </View>
          </Pressable>
        </View>
        <View style={{flexDirection: 'row'}}>
          <BattleUserData
            position="left"
            userData={user1Data}
            setUserSaveCost={setUser1SaveCost}
            setUserFinish={setUser1Finish}
          />
          <MaterialCommunityIcons
            name="piggy-bank"
            color={theme}
            size={100}
            style={[
              styles.pigIcon,
              {left: (width - 36) / 2 - 50, top: width / 2.5 - 85},
            ]}
          />
          <BattleUserData
            position="right"
            userData={user2Data}
            setUserSaveCost={setUser2SaveCost}
            setUserFinish={setUser2Finish}
          />
        </View>
      </View>
      <Portal>
        <Modal
          visible={isOutRoomModal}
          onDismiss={closeOutRoomModal}
          contentContainerStyle={styles.closeAskModal}>
          <View style={styles.modalView}>
            <View />
            <View style={styles.modalHeader}>
              <Text style={styles.modalAskFont}>정말 나가시겠습니까?</Text>
            </View>
            <View style={styles.modalBottom}>
              <Pressable onPress={pressOutModalYesButton}>
                <View style={styles.modalButtView}>
                  <Text style={styles.modalButtFont}>네</Text>
                </View>
              </Pressable>
              <Pressable onPress={closeOutRoomModal}>
                <View style={styles.modalButtView}>
                  <Text style={styles.modalButtFont}>아니요</Text>
                </View>
              </Pressable>
            </View>
          </View>
        </Modal>
      </Portal>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  outButt: {
    width: 80,
    height: 50,
    alignItems: 'flex-end',
    marginTop: 18,
  },
  outFont: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'GangyonModu-Bold',
  },
  totalCost: {
    marginTop: 18,
    fontFamily: 'GangyonTunTun',
    fontSize: 40,
  },
  pigIcon: {
    zIndex: 2,
    position: 'absolute',
  },
  closeAskModal: {
    backgroundColor: 'white',
    height: 200,
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  modalView: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalHeader: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalAskFont: {
    color: 'black',
    fontSize: 22,
    fontFamily: 'GangyonModu-Bold',
  },
  modalButtFont: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'GangyonModu-Light',
  },
  modalBottom: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '30%',
    width: '100%',
  },
  modalButtView: {
    width: 80,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
