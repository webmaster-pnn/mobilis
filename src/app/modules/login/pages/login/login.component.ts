import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AuthserviceService } from 'src/app/shared/utils/services/authservice.service';
import { Usuarios } from 'src/app/core/models/usuarios';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  usuario: Usuarios;

  formulario: FormGroup;
  
  constructor(
    private authService: AuthserviceService,
    private formBuilder: FormBuilder
  ) { }

  
  ngOnInit() {
    this.createForm();
    console.log(this.formulario);
  }
  
  authenticated(){
    this.usuario = this.formulario.value;
    console.log(this.usuario);
  }

  createForm(){
    this.formulario = this.formBuilder.group({
      nome_usuario:['', Validators.required],
      senha: ['', Validators.required]
    });
  }

}
