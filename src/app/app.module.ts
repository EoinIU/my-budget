import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BudgetComponent } from './budget/budget.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import {HttpClientModule} from '@angular/common/http';
import { AboutPageComponent } from './about-page/about-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BudgetComponent,
    IncomeFormComponent,
    ExpenseFormComponent,
    AboutPageComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
