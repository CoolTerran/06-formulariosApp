import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validator/email-validator.service';
import { ValidatorService } from 'src/app/shared/validator/validator.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario:FormGroup = this.fb.group({
    nombre: [ '', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)] ],
    email: [ '', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [ this.emailValidator ] ],
    username: [ '', [Validators.required, this.validatorService.noPuedeSerCoolTerran] ],
    password: [ '', [Validators.required, Validators.minLength(6)] ],
    password2: [ '', [Validators.required] ]
  }, {
    validators: [this.validatorService.camposIguales('password', 'password2')]
  });

  get emailErrorMsg(): string {

    const errors = this.miFormulario.get('email')?.errors;

    if(errors?.["required"]) {
      return 'El email es obligatorio';
    } else if(errors?.["pattern"]) {
      return 'El valor ingresado no tiene formato de correo';
    } else if(errors?.["emailTomado"]) {
      return 'El correo ya está siendo utilizado';
    }

    return '';
  }

  constructor(private fb: FormBuilder,
              private validatorService: ValidatorService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Marlon Orihuela',
      email: 'test1@test.com',
      username: 'RoyalGamer',
      password: '123456',
      password2: '123456'
    });
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid
           && this.miFormulario.get(campo)?.touched;
  }


  submitFormulario() {
    console.log(this.miFormulario.value);

    this.miFormulario.markAllAsTouched();
  }

}
