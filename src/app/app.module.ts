import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { LoginComponent } from './components/login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import { JwtHelperService, JWT_OPTIONS  } from '@auth0/angular-jwt';
import {ReactiveFormsModule} from "@angular/forms";
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LogoutComponent } from './components/logout/logout.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import { CategoryComponent } from './components/category/category/category.component';
import {MatCheckboxModule} from "@angular/material/checkbox";
import { AddFriendComponent } from './components/category/category/modal/add-friend/add-friend.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import { AddElementComponent } from './components/category/category/modal/add-element/add-element.component';
import {MatMenuModule} from "@angular/material/menu";

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LoginComponent,
    LogoutComponent,
    CategoryComponent,
    AddFriendComponent,
    AddElementComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatToolbarModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatMenuModule,
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
