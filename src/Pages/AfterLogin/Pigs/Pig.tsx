import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, Pressable, TextInput} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Modal, Portal, PaperProvider} from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import type {PigStackParamList} from '../../../navi/Navigation';
import {grayColor, primaryColor} from '../../../utils/styles';

type Props = NativeStackScreenProps<
  PigStackParamList,
  'MakePigBattleRoom',
  'PigBattleRoom'
>;

export default function Pig({navigation}: Props) {
  const [toggleEnterModal, setToggleEnterModal] = useState(false);
  const [code, setCode] = useState('');

  const showModal = useCallback(() => setToggleEnterModal(true), []);
  const hideModal = useCallback(() => setToggleEnterModal(false), []);

  const codeInput = useCallback((t: string) => setCode(t), []);
  const movePage = useCallback(() => {
    navigation.replace('PigBattleRoom');
  }, []);

  useEffect(() => {
    //방이 들어가 있는 상태인지 확인
    //이미 방에 들어가 있으면 PigBattleRoom으로 이동
  }, []);

  return (
    <PaperProvider>
      <View style={styles.view}>
        <View style={styles.userImgBack} />
        <Pressable onPress={() => navigation.navigate('MakePigBattleRoom')}>
          <View style={styles.butt}>
            <Text style={styles.buttText}>만들기</Text>
          </View>
        </Pressable>
        <Pressable onPress={showModal}>
          <View style={styles.butt}>
            <Text style={styles.buttText}>입장하기</Text>
          </View>
        </Pressable>
      </View>
      <Portal>
        <Modal
          visible={toggleEnterModal}
          onDismiss={hideModal}
          contentContainerStyle={styles.modalView}>
          <Text style={styles.modalFont}>입장 코드를 입력하세요</Text>
          <TextInput style={styles.codeInput} onChangeText={codeInput} />
          <Pressable onPress={movePage} disabled={!code}>
            <View style={styles.modalBottom}>
              <Text style={styles.modalButtFont}>입장하기</Text>
              <MaterialCommunityIcons
                name="chevron-right"
                color={primaryColor}
                size={44}
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
    width: 150,
    height: 150,
    borderRadius: 150,
    backgroundColor: grayColor,
    marginBottom: 120,
  },
  butt: {
    width: 130,
    height: 50,
    backgroundColor: grayColor,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: 54,
  },
  buttText: {
    fontSize: 20,
    color: 'white',
  },
  modalView: {backgroundColor: 'white', height: 200, padding: 20, margin: 10},
  codeInput: {
    marginTop: 18,
    margin: 8,
  },
  modalFont: {
    fontSize: 32,
    fontWeight: 'bold',
    color: primaryColor,
  },
  modalBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  modalButtFont: {
    fontSize: 22,
    fontWeight: 'bold',
    color: primaryColor,
  },
});
