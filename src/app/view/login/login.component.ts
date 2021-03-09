import { Component, OnInit } from '@angular/core';
import { HttpFetchService } from 'src/app/service/http-fetch.service';
import { API } from '../../config/config';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../model/auth.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public loginInvalid: boolean;
  public formSubmitAttempt: boolean;
  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpFetchService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
  }

  /**
   * @description Login service, will receive a token from the backend that can later be used without a password.
   */
  async login() {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    if (this.form.valid) {
      try {
        const username = this.form.get('username').value;
        const password = this.form.get('password').value;

        this.http.postAuth<Auth>(API.post_auth, { user: username, password: password}).subscribe(res => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', username);
            this.router.navigateByUrl('grid');
          } else {
            alert('Login Failed');
          }
        });
      } catch (err) {
        this.loginInvalid = true;
      }
    } else {
      this.formSubmitAttempt = true;
    }
  }

  /**
   * @description Will log you in if the token you are holding is already valid
   */
  async ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    });

    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params)
      if (params.key && params.keyType) {
        this.http.postAuth<Auth>(API.post_auth, { userKey: params.key, passKey: params.keyType }).subscribe(res => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.router.navigateByUrl('grid');
          } else {
            // TODO måske en fejl besked
          }
        });
      }
    });
  }
}
