type liType = {label: string; value: number};

export const moneyRange: liType[] = [
  {label: '0', value: 0},
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3},
  {label: '4', value: 4},
  {label: '5', value: 5},
  {label: '6', value: 6},
  {label: '7', value: 7},
  {label: '8', value: 8},
  {label: '9', value: 9},
];

export const buttonList = (ty: string): liType[] => {
  if (ty === 'total') {
    return [
      {label: '5천원', value: 5000},
      {label: '1만원', value: 10000},
      {label: '5만원', value: 50000},
      {label: '10만원', value: 100000},
    ];
  }
  return [
    {label: '5백원', value: 500},
    {label: '1천원', value: 1000},
    {label: '5천원', value: 5000},
    {label: '1만원', value: 10000},
  ];
};
