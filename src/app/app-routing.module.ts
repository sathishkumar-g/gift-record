import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './interceptors/auth-guard';
import { AdminTableComponent } from './admin-table/admin-table.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ShellComponent } from './shell/shell.component';
import { TestTableComponent } from './test-table/test-table.component';
import { ViewTableComponent } from './view-table/view-table.component';

const routes: Routes = [
  {
    path: 'shell',
    component: ShellComponent,
    children: [
      { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
      { path: 'test', component: TestTableComponent, canActivate: [AuthGuard] },
      { path: 'admin', component: AdminTableComponent, canActivate: [AuthGuard] },
      { path: 'view', component: ViewTableComponent, canActivate: [AuthGuard] },
      { path: '**', redirectTo: 'error', pathMatch: 'full' },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
