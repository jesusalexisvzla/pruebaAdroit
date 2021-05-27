import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { ServiceService } from '../../servicios/servicio.service'
import { Router } from '@angular/router'
import { NgxLoadingModule } from 'ngx-loading';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public loginForm = this.fb.group({
    email: new FormControl({value: '', disabled: false}, Validators.required),
    password: new FormControl({value: '', disabled: false}, Validators.required)
  });
  public loading = false;

  constructor(private fb: FormBuilder, private serviceService: ServiceService, private routerService: Router) {}

  ngOnInit(): void {
    this.loading = true;
    this.serviceService.getProductsMexico("?filter=" + JSON.stringify({include:"branch"}) + "&")
    .then((data) => {
      this.loading = false;
      this.routerService.navigate(['/navbar'])
      })
    .catch((error) => {
      this.loading = false;
    });
  }
  
  login() {
    this.loading = true;
    const email: string = this.loginForm.get('email').value;
    let loginObject: any = {
      ttl: (60 * 60 * 24 * 7 * 48),
      password: this.loginForm.get('password').value
    };
    if (email.includes('@') && email.includes('.')) {
      loginObject.email = email;
    } else {
      loginObject.username = email;
    }

    this.serviceService.loginUser(loginObject)
      .then((data) => {
        this.loading = false;
        this.serviceService.saveUser(data);
        console.log(data);
        this.routerService.navigate(['/navbar'])
      })
      .catch((error) => {
        this.loading = false;
        alert("Usuario y/o contraseña incorrecta")
      });
  }
}
