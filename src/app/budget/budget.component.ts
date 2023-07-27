// Importing required modules and components
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ExpenseEntry, IncomeEntry } from '../shared/budget-entry.model';
import { BudgetDataService } from '../shared/budget-data.component';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

// Defining the component metadata
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit, OnDestroy {

  // Arrays to store income and expense entries
  incomeEntries: IncomeEntry[] = [];
  expenseEntries: ExpenseEntry[] = [];

  // Subscriptions to handle observable data streams
  incomeSubscription: Subscription = new Subscription();
  expenseSubscription: Subscription = new Subscription();

  // Constructor to inject services (BudgetDataService and Router)
  constructor(private budgetDataService: BudgetDataService, private router: Router) { }

  // Lifecycle hook: Runs when the component is initialized
  ngOnInit(): void {
    // Subscribing to the income data stream using BehaviorSubject in BudgetDataService
    // Whenever there is a change in income entries, this callback will update the component's incomeEntries
    this.budgetDataService.getIncomeEntries();
    this.incomeSubscription = this.budgetDataService.incomeSubject.subscribe(incomeEntries => {
      this.incomeEntries = incomeEntries;
    });

    // Subscribing to the expense data stream using BehaviorSubject in BudgetDataService
    // Whenever there is a change in expense entries, this callback will update the component's expenseEntries
    this.budgetDataService.getExpenseEntries();
    this.expenseSubscription = this.budgetDataService.expenseSubject.subscribe(expenseEntries => {
      this.expenseEntries = expenseEntries;
    });

    // Initializing the incomeEntries and expenseEntries arrays with the initial data from the service
    this.incomeEntries = this.budgetDataService.incomeEntries;
    this.expenseEntries = this.budgetDataService.expenseEntries;
  }

  // Lifecycle hook: Runs when the component is destroyed
  ngOnDestroy(): void {
    // Unsubscribing from the income and expense data streams to prevent memory leaks
    this.incomeSubscription.unsubscribe();
    this.expenseSubscription.unsubscribe();
  }

  // Method to delete an income entry using the BudgetDataService
  incomeDelete(index: number) {
    this.budgetDataService.incomeDelete(index);
  }

  // Method to delete an expense entry using the BudgetDataService
  expenseDelete(index: number) {
    this.budgetDataService.expenseDelete(index);
  }

  // Method to navigate to the edit income page with the specified index
  incomeEdit(index: number) {
    this.router.navigate(["incomeEdit", index]);
  }

  // Method to get a copy of the income entry at the specified index
  getIncomeEntry(index: number) {
    return { ...this.incomeEntries[index] };
  }

  // Method to navigate to the edit expense page with the specified index
  expenseEdit(index: number) {
    this.router.navigate(["expenseEdit", index]);
  }

  // Method to get a copy of the expense entry at the specified index
  getExpenseEntry(index: number) {
    return { ...this.expenseEntries[index] };
  }
}
