export let today: Date = new Date();

export const month: number = today.getMonth() + 1;

export const date: number = today.getDate();

function checkDayNumToString() {
  const dayNum: number = today.getDay();

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

export let day: string = checkDayNumToString();
