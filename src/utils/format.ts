import { WEEK_DAYS } from '@/constants/time';

function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

/**
 *
 * @param date date time
 * @returns string 👇️️ (yyyy-mm-dd+hh:mm:ss)
 */
function formatDate(date: Date) {
  return (
    [date.getFullYear(), padTo2Digits(date.getMonth() + 1), padTo2Digits(date.getDate())].join('-') +
    '+' +
    [padTo2Digits(date.getHours()), padTo2Digits(date.getMinutes()), padTo2Digits(date.getSeconds())].join(':')
  );
}

function convertDayToFa(date: string) {
  return WEEK_DAYS[date];
}
export { formatDate, convertDayToFa };
