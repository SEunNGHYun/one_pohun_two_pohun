import React, {useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  Pressable,
} from 'react-native';
import {
  grayColor,
  title4,
  defaultFont,
  descColor,
  primaryColor,
} from '../../../utils/styles';
import InputButtons from '../../../Components/InputButts';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import type {PigUseNaviProps} from '../../../navi/Navigation';

export default function MakePigBattleRoom() {
  const navigation = useNavigation<PigUseNaviProps>();

  const movePage = useCallback(() => {
    navigation.navigate('MatchingRoom');
  }, []);

  return (
    <View style={styles.view}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.userImgBack} />
          <Text style={styles.nickname}>닉네임</Text>
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
        <Text style={styles.titleFont}>
          목표 {'\t'}
          <Text style={styles.subtitle}>(15자 이내로)</Text>
        </Text>
        <TextInput placeholder="예시) 11월 일본여행?" />

        <Pressable onPress={movePage}>
          <View style={styles.bottom}>
            <Text style={styles.buttFont}>초대하기</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              color={primaryColor}
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
    backgroundColor: grayColor,
    marginBottom: 18,
  },
  nickname: {
    ...title4,
    color: primaryColor,
  },
  titleFont: {
    ...title4,
    color: primaryColor,
    marginTop: 36,
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
  buttFont: {fontSize: 22, fontWeight: 'bold', color: primaryColor},
});
