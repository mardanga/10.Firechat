
import { Component, OnInit } from '@angular/core';

import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html'
})
export class ChatComponent implements OnInit {

  mensaje= '';
  eleme: any;
  constructor( public cs: ChatService) {
    this.cs.cargarMensajes().subscribe(
      () => {
        setTimeout(function() {
         this.eleme = document.getElementById('app-msjs');
        this.eleme.scrollTop = this.eleme.scrollHeight;
        }, 20);
      }
    );
   }

  ngOnInit() {
     this.eleme = document.getElementById('app-msjs');
  }


  enviarMensaje() {
    this.cs.enviarMensaje(this.mensaje)
      .then( () => { this.mensaje = '' })
      .catch(
        (err) => {console.error('Error al enviar mensaje: ' , err)}
      );
  }
}
