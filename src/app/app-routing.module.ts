import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MemesComponent} from "./components/memes/memes.component";

const routes: Routes = [
    {
        path: '**',
        component: MemesComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
