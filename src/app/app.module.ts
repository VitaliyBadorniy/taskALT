import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';


//
import {RouterModule, Routes} from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from './shared/frameworks/material.module';

import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {HoverDirective} from './shared/directives/hover.directive';
import { CreateRedactionComponent } from './create-redaction/create-redaction.component';


const router: Routes = [
  {path: '', redirectTo: 'task-ALT', pathMatch: 'full'},
  {path: 'task-ALT' , component: MainComponent},
  {path: 'create-and-redact' , component: CreateRedactionComponent}
]


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HoverDirective,
    CreateRedactionComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(router, { useHash: true }),
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatMomentDateModule


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
