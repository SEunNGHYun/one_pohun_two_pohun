const currentDate: Date = new Date();

export const year: number = currentDate.getFullYear();

export const months: number = currentDate.getMonth() + 1;

export const date: number = currentDate.getDate();

export const today: string = `${year}-${months}-${date}`;

export const getDayTimeStampStart = (
  y: number,
  m: number,
  d: number,
): number => {
  const setDate = new Date(y, m - 1, d + 1, -15, 0, 0, 0); // months-1일 0:00:00:0000기준

  return setDate.getTime();
};

export const getDayTimeStampEnd = (y: number, m: number, d: number): number => {
  const setDate = new Date(y, m - 1, d + 1, 32, 59, 59, 999); // months-31일 12:59:59:9999기준

  return setDate.getTime();
};

export const nowTimeStamp = (): number => {
  let now = new Date();
  return now.getTime();
};

export const thisMonthFirst = getDayTimeStampStart(year, months, 1);

export const thisMonthLast = getDayTimeStampEnd(year, months, 31);
//이번 달 기준 00~12시 까지 타임스탬프

export const todayTimeStampFirst = getDayTimeStampStart(year, months, date);

export const todayTimeStampLast = getDayTimeStampEnd(year, months, date);
//오늘 날짜 기준 00~12시 까지 타임스탬프

export const currentDate2: Date = new Date();
currentDate2.setMonth(currentDate2.getMonth() - 6);

export const before6Month = {
  year: currentDate2.getFullYear(),
  months: currentDate2.getMonth() + 1,
};

function checkDayNumToString() {
  const dayNum: number = currentDate.getDay();

  if (dayNum === 1) {
    return '월';
  } else if (dayNum === 2) {
    return '화';
  } else if (dayNum === 3) {
    return '수';
  } else if (dayNum === 4) {
    return '목';
  } else if (dayNum === 5) {
    return '금';
  } else {
    return '일';
  }
}

export let korea_date: string = checkDayNumToString();

export const categoryData = [
  {label: '식비', value: '식비'},
  {label: '자기개발비', value: '자기개발비'},
  {label: '취미', value: '취미'},
  {label: '기타', value: '기타'},
];

export const changeMoney = (money: string): string => {
  let reversedStr = money.replace(/\D/g, '').split('').reverse().join('');

  // 3자리 단위로 쉼표 추가
  let formattedStr = reversedStr.replace(/(\d{3})/g, '$1,');

  // 다시 역순으로 변환하여 최종 결과 얻기12
  let result = formattedStr.split('').reverse();
  if (result[0] === ',') {
    result = result.slice(1);
  }
  return result.join('');
};

export const compareTimeStamp = (next: string, before: string) => {
  let before2: Date = new Date(Number(before));
  let next2: Date = new Date(Number(next));

  const isNextDay = Math.floor((next2 - before2) / (1000 * 60 * 60 * 24));

  return isNextDay >= 1;
};

export const changeTimeStamp = (timestamp: string) => {
  const date = new Date(Number(timestamp));

  const months: number = date.getMonth() + 1;

  const day: number = date.getDate();

  return `${months}월-${day}일`;
};

/*

1709251200000 해당 달의 첫번째날 00:00기준
  1710201600000 해당 날의 00:00 가쥰
    1710177314189 해당 날의 타임 스탬프 (초까지)
  1710460800000
  1710633600000

*/
