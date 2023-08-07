// Importing required modules and components
import { Component, Injectable, Input, OnDestroy, OnInit } from '@angular/core';
import { ExpenseEntry, IncomeEntry } from '../shared/budget-entry.model';
import { BudgetDataService } from '../shared/budget-data.component';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

// Defining the component metadata
@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})

@Injectable({
  providedIn: 'root'
})

export class BudgetComponent implements OnInit, OnDestroy {

  // Arrays to store income and expense entries
  incomeEntries: IncomeEntry[] = [];
  expenseEntries: ExpenseEntry[] = [];

  // Subscriptions to handle observable data streams
  incomeSubscription: Subscription = new Subscription();
  expenseSubscription: Subscription = new Subscription();

  // Variables
  currentlySelectedPeriod: string = "weekly";
  totalYearlyIncome: number;
  totalYearlyExpense: number;
  selectedPeriodIncome: number;
  selectedPeriodExpense: number;
  disposableIncome: number = 0;

  // Constructor to inject services (BudgetDataService and Router)
  constructor(public budgetDataService: BudgetDataService, private router: Router) { }

  // Lifecycle hook: Runs when the component is initialized
  ngOnInit(): void {
    // Subscribing to the income and expense data streams
    this.budgetDataService.getIncomeEntries();
    this.incomeSubscription = this.budgetDataService.incomeSubject.subscribe(incomeEntries => {
      this.incomeEntries = incomeEntries;
    });

    this.budgetDataService.getExpenseEntries();
    this.expenseSubscription = this.budgetDataService.expenseSubject.subscribe(expenseEntries => {
      this.expenseEntries = expenseEntries;
    });

    // Getting total yearly values and calling the updateTotals function
    this.budgetDataService.getTotalYearlyIncome();
    this.budgetDataService.getTotalYearlyExpense();
    this.updateTotals(this.currentlySelectedPeriod);

    // Subscribing to the total yearly income and expense data streams
    this.budgetDataService.totalYearlyIncomeSubject.subscribe((totalYearlyIncome) => {
      this.totalYearlyIncome = totalYearlyIncome;
      this.updateTotals(this.currentlySelectedPeriod); // Call the updateTotals method after totalYearlyIncome is initialized.
    });

    this.budgetDataService.totalYearlyExpenseSubject.subscribe((totalYearlyExpense) => {
      this.totalYearlyExpense = totalYearlyExpense;
      this.updateTotals(this.currentlySelectedPeriod); // Call the updateTotals method after totalYearlyExpense is initialized.
    });


    // Initializing the incomeEntries and expenseEntries arrays with the initial data from the service
    this.incomeEntries = this.budgetDataService.incomeEntries;
    this.expenseEntries = this.budgetDataService.expenseEntries;

    this.budgetDataService.getTotalYearlyIncome();
    this.totalYearlyIncome = this.budgetDataService.totalYearlyIncome;
    this.budgetDataService.totalYearlyIncomeSubject.subscribe((totalYearlyIncome) => {
      this.totalYearlyIncome = totalYearlyIncome;
    });

    this.budgetDataService.getTotalYearlyExpense();
    this.totalYearlyExpense = this.budgetDataService.totalYearlyExpense;
    this.budgetDataService.totalYearlyExpenseSubject.subscribe((totalYearlyExpense) => {
      this.totalYearlyExpense = totalYearlyExpense;
    });
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

  // Method to handle period selection
  onPeriodSelection(event: any) {
    const selectedPeriod = event.target.value;
    this.updateTotals(selectedPeriod);
    this.updateSelectedPeriod(selectedPeriod);
  }

  updateSelectedPeriod(selectedPeriod: any) {
    this.currentlySelectedPeriod = selectedPeriod;
  }

  // Function to calculate and update the total values based on the selected period
  private updateTotals(selectedPeriod: string) {
    // Calculate selectedPeriodIncome and selectedPeriodExpense based on the selected period
    if (selectedPeriod === 'weekly') {
      this.selectedPeriodIncome = this.budgetDataService.totalYearlyIncome / 52;
      this.selectedPeriodExpense = this.budgetDataService.totalYearlyExpense / 52;
    } else if (selectedPeriod === 'fortnightly') {
      this.selectedPeriodIncome = this.budgetDataService.totalYearlyIncome / 26;
      this.selectedPeriodExpense = this.budgetDataService.totalYearlyExpense / 26;
    } else if (selectedPeriod === 'four-weekly') {
      this.selectedPeriodIncome = this.budgetDataService.totalYearlyIncome / 13;
      this.selectedPeriodExpense = this.budgetDataService.totalYearlyExpense / 13;
    } else if (selectedPeriod === 'monthly') {
      this.selectedPeriodIncome = this.budgetDataService.totalYearlyIncome / 12;
      this.selectedPeriodExpense = this.budgetDataService.totalYearlyExpense / 12;
    } else if (selectedPeriod === 'yearly') {
      this.selectedPeriodIncome = this.budgetDataService.totalYearlyIncome;
      this.selectedPeriodExpense = this.budgetDataService.totalYearlyExpense;
    }

    // Calculate disposableIncome
    this.disposableIncome = this.selectedPeriodIncome - this.selectedPeriodExpense;
  }

}
