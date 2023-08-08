import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/error404-page/error404-page.component';
import { AuthGuard } from './auth/guards/auth.guard';
import { PublicGuard } from './auth/guards/public.guard';

const routes: Routes = [

  {
    path: 'heroes',
    //mediante lazy-load
    loadChildren: () => import('./heroes/heroes.module').then( m => m.HeroesModule),
    canActivate: [ AuthGuard],
    canMatch: [ AuthGuard]
  },
  {
    path: 'auth',
    //mediante lazy-load
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule),
    canActivate: [PublicGuard],
    canMatch: [PublicGuard]
  },
  {
    path: '404',
    component: Error404PageComponent,
  },
  {
    path:'',
    redirectTo: 'heroes',
    //que sea el path exacto porque existen espacios vacios '' entre 'heroes' etc, entonces se usa
    pathMatch:'full',
  },
  {
    path:'**',
    redirectTo:'404',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
