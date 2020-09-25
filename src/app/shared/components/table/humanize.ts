import {Pipe, PipeTransform} from '@angular/core';
 
@Pipe({
 name: 'humanize'
})
 
export class HumanizePipe implements PipeTransform {
 transform(value: string) {
 if ((typeof value) !== 'string') {
 return value;
 }
 value = value.split('_').join(' ');
 value = value.charAt(0).toUpperCase() + value.slice(1);
 return value;
 }
}