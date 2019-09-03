import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,

        HttpClientModule,
        HttpClientJsonpModule,
    ],
    exports: [
        BrowserModule,
        BrowserAnimationsModule,

        HttpClientModule,
        HttpClientJsonpModule,
    ],
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only!');
        }
    }
}
