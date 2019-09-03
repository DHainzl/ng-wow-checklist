import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CharacterImagePipe } from './core/services/battle-net/character/character-image.pipe';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,

        CharacterImagePipe,
    ],
    imports: [
        AppRoutingModule,

        CoreModule,
        SharedModule,
    ],
    providers: [
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
