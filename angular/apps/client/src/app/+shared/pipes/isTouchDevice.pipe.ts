import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name: 'isTouchDevice'
})
export class IsTouchDevicePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

}
