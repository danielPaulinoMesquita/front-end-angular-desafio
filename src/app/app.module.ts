import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {TooltipModule} from "ngx-bootstrap/tooltip";
import {ModalModule} from "ngx-bootstrap/modal";
import {BsDropdownModule} from "ngx-bootstrap/dropdown";
import {ClienteComponent} from './cliente/cliente.component';
import {PreloadAllModules, RouterModule} from "@angular/router";
import {ClienteDetailComponent} from './cliente/cliente-detail/cliente-detail.component';
import {LoginComponent} from './security/login/login.component';
import {ROUTES} from "./app.routes";
import {HomeComponent} from './home/home.component';
import {ClienteService} from "./cliente/cliente.service";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import {TextMaskModule} from "angular2-text-mask";
import {LoginService} from "./security/login/login.service";
import {Guard} from "./guard";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClienteComponent,
    ClienteDetailComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    FormsModule,
    TextMaskModule,
    BrowserModule,
    HttpClientModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot(ROUTES, {preloadingStrategy: PreloadAllModules}),
  ],
  providers: [ClienteService, LoginService, Guard],
  bootstrap: [AppComponent]
})
export class AppModule { }
