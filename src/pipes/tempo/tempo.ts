import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tempo',
})
export class TempoPipe implements PipeTransform {

  transform(segundos: number) {
    if(segundos < 0)
      return '00:00';
    const minutos: number = Math.floor(segundos /60);
    console.log('minutos no pipe',minutos);
    return minutos + ':' + Math.floor((segundos - minutos * 60));
  }
}
