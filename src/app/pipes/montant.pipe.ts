import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'montant'
})
export class MontantPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    return null;
  }

}
