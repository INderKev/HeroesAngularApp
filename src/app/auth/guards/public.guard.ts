import { Inject, inject, Injectable } from '@angular/core';
import { CanActivate, Router, CanMatch, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { take, tap, Observable, map } from 'rxjs';

// @Injectable({providedIn: 'root'})
// export class PublicGuard implements CanMatch, CanActivate{
//   constructor(
//     private authService: AuthService,
//     private router: Router
//   ) { }

//   private checkAuthStatus(): boolean | Observable<boolean>{
//     return this.authService.checkAuthenticationStatus().pipe(
//       tap( isAuthenticated => {
//         if ( isAuthenticated ){
//           this.router.navigateByUrl('/');
//         }
//       }),
//       map( isAuthenticated => !isAuthenticated)
//     );
//   }

//   canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean>  {
//     return this.checkAuthStatus();
//   }

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):  boolean | Observable<boolean> {
//     return this.checkAuthStatus();
//   }
// }

export const PublicGuard = () => {
  const authService =  inject( AuthService );
  const router = inject ( Router );
  return authService.checkAuthenticationStatus().pipe(
    tap( isAuthenticated => {
      if ( isAuthenticated ) router.navigateByUrl('/');
    }),
    map ( isAuthenticated => !isAuthenticated )
  );
}
