import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableComponent } from './shared/table/table.component';
import { SignUpModalComponent } from './components/sign-up-modal/sign-up-modal.component';
import { GenderSelectorComponent } from './components/sign-up-modal/components/gender-selector/gender-selector.component';
import { DynamicFormFieldComponent } from './components/sign-up-modal/components/dynamic-form-field/dynamic-form-field.component';
import { ModalComponent } from './components/modal/modal.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { CommunitiesService } from './shared/communities.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    MainPageComponent,
    TableComponent,
    ModalComponent,
    SignUpModalComponent,
    GenderSelectorComponent,
    DynamicFormFieldComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
