import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';

//MODULOS
import { AppRoutingModule } from './app-routing.module';
import { HeaderModule } from './shared/components/header/header.module';
import { EmployeeFormModule } from './shared/components/employee-form/employee-form.module';
import { AngularFireModule } from '@angular/fire';


//COMPONENTES
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/header/header.component';

//PROVIDERS
import { AngularFirestore } from '@angular/fire/firestore';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HeaderModule,
    EmployeeFormModule,
    AngularFireModule.initializeApp(environment.firebase),
      
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
