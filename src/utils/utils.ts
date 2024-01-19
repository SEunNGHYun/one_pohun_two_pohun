export let currentDate: Date = new Date();

export const year: number = currentDate.getFullYear();

export const month: number = currentDate.getMonth() + 1;

export const date: number = currentDate.getDate();

export const today: string = `${year}-${month}-${date}`;

const currentDate2: Date = new Date();
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
