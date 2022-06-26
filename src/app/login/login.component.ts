import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { AlertService } from '../services/alert.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    form: any = null
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private alertService : AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        let usr  = {
          username : this.f['username'].value, 
          password : this.f['password'].value
        }
        let found = false
        this.authService.login(usr)
            .subscribe(res => {
              if (res){
                res.user.forEach((data : any)=> {
                  if (data.username == usr.username && data.password == usr.password){
                    localStorage.setItem('currentUser', JSON.stringify(usr));
                    found = true
                    this.alertService.success("Login Succesfull")
                    this.router.navigateByUrl('/fruit');
                    this.authService.userSubject.next(usr)
                  }
                })
                if(!found){
                  this.alertService.error("Incorrect Username or Password")
                 
                } 
                
              }
              this.loading = false
            });
    }
}