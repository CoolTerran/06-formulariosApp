import { FormControl } from '@angular/forms';


export const noPuedeSerCoolTerran = (control: FormControl) => {
    const valor: string = control.value?.trim().toLowerCase();

    if(valor === 'coolterran') {
      return {
        noCoolTerran: true
      }
    }

    return null;

}