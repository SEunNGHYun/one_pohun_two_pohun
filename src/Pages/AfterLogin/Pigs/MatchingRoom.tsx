import React, {useCallback, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  Share,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import {grayColor} from '../../../utils/styles';
import type {Themes} from '../../../types/types';
import {appTheme} from '../../../recoils/states';

export default function MatchingRoom({route, navigation}) {
  const {roomKey} = route.params;
  const theme = useRecoilValue<Themes>(appTheme);

  const movePage = useCallback(async () => {
    // 공유 하기
    try {
      await Share.share({
        message: roomKey,
      });
    } catch (err) {}
  }, [roomKey]);

  const isRoomTrueCheck = useCallback(async () => {
    const roomCheck = await database().ref('/battles/').once('value');
    const value = roomCheck.hasChild(`${roomKey}`);

    console.log('roomkey is', value);
    return !value;
  }, [roomKey]);

  useEffect(() => {
    const roomCheck = async () => {
      if (await isRoomTrueCheck()) {
        const keys = ['playingState', 'playingRoomId'];
        await AsyncStorage.multiRemove(keys);
        return navigation.replace('Pig');
      }

      return database()
        .ref(`/battles/${roomKey}`)
        .on('value', snapshot => {
          let {user2} = snapshot.val();
          console.log('user2', user2);
          if (user2 !== '') {
            navigation.replace('PigBattleRoom', {
              roomKey,
            });
          }
        });
    };
    roomCheck();

    return () => database().ref(`/battles/${roomKey}`).off('value', roomCheck);
  }, [roomKey, navigation, isRoomTrueCheck]);

  return (
    <View style={styles.background}>
      <View style={styles.modalView}>
        <View style={styles.modalHeader}>
          <Text style={[styles.modalFont, {color: theme}]}>입장 코드</Text>
          <LottieView
            source={require('../../../assets/waiting.json')}
            style={{width: '35%', height: '100%'}}
            autoPlay
            loop
          />
        </View>
        <TextInput
          style={styles.codeFont}
          editable={false}
          selectTextOnFocus
          value={roomKey}
        />
        <Pressable onPress={movePage}>
          <View style={styles.modalBottom}>
            <Text style={[styles.modalButtFont, {color: theme}]}>공유하기</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              color={theme}
              size={33}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    backgroundColor: '#9b9b9b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    height: '30%',
    backgroundColor: 'white',
    elevation: 1.5,
    shadowColor: 'black',
    borderRadius: 20,
  },
  modalHeader: {
    paddingLeft: 18,
    flexDirection: 'row',
    height: '40%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalFont: {
    fontSize: 32,
    fontFamily: 'GangyonTunTun',
  },
  codeFont: {
    marginHorizontal: 18,
    fontSize: 22,
    color: 'black',
    borderRadius: 8,
    borderWidth: 0.6,
    borderColor: grayColor,
    fontFamily: 'GangyonModu-Bold',
    padding: 10,
    marginBottom: 16,
  },
  modalButtFont: {
    fontSize: 22,
    color: 'black',
    fontFamily: 'GangyonTunTun',
  },
  modalBottom: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});
