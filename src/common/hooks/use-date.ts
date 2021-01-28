import {DateTime} from 'luxon';
import {getDate} from 'common/lib/get-date';

export function useDate() {
    const getDateTime = (date: string) => DateTime.fromISO(date);

    return {getDate, getDateTime};
}
