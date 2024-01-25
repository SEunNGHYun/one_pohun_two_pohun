const currentDate: Date = new Date();

export const year: number = currentDate.getFullYear();

export const month: number = currentDate.getMonth() + 1;

export const date: number = currentDate.getDate();

export const today: string = `${year}-${month}-${date}`;

export const saveDayTimeStamp = (y: number, m: number, d: number): number => {
  const setDate = new Date(y, m - 1, d + 1, -15, 0, 0, 0); // month-1일 0:00:00:0000기준

  return setDate.getTime();
};

const saveDayTimeStampEnd = (y: number, m: number, d: number): number => {
  const setDate = new Date(y, m - 1, d, 32, 59, 59, 999); // month-31일 12:59:59:9999기준

  return setDate.getTime();
};

export const nowTimeStamp = (): number => {
  const setDate = new Date();

  return setDate.getTime();
};

export const thisMonthFirst = saveDayTimeStamp(year, month, 1);

export const thisMonthLast = saveDayTimeStampEnd(year, month, 31);

export const todayTimeStampFirst = saveDayTimeStamp(year, month, date);

export const todayTimeStampLast = saveDayTimeStampEnd(year, month, date);

export const currentDate2: Date = new Date();
currentDate2.setMonth(currentDate2.getMonth() - 6);

export const before6Month = {
  year: currentDate2.getFullYear(),
  month: currentDate2.getMonth() + 1,
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
