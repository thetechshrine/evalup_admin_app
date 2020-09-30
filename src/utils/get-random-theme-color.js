const availableColors = [
  '#000000',
  '#2D3748',
  '#171923',
  '#F56565',
  '#E53E3E',
  '#9B2C2C',
  '#63171B',
  '#822727',
  '#C05621',
  '#DD6B20',
  '#652B19',
  '#B7791F',
  '#38A169',
  '#2F855A',
  '#285E61',
  '#234E52',
  '#63B3ED',
  '#3182CE',
  '#0BC5EA',
  '#00B5D8',
  '#9F7AEA',
  '#805AD5',
  '#6B46C1',
  '#553C9A',
  '#322659',
  '#D53F8C',
  '#B83280',
  '#97266D',
  '#9F7AEA'
];

export default function () {
  return availableColors[Math.floor(Math.random() * availableColors.length)];
}
