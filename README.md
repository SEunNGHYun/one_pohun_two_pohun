# 한푼두푼 어플리케이션

### 설명

---

고물가 시대 절약이라도하자!
자신의 소비습관을 개선할 수 있도록 도와주는 어플리케이션입니다.

### 사용기술

---

```
"typescript": "^4.8.4",
"react": "18.2.0",
"react-native": "0.72.4",
"@react-native-firebase/app": "^18.7.3",
"@react-native-firebase/database": "^18.7.3",
"@react-navigation/material-bottom-tabs": "^6.2.16",
"@react-navigation/native": "^6.1.7",
"@react-navigation/native-stack": "^6.9.13",
"@react-native-async-storage/async-storage": "^1.19.5",
"lottie-react-native": "^6.4.1",
"appcenter": "5.0.0",
"react-native-code-push": "^8.1.0",
"react-native-lottie-splash-screen": "^1.1.2",
"recoil": "^0.7.7",
"@babel/core": "^7.20.0",
"@babel/preset-env": "^7.20.0",
"@babel/runtime": "^7.20.0",
... 자세한 부분은 package.json 참고
```

#### 디자인

[카카오 오븐에서 확인하기](https://ovenapp.io/view/ODyBQ3ugDs0Iw68SvfDkk7ZVFXbo841H/)

### 흐름도

---

### 구현 기능 예정

**-- 1.0.0 버전 베포 전에 구현할 기능 👨🏽‍🚀**

- [ ] 전체적인 UI 구현 (회원가입[o], 배틀[o], 메인[o], 설정)
- [ ] 기능 구현
  - [x] 메인 (캘린더(o), 소비금액 추가(o), 그래프로 소비금액 보가[준비 중])
  - [ ] 배틀룸 (방만들기(o), 방들어가기(o), 방(o), 방나가기[기간 만료, 퇴장, 게임 끝나기](구현 예정) )
  - [ ] 설정 (회원 정보 수정[구현 예정], 회원 탈퇴(o), 알림 설정(o), 테마 설정(o))
- [x] codepush 세팅 (테스트 필요)
- [x] firebase RealtimeDatabase 세팅
- [x] firebase push notification 세팅
- [x] firebase storage 세팅
- [x] 폰트 추가
- [ ] 에러 분기 모달 추가
- [x] lottie를 이용한 로딩 구현
- [x] splash screen 구현

-- 현재 발생 에러

- [] 메인 bottomsheet 부자연스럽
- [] 전체적으로 폰트 적용 다시 수정
- [] keyboard 나올 시에 하단 버튼 올라가는 에러
