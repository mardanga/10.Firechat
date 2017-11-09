
import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { IMensaje } from '../interfaces/mensaje.interface';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<IMensaje>;
  public  chats: IMensaje[] = [];
  public usuario: any= {};
  constructor( private afs: AngularFirestore,
              public afAuth: AngularFireAuth
             ) {

    this.afAuth.authState.subscribe(
      user => {
        if (!user) {
          return;
        }
        console.log(user);
        this.usuario.nombre = user.displayName != null ? user.displayName : user.email;
        this.usuario.uid = user.uid;
        this.usuario.foto = user.photoURL;

        console.log(this.usuario);
      }
    );

  }

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
      nombre: this.usuario.nombre,
      fecha: new Date().getTime(),
      mensaje: mensaje,
      uid: this.usuario.uid
    }
    return this.itemsCollection.add(msg);
  }

  logIn(proveedor: string) {
    switch (proveedor) {
      case 'google':
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        break;
      case 'gh':
        this.afAuth.auth.signInWithPopup(new firebase.auth.GithubAuthProvider());
        break;
      default:
        this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
        break;
    }
  }

  logOut() {
    this.afAuth.auth.signOut();
    this.usuario = {};
  }

}
