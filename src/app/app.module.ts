import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { ShowCompletedPipe } from './checklist/show-completed.pipe';
import { CharacterImagePipe } from './services/battle-net/character/character-image.pipe';

@NgModule({
    declarations: [
        AppComponent,
        CharacterImagePipe,
        CharactersComponent,
        ChecklistComponent,
        ShowCompletedPipe,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientJsonpModule,
    ],
    providers: [
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
