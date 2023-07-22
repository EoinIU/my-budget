import { Component, OnInit } from '@angular/core';
import { ExpenseEntry, IncomeEntry } from '../shared/budget-entry.model';
import { BudgetDataService } from '../shared/budget-data.component';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  incomeEntries: IncomeEntry[] = [];
  expenseEntries: ExpenseEntry[] = [];

  constructor (private budgetDataService: BudgetDataService) { }

  ngOnInit () : void {
  this.incomeEntries = this.budgetDataService.incomeEntries;
  this.expenseEntries = this.budgetDataService.expenseEntries;
  }

  incomeDelete ( index: number){
    this.budgetDataService.incomeDelete (index) ;
    this.incomeEntries = this.budgetDataService.incomeEntries;
  }
  expenseDelete ( index: number){
    this.budgetDataService.expenseDelete (index) ;
    this.expenseEntries = this.budgetDataService.expenseEntries;
  }
}
