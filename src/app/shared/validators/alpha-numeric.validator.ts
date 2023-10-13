import { AbstractControl, ValidatorFn } from '@angular/forms';

export function alphaNumericValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        const valid = /^[a-zA-Z0-9]*$/.test(control.value);
        return valid ? null : { alphaNumeric: { value: control.value } };
    };
}
