import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard, NotAuthGuard } from '@guards';

const routes: Routes = [
  {
    path: 'welcome', component: WelcomeComponent,
    canActivate: [NotAuthGuard]
  },
  {
    path: '', loadChildren: './components/dashboard/dashboard.module#DashboardModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
