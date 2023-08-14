import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BudgetComponent } from './budget/budget.component';
import { IncomeFormComponent } from './income-form/income-form.component';
import { ExpenseFormComponent } from './expense-form/expense-form.component';

const routes: Routes = [
  {path:"", component: BudgetComponent},
  {path: "income-entry", component: IncomeFormComponent},
  {path: "expense-entry", component: ExpenseFormComponent},
  {path:"incomeEdit/:id", component: IncomeFormComponent},
  {path:"expenseEdit/:id", component: ExpenseFormComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
