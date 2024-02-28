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
  const setDate = new Date(y, m - 1, d, 32, 59, 59, 999); // months-31일 12:59:59:9999기준

  return setDate.getTime();
};

export const nowTimeStamp = (): number => {
  const setDate = new Date();

  return setDate.getTime();
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
