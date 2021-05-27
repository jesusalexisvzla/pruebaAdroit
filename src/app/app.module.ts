import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { AppBootstrapModule } from './appBootsrapModule.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { ProductosComponent } from './components/productos/productos.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxLoadingModule } from 'ngx-loading';
import { NavbarComponent } from './components/navbar/navbar.component';

const rutas: Routes = [
{
  path: '',
  pathMatch: 'full',
  redirectTo: 'login'
},
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'navbar',
    component: NavbarComponent,
    children: [
      {
        path: '',
        pathMatch: 'prefix',
        redirectTo: 'productos'
      },
      {
        path: 'productos',
        component: ProductosComponent
      },
    ]
  }
]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProductosComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(rutas, {
      enableTracing: true,
      paramsInheritanceStrategy: 'always',
      useHash: true
    }),
    NoopAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatTableModule,
    AppBootstrapModule,
    NgbModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
