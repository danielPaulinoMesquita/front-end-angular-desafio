import {LoginComponent} from "./security/login/login.component";
import {ClienteComponent} from "./cliente/cliente.component";
import {ClienteDetailComponent} from "./cliente/cliente-detail/cliente-detail.component";
import {HomeComponent} from "./home/home.component";

export const ROUTES = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'cliente', component: ClienteComponent },
  { path: 'login/:to', component: LoginComponent},
  { path: 'cliente-detail/:id', component: ClienteDetailComponent},
];
