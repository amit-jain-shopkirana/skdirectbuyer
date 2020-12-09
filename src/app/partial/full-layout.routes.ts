import { Routes, RouterModule } from '@angular/router';

//Route for content layout with sidebar, navbar and footer
export const Full_ROUTES: Routes = [
    { path: 'ui', loadChildren: () => import('../pages/layout/layout.module').then(m => m.LayoutModule) },
    { path: 'login', loadChildren: () => import('../pages/silent-login/silent-login.module').then(m => m.SilentLoginModule) },  
    { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
