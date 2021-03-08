import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { HttpFetchService } from './service/http-fetch.service';
import { LoginComponent } from './view/login/login.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JwtModuleOptions } from '@auth0/angular-jwt';
import { MatCardModule } from '@angular/material/card';
import { MessageGridComponent } from './view/message-grid/message-grid.component';
import { GridsterModule } from 'angular-gridster2';
import { MatSelectModule } from '@angular/material/select';
import { GridItemImageComponent } from './view/message-grid/grid-item-image/grid-item-image.component';
import { MatMenuModule } from '@angular/material/menu';

export function tokenGetter() {
  return localStorage.getItem("token");
}

const JWT_Module_Options: JwtModuleOptions = {
  config: {
    tokenGetter: tokenGetter,
    allowedDomains: ["/login", "/"],
    disallowedRoutes: ["/images"],
  },
};

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MessageGridComponent,
    GridItemImageComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    GridsterModule,
    MatSelectModule,
    MatMenuModule,
    JwtModule.forRoot(JWT_Module_Options),

  ],
  providers: [HttpFetchService],
  bootstrap: [AppComponent]
})

export class AppModule { }
