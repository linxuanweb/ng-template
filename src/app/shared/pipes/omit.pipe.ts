import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'omit',
})
export class OmitPipe implements PipeTransform {
    transform(value: any, startCount: number, endCount: number): string {
        return omitFunc(value, startCount, endCount);
    }
}

export function omitFunc(value: string, startCount: number, endCount: number) {
    const handledVal = value ? String(value) : '';

    if (handledVal.length <= startCount + endCount) {
        return value;
    }

    return `${handledVal.slice(0, startCount)}...${handledVal.slice(handledVal.length - endCount)}`;
}
