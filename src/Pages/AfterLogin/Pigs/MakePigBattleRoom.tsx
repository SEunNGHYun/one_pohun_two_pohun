import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import {useRecoilValue} from 'recoil';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {userState, appTheme} from '../../../recoils/states';
import type {UserData, Themes} from '../../../types/types';
import {grayColor, title4, defaultFont, descColor} from '../../../utils/styles';
import InputButtons from '../../../Components/InputButts';
import type {PigUseNaviProps} from '../../../navi/Navigation';

export default function MakePigBattleRoom() {
  const navigation = useNavigation<PigUseNaviProps>();
  const theme = useRecoilValue<Themes>(appTheme);
  const userData = useRecoilValue<UserData>(userState);

  const movePage = useCallback(() => {
    navigation.navigate('MatchingRoom');
  }, []);

  return (
    <View style={styles.view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
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
          <Text style={[styles.nickname, {color: theme}]}>닉네임</Text>
        </View>
        <InputButtons
          title={'총 목표 금액'}
          subtitle="최대 50만원"
          type="total"
        />
        <InputButtons
          title={'하루 사용 목표액'}
          subtitle="만3천원 추천"
          type="day"
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 18,
  },
  header: {
    alignItems: 'center',
    paddingTop: 36,
  },
  userImgBack: {
    width: 150,
    height: 150,
    borderRadius: 150,
    borderWidth: 1.2,
    borderColor: grayColor,
    backgroundColor: grayColor,
    marginBottom: 18,
  },
  nickname: {
    ...title4,
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
