import React, {useState, useEffect} from 'react';
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
import {primaryColor, title2} from '../../../utils/styles';
import {changeMoney, today} from '../../../utils/utils';
import type {Themes} from '../../../types/types';
import {appTheme} from '../../../recoils/states';

export default function PigBattleRoom({route, navigation}) {
  const {roomKey} = route.params;
  let {width} = useWindowDimensions();
  const [user1Data, setUser1] = useState<object>({});
  const [user2Data, setUser2] = useState<object>({});
  const [period, setPeriod] = useState<string | null>(null);
  const [isRoomFinish, setIsRoomFinish] = useState<boolean>(false);
  const [user1Finish, setUser1Finish] = useState<boolean>(false);
  const [user2Finish, setUser2Finish] = useState<boolean>(false);
  const [user1SaveCost, setUser1SaveCost] = useState<number>(0);
  const [user2SaveCost, setUser2SaveCost] = useState<number>(0);
  const [currentSaveRoomCost, setCurrentSaveRoomCost] = useState<number>(0);
  const theme = useRecoilValue<Themes>(appTheme);

  useEffect(() => {
    const getRoomInformation = async () => {
      try {
        // 검색 먼저 하기
        return await database()
          .ref(`/battles/${roomKey}`)
          .on('value', async snap => {
            const {user1, user2, cost, period} = snap.val();
            setCurrentSaveRoomCost(cost);
            setPeriod(period);
            await database()
              .ref(`/users/${user1}`)
              .on('value', value =>
                setUser1({...value.val(), roomGoalCost: cost / 2}),
              );
            await database()
              .ref(`/users/${user2}`)
              .on('value', value =>
                setUser2({...value.val(), roomGoalCost: cost / 2}),
              );
          });
      } catch (err) {}
    };
    getRoomInformation();

    return () =>
      database().ref(`/battles/${roomKey}`).off('value', getRoomInformation);
  }, [roomKey]);

  useEffect(() => {
    if (user1Finish && user2Finish) {
      setIsRoomFinish(true);
      // 둘다 모았을 때
    } else if (period === today) {
      setIsRoomFinish(true);
      // 방 마감일 일 때
    }
  }, [period, user1Finish, user2Finish]);

  return (
    <View style={styles.view}>
      <Text
        numberOfLines={2}
        adjustsFontSizeToFit={true}
        style={[styles.totalCost, {color: theme}]}>
        남은 목표금액{'\t'}
        {changeMoney(
          currentSaveRoomCost - (user2SaveCost + user1SaveCost) + '',
        )}
        원
      </Text>
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
      <Pressable>
        <View>
          <Text>나가기</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 8,
    paddingHorizontal: 18,
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
});
