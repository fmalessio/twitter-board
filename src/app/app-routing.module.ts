import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignedoutComponent } from './signedout/signedout.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'signedout', component: SignedoutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
