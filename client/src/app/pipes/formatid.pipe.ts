import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatId'})
export class formatId implements PipeTransform {
  transform(value: number): string {
    const newStr =  `#${value}`;
    return newStr;
  }
}