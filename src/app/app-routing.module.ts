import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards';
import { EditorComponent } from './editor/editor.component';
import { DetailComponent } from './detail/detail.component';

const appRoutes: Routes = [
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'newPost', component: EditorComponent, canActivate: [AuthGuard] },
    { path: 'editPost/:id', component: EditorComponent, canActivate: [AuthGuard] },
    { path: 'detail/:id', component: DetailComponent, canActivate: [AuthGuard] },

    // otherwise redirect to home
    { path: '**', redirectTo: 'home' }
];

export const routing = RouterModule.forRoot(appRoutes);
