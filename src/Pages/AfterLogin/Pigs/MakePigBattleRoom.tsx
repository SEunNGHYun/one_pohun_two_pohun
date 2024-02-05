import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import UserDataHeader from '../../../Components/UserDataHeader';
import {userState, appTheme} from '../../../recoils/states';
import type {UserData, Themes} from '../../../types/types';
import {grayColor, title4, defaultFont, descColor} from '../../../utils/styles';
import TextAreaAndButtons from '../../../Components/InputButts';
import type {PigUseNaviProps} from '../../../navi/Navigation';

export default function MakePigBattleRoom() {
  const navigation = useNavigation<PigUseNaviProps>();
  const theme = useRecoilValue<Themes>(appTheme);
  const userData = useRecoilValue<UserData>(userState);
  const [groupGoalCost, setGroupGoalCost] = useState<number>(0);

  const movePage = useCallback(() => {
    navigation.navigate('MatchingRoom');
  }, [navigation]);

  return (
    <View style={styles.view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <UserDataHeader
          headerRange={3.5}
          imgSize={150}
          theme={theme}
          userData={userData}
        />
        <View style={styles.body}>
          <TextAreaAndButtons
            title={'총 목표 금액'}
            subtitle="최대 80만원"
            type="cost"
            setGroupGoalCost={setGroupGoalCost}
            groupGoalCost={groupGoalCost}
          />
          <Text style={[styles.titleFont, {color: theme}]}>
            목표 {'\t'}
            <Text style={styles.subtitle}>(15자 이내로)</Text>
          </Text>
          <TextInput placeholder="예시) 11월 일본여행?" />
          <Pressable onPress={movePage}>
            <View style={styles.bottom}>
              <Text style={[styles.buttFont, {color: theme}]}>초대하기</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={theme}
                size={44}
              />
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
  },
  body: {
    paddingHorizontal: 18,
  },

  titleFont: {
    ...title4,
    marginTop: 26,
  },
  subtitle: {
    ...defaultFont,
    fontSize: 15,
    color: descColor,
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  buttFont: {fontSize: 22, fontWeight: 'bold'},
});
