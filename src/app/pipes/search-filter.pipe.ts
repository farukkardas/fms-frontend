import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToStringPipe'
})
export class SearchFilterPipe implements PipeTransform {

  transform(value) {
    if (value == 1) {
      value = "Female"
        }
    else {
      value = "Male"
    }
    return value;
    
  }


}
