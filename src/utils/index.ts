export const padNumber = (num: number, size: number): string => {
  let tempNum = num.toString();
  while (tempNum.length < size) tempNum = "0" + tempNum;
  return tempNum;
}