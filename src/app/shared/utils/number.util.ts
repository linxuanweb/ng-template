/**
 * Format number to KMB
 * @param num number to format
 * @param digitsCount number of digits after decimal point
 * @returns
 */
export function formatNumberToKMB(num: number, digitsCount = 2) {
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
