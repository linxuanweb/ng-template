import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor() {}

    /**
     * Format number to KMB
     * @param num number to format
     * @param digitsCount number of digits after decimal point
     * @returns
     */
    formatNumberToKMB(num: number, digitsCount = 2) {
        let result;
        if (num >= 1e9) {
            result = (num / 1e9).toFixed(digitsCount) + 'B';
        } else if (num >= 1e6) {
            result = (num / 1e6).toFixed(digitsCount) + 'M';
        } else if (num >= 1e3) {
            result = (num / 1e3).toFixed(digitsCount) + 'K';
        } else {
            return num.toFixed(digitsCount);
        }
        if (result.endsWith('.00')) {
            return result.substring(0, result.length - 3);
        } else if (result.charAt(result.length - 1) === '0') {
            return result.substring(0, result.length - 1);
        } else {
            return result;
        }
    }

    getAge(
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
            res.push(durationDay + ` ${this.getName(durationDay, 'day', config.isShort)}`);
        }

        if (this.isGetAgeDone(res, config.level)) {
            return res.join(' ') + ' ago';
        }

        const durationHours = now.diff(date, 'hour') % 24;
        if (durationHours > 0) {
            res.push(durationHours + ` ${this.getName(durationHours, 'hour', config.isShort)}`);
        }

        if (this.isGetAgeDone(res, config.level)) {
            return res.join(' ') + ' ago';
        }

        const durationMinutes = now.diff(date, 'minute') % 60;
        if (durationMinutes > 0) {
            res.push(durationMinutes + ` ${this.getName(durationMinutes, 'minute', config.isShort)}`);
        }

        if (this.isGetAgeDone(res, config.level)) {
            return res.join(' ') + ' ago';
        }

        const durationSeconds = now.diff(date, 'second') % 60;
        if (durationSeconds > 0) {
            res.push(durationSeconds + ` ${this.getName(durationSeconds, 'second', config.isShort)}`);
        }

        return res.join(' ') + (res.length ? ' ago' : '');
    }

    getName(duration: number, type: 'day' | 'hour' | 'minute' | 'second', isShort = false) {
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

    private isGetAgeDone(res: string[], level = 2) {
        return res.length == level;
    }
}
