import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'emails'
})
export class EmailsPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value.length === 0) return 'usuario sem emails cadastrado'
    let emails = '';
    value.forEach(email => emails += `${email}; `)
    return emails;
  }

}
