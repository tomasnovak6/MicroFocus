import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication.service";
import {UserService} from "../../_services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }

  get f() { return this.loginForm.controls; }

  onSubmit(): void {
    if (this.f.name.value && this.f.name.value !== '') {
      this.userService.getUsers().subscribe(users => {
        let foundUser;
        foundUser = users.find(x => x.username === this.f.name.value);

        if (foundUser) {
          this.authenticationService.login(this.f.name.value, foundUser.id);
          this.loginError = false;
        } else {

          this.loginError = true;
        }
      });
    }
  }

}
