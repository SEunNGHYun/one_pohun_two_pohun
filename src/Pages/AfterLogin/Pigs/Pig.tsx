import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Image,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import {Modal, Portal, PaperProvider} from 'react-native-paper';
import LottieView from 'lottie-react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userState, appTheme} from '../../../recoils/states';
import type {UserData, Themes} from '../../../types/types';
import {grayColor, descColor} from '../../../utils/styles';
import type {PigNaviProps} from '../../../navi/Navigation';

export default function Pig({navigation}: PigNaviProps) {
  const [toggleEnterModal, setToggleEnterModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState<string>('');
  const userData = useRecoilValue<UserData>(userState);
  const theme = useRecoilValue<Themes>(appTheme);
  const showModal = useCallback(() => setToggleEnterModal(true), []);
  const hideModal = useCallback(() => setToggleEnterModal(false), []);

  const codeInput = useCallback((t: string) => setCode(t), []);

  const isRoomTrueCheck = useCallback(async () => {
    const roomCheck = await database().ref('/battles/').once('value');
    const value = roomCheck.hasChild(`${code}`);

    console.log('roomkey is', value);
    return value;
  }, [code]);

  const enterBattleRoom = useCallback(async () => {
    //입장 코드가 마감되었을 경우, 입장 가능 기간이 경우, 없는 경우 나누어서
    if (code !== '' && (await isRoomTrueCheck())) {
      const statePair: [string, string] = ['playingState', 'playing'];
      const roomIdPair: [string, string] = ['playingRoomId', code];
      try {
        await database().ref(`/battles/${code}`).update({
          user2: userData.nickname,
        });
        AsyncStorage.multiSet([statePair, roomIdPair]);
        navigation.replace('PigBattleRoom', {
          roomKey: code,
        });
      } catch (err) {}
      // db user2에 해당 user 아이디 적음
    }
  }, [code, navigation, userData, isRoomTrueCheck]);

  useEffect(() => {
    setLoading(true);

    const getEnterRoomStateAndId = async () => {
      let playingState: string | null = null,
        playingRoomId: string | null = null;
      try {
        const roomData = await AsyncStorage.multiGet([
          'playingState',
          'playingRoomId',
        ]);
        playingState = roomData[0][1];
        playingRoomId = roomData[1][1];
      } catch (err) {
      } finally {
        if (playingState === 'playing' || playingState === 'waiting') {
          if (playingRoomId !== null) {
            if (playingState === 'playing') {
              // 게임 진행 중
              navigation.replace('PigBattleRoom', {
                roomKey: playingRoomId,
              });
            } else {
              // 게임 매칭 대기 중
              navigation.replace('MatchingRoom', {
                roomKey: playingRoomId,
              });
            }
          }
        }
        setLoading(false);
      }
    };
    getEnterRoomStateAndId();
    //방이 들어가 있는 상태인지 확인
    //이미 방에 들어가 있으면 PigBattleRoom으로 이동
  }, [navigation]);

  return (
    <PaperProvider>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: grayColor,
          }}>
          <LottieView
            source={require('../../../assets/loading.json')}
            style={{width: '30%', height: '100%'}}
            autoPlay
            loop
          />
        </View>
      ) : (
        <View style={styles.view}>
          <Image
            source={{
              uri:
                userData.img === null
                  ? 'https://cdn.pixabay.com/photo/2023/09/07/14/26/cat-8239223_1280.png'
                  : userData.img,
            }}
            resizeMode="contain"
            style={[styles.userImgBack, {borderColor: theme}]}
          />
          <Pressable onPress={() => navigation.navigate('MakePigBattleRoom')}>
            <View style={[styles.butt, {backgroundColor: theme}]}>
              <Text style={styles.buttText}>만들기</Text>
            </View>
          </Pressable>
          <Pressable onPress={showModal}>
            <View style={[styles.butt, {backgroundColor: theme}]}>
              <Text style={styles.buttText}>입장하기</Text>
            </View>
          </Pressable>
        </View>
      )}
      <Portal>
        <Modal
          visible={toggleEnterModal}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalView}>
          <Text
            adjustsFontSizeToFit={true}
            numberOfLines={1}
            style={[styles.modalFont, {color: theme}]}>
            입장 코드를 입력하세요.
          </Text>
          <TextInput
            placeholderTextColor={descColor}
            style={styles.codeInput}
            onChangeText={codeInput}
          />
          <Pressable onPress={enterBattleRoom} disabled={!code}>
            <View style={styles.modalBottom}>
              <Text
                style={
                  !code
                    ? styles.disableModalButtFont
                    : [styles.modalButtFont, {color: theme}]
                }>
                입장하기
              </Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={!code ? grayColor : theme}
                size={33}
              />
            </View>
          </Pressable>
        </Modal>
      </Portal>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userImgBack: {
    borderWidth: 1.5,
    width: 200,
    height: 200,
    borderRadius: 200,
    backgroundColor: grayColor,
    marginBottom: 60,
  },
  butt: {
    width: 130,
    height: 50,
    backgroundColor: grayColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 24,
  },
  buttText: {
    fontSize: 20,
    color: 'white',
    fontFamily: 'GangyonModu-Bold',
  },
  modalView: {
    backgroundColor: 'white',
    height: 200,
    padding: 20,
    margin: 10,
    borderRadius: 20,
  },
  codeInput: {
    color: 'black',
    padding: 0,
    fontFamily: 'GangyonModu-Bold',
    marginTop: 18,
    margin: 8,
  },
  modalFont: {
    fontSize: 32,
    fontFamily: 'GangyonTunTun',
  },
  modalBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalButtFont: {
    fontSize: 22,
    fontFamily: 'GangyonModu-Bold',
  },
  disableModalButtFont: {
    fontSize: 22,
    fontFamily: 'GangyonModu-Bold',
    color: grayColor,
  },
});
