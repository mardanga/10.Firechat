
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IMensaje } from '../interfaces/mensaje.interface';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<IMensaje>;
  public  chats: IMensaje[] = [];

  constructor( private afs: AngularFirestore ) { }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<IMensaje>('chats', ref => ref.orderBy('fecha', 'desc').limit(10));
    return this.itemsCollection.valueChanges().map(
      mensajes => {
      this.chats = [];
      for (let m of mensajes){
        this.chats.unshift(m);
      };
    });
  }

  enviarMensaje(mensaje) {
    let msg: IMensaje = {
      nombre: 'Demo',
      fecha: new Date().getTime(),
      mensaje: mensaje
    }
    return this.itemsCollection.add(msg);
  }
}
