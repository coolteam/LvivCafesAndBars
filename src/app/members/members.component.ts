import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database'
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import { moveIn, fallIn, moveInLeft } from '../router.animations';


@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [moveIn(), fallIn(), moveInLeft()],
  host: {'[@moveIn]': ''}
})
export class MembersComponent implements OnInit {
  name:any;
  state: string='';
  items:FirebaseListObservable<any[]>;

  constructor(public afAuth: AngularFireAuth,private router: Router, public db:AngularFireDatabase) {
    this.items = db.list('/items');
    this.afAuth.authState.subscribe(auth => {
      if(auth){
        this.name=auth;
      }
    });
  }

  logout() {
    this.afAuth.auth.signOut();
    console.log('logged out');
    this.router.navigateByUrl('/login');
  }
  ngOnInit() {
  }

  dataLoad(){
    //this.items.forEach(()=>)
  }

}
