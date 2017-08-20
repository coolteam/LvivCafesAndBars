import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database'
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  items:FirebaseListObservable<any[]>;
  user: Observable<firebase.User>;
  constructor(db:AngularFireDatabase,public afAuth: AngularFireAuth){
    //this.items = db.list('/items');
    //console.log(this.items);
    this.user = afAuth.authState;
  }
  loginFacebook() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider);
  }
  loginGoogle() {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
