
import { ChatService } from './../../providers/chat.service';
import { Component } from '@angular/core';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(
              private  cs: ChatService
              ) { }

  ingresar(proveedor: string) {

    this.cs.logIn(proveedor);
    console.log(this.cs.usuario.nombre);
  }

  salir() {

  }
}
