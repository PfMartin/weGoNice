export const dateToString = (d: Date): string => {
  const year = d.getFullYear();
  const month = zeroPad(d.getMonth() + 1, 2);
  const date = zeroPad(d.getDate(), 2);

  return `${year}-${month}-${date}`;
};

export const zeroPad = (num: number, places: number): string =>
  String(num).padStart(places, '0');
