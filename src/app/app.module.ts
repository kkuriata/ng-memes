import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MemesComponent} from './components/memes/memes.component';
import {StoreModule} from '@ngrx/store';

import {metaReducers, reducers} from './reducers';
import {EffectsModule} from '@ngrx/effects';
import {AppEffects} from './app.effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {RouterState, StoreRouterConnectingModule} from '@ngrx/router-store';
import {EntityDataModule} from '@ngrx/data';
import {entityConfig} from './entity-metadata';

@NgModule({
    declarations: [
        AppComponent,
        MemesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        FlexLayoutModule,
        StoreModule.forRoot(reducers, {
            metaReducers,
            runtimeChecks: {
                strictStateImmutability: true,
                strictActionImmutability: true
            }
        }),
        EffectsModule.forRoot([AppEffects]),
        StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
        StoreRouterConnectingModule.forRoot({routerState: RouterState.Minimal}),
        EntityDataModule.forRoot(entityConfig),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
