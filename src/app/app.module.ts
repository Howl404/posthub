import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SignUpModalComponent } from './components/sign-up-modal/sign-up-modal.component';
import { GenderSelectorComponent } from './components/sign-up-modal/components/gender-selector/gender-selector.component';
import { SharedModule } from './shared/shared-module.module';
import { LogInModalComponent } from './components/log-in-modal/log-in-modal.component';
import { CreateCommunityModalComponent } from './components/sidebar/create-community-modal/create-community-modal.component';
import { NotificationComponent } from './components/header/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    SignUpModalComponent,
    LogInModalComponent,
    GenderSelectorComponent,
    CreateCommunityModalComponent,
    NotificationComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    SharedModule,
    NgxEchartsModule.forRoot({
      // eslint-disable-next-line import/no-extraneous-dependencies
      echarts: () => import('echarts'),
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
