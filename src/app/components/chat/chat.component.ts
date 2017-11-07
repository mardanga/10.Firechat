import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  mensaje= '';
  elemento: any;
  constructor( public cs: ChatService) {
    this.cs.cargarMensajes().subscribe(
      () => {
        setTimeout(function() {
        this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 20);
      }
    );
   }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mesnajes');
  }


  enviarMensaje() {
    this.cs.enviarMensaje(this.mensaje)
      .then( () => { this.mensaje = '' })
      .catch(
        (err) => {console.error('Error al enviar mensaje: ' , err)}
      );
  }
}
