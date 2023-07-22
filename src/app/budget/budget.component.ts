import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpenseEntry, IncomeEntry } from '../shared/budget-entry.model';
import { BudgetDataService } from '../shared/budget-data.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, OnDestroy {

  incomeEntries: IncomeEntry[] = [];
  incomeSubscription: Subscription = new Subscription();
  expenseEntries: ExpenseEntry[] = [];
  expenseSubscription: Subscription = new Subscription();

  constructor(private budgetDataService: BudgetDataService) { }

  ngOnInit(): void {
    this.incomeSubscription = this.budgetDataService.incomeSubject.subscribe(incomeEntries => {
      this.incomeEntries = incomeEntries;
    });

    this.expenseSubscription = this.budgetDataService.expenseSubject.subscribe(expenseEntries => {
      this.expenseEntries = expenseEntries;
    });

    this.expenseEntries = this.budgetDataService.expenseEntries;
    this.incomeEntries = this.budgetDataService.incomeEntries;
  }

  ngOnDestroy(): void {
    this.incomeSubscription.unsubscribe();
    this.expenseSubscription.unsubscribe();
  }

  incomeDelete(index: number) {
    this.budgetDataService.incomeDelete(index);
  }

  expenseDelete(index: number) {
    this.budgetDataService.expenseDelete(index);
  }
}
