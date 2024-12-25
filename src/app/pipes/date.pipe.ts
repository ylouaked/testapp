import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: string): Date | null {

    if (!value) return null;

    const parts = value.split('/');
    if (parts.length === 3) {
      
      const formattedDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      return formattedDate;
    }
    return null; 
  }
}
  
