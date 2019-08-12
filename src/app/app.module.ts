import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterService } from './services/battle-net/character/character.service';
import { CharacterImagePipe } from './services/battle-net/character/character-image.pipe';

@NgModule({
    declarations: [
        AppComponent,
        CharacterImagePipe
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        HttpClientJsonpModule,
    ],
    providers: [
        CharacterService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
