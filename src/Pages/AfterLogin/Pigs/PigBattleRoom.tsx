import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, useWindowDimensions} from 'react-native';
import {useRecoilValue} from 'recoil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import database from '@react-native-firebase/database';
import BattleUserData from '../../../Components/BattleUserData';
import {primaryColor, title2} from '../../../utils/styles';
import type {Themes} from '../../../types/types';
import {appTheme} from '../../../recoils/states';

export default function PigBattleRoom({route, navigation}) {
  const {roomKey} = route.params;
  let {width} = useWindowDimensions();
  const [user1Data, setUser1] = useState<object>({});
  const [user2Data, setUser2] = useState<object>({});
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
            const {user1, user2, cost} = snap.val();
            console.log('this room goal cost', cost);
            setCurrentSaveRoomCost(cost);
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

  return (
    <View style={styles.view}>
      <Text style={[styles.totalCost, {color: theme}]}>
        남은 목표금액{'\t'}
        {currentSaveRoomCost - (user2SaveCost + user1SaveCost)}원
      </Text>
      <View style={{flexDirection: 'row'}}>
        <BattleUserData
          position="left"
          userData={user1Data}
          setUserSaveCost={setUser1SaveCost}
        />
        <MaterialCommunityIcons
          name="piggy-bank"
          color={theme}
          size={68}
          style={[
            styles.pigIcon,
            {marginLeft: (width - 36) / 2 - 30, marginTop: 120},
          ]}
        />
        <BattleUserData
          position="right"
          userData={user2Data}
          setUserSaveCost={setUser2SaveCost}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingHorizontal: 18,
  },
  totalCost: {
    ...title2,
  },
  pigIcon: {
    zIndex: 2,
    height: 150,
    position: 'absolute',
  },
});
