import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, length: number = 250): string {
        if (value.length <= length) {
            return value;
        } else {
            return value.substr(0, length) + '...';
        }
    }
}
