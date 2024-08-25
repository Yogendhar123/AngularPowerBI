import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'tableFilter',
})
export class SearchPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    console.log(value);
    if (!args) {
      return value;
    }
    return value.filter((val: any) => {
      let rVal =
        val.name.toLocaleLowerCase().includes(args) ||
        val.remarks.toLocaleLowerCase().includes(args) ||
        val.status.toLocaleLowerCase().includes(args) ||
        val.supplier.toLocaleLowerCase().includes(args);
      return rVal;
    });
  }
}
