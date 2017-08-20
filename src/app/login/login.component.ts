import { Component, OnInit, HostBinding } from '@angular/core';
import {Router} from '@angular/router';
import {moveIn} from '../router.animations';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {
  private error:any;

  constructor(public afAuth: AngularFireAuth,private router: Router) { 
    this.afAuth.authState.subscribe(auth => {
      if(auth){
        this.router.navigateByUrl('/members');
      }
    });
  }

  loginFb(){
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    this.afAuth.auth.signInWithPopup(provider).then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  loginGoogle(){
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');
    this.afAuth.auth.signInWithPopup(provider).then(
        (success) => {
        this.router.navigate(['/members']);
      }).catch(
        (err) => {
        this.error = err;
      })
  }

  ngOnInit() {
  }

}
