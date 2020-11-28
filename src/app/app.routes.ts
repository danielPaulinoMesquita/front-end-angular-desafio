import {LoginComponent} from "./security/login/login.component";
import {ClienteComponent} from "./cliente/cliente.component";
import {ClienteDetailComponent} from "./cliente/cliente-detail/cliente-detail.component";
import {HomeComponent} from "./home/home.component";
import {Guard} from "./guard";

export const ROUTES = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'cliente', component: ClienteComponent, canActivate: [Guard]},
  { path: 'cliente-detail/:id', component: ClienteDetailComponent, canActivate: [Guard]},
];
