import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatToolbarModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './characters/characters.component';
import { ChecklistLineComponent } from './checklist/checklist-line/checklist-line.component';
import { ChecklistComponent } from './checklist/checklist.component';
import { HoALevelPipe } from './pipes/hoa-level.pipe';
import { SafeBackgroundImagePipe } from './pipes/safe-background-image.pipe';
import { CharacterImagePipe } from './services/battle-net/character/character-image.pipe';

@NgModule({
    declarations: [
        AppComponent,
        CharacterImagePipe,
        CharactersComponent,
        ChecklistComponent,

        HoALevelPipe,
        SafeBackgroundImagePipe,
        ChecklistLineComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientJsonpModule,
        BrowserAnimationsModule,

        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
    ],
    providers: [
    ],
    bootstrap: [ AppComponent ],
})
export class AppModule { }
