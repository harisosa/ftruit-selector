import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { User } from './_model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'fruit-selector';

  currentUser? :User;

  constructor(
      private router: Router,
      private authenticationService: AuthService
  ) {
      
      this.authenticationService.currentUser.subscribe(
        (res : any) => {
          if (typeof res == "object" && res != null){
            if (Object.keys(res).length > 0){
              this.currentUser = res
            }
          }
        });
        console.log( this.currentUser)
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
