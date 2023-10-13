import * as dayjs from 'dayjs';

export function getAge(
    date: string,
    configPassed?: {
        isShort?: boolean;
        level?: 1 | 2;
    },
) {
    const res = [];
    const now = dayjs();
    const defaultConfig = { isShort: true, level: 1 };
    const config = { ...defaultConfig, ...(configPassed || {}) };

    const durationDay = now.diff(date, 'day');
    if (durationDay > 0) {
        res.push(durationDay + ` ${getName(durationDay, 'day', config.isShort)}`);
    }

    if (isGetAgeDone(res, config.level)) {
        return res.join(' ') + ' ago';
    }

    const durationHours = now.diff(date, 'hour') % 24;
    if (durationHours > 0) {
        res.push(durationHours + ` ${getName(durationHours, 'hour', config.isShort)}`);
    }

    if (isGetAgeDone(res, config.level)) {
        return res.join(' ') + ' ago';
    }

    const durationMinutes = now.diff(date, 'minute') % 60;
    if (durationMinutes > 0) {
        res.push(durationMinutes + ` ${getName(durationMinutes, 'minute', config.isShort)}`);
    }

    if (isGetAgeDone(res, config.level)) {
        return res.join(' ') + ' ago';
    }

    const durationSeconds = now.diff(date, 'second') % 60;
    if (durationSeconds > 0) {
        res.push(durationSeconds + ` ${getName(durationSeconds, 'second', config.isShort)}`);
    }

    return res.join(' ') + (res.length ? ' ago' : '');
}

function getName(duration: number, type: 'day' | 'hour' | 'minute' | 'second', isShort = false) {
    const shortNameMap = {
        day: 'day',
        hour: 'hr',
        minute: 'min',
        second: 'sec',
    };

    if (duration > 1) {
        return isShort ? shortNameMap[type] + 's' : type + 's';
    } else {
        return isShort ? shortNameMap[type] : type;
    }
}

function isGetAgeDone(res: string[], level = 2) {
    return res.length == level;
}
