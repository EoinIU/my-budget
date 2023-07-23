// Importing required modules and classes
import { Injectable } from "@angular/core";
import { ExpenseEntry, IncomeEntry } from "./budget-entry.model";
import { Subject } from "rxjs";

// Injectable decorator: Marks the class as injectable and registers it with the root injector
@Injectable({ providedIn: "root" })
export class BudgetDataService {

  // Subjects to hold and broadcast changes in income and expense entries
  incomeSubject = new Subject<IncomeEntry[]>();
  expenseSubject = new Subject<ExpenseEntry[]>();

  // Initial data for income and expense entries
  incomeEntries: IncomeEntry[] = [
    new IncomeEntry("500", "Weekly", "Wages"),
  ];

  expenseEntries: ExpenseEntry[] = [
    new ExpenseEntry("40", "Monthly", "Phone bill"),
    new ExpenseEntry("40", "Monthly", "Groceries"),
  ];

  // Method to delete an income entry based on its index
  incomeDelete(index: number) {
    this.incomeEntries.splice(index, 1); // Remove the entry from the array
    this.incomeSubject.next(this.incomeEntries); // Notify subscribers about the updated income entries
  }

  // Method to delete an expense entry based on its index
  expenseDelete(index: number) {
    this.expenseEntries.splice(index, 1); // Remove the entry from the array
    this.expenseSubject.next(this.expenseEntries); // Notify subscribers about the updated expense entries
  }

  // Method to add a new income entry
  onAddIncomeEntry(incomeEntry: IncomeEntry) {
    this.incomeEntries.push(incomeEntry); // Add the new entry to the income entries array
    this.incomeSubject.next(this.incomeEntries); // Notify subscribers about the updated income entries
    console.log('Income Entries:', this.incomeEntries); // Log the updated income entries for debugging
  }

  // Method to add a new expense entry
  onAddExpenseEntry(expenseEntry: ExpenseEntry) {
    this.expenseEntries.push(expenseEntry); // Add the new entry to the expense entries array
    this.expenseSubject.next(this.expenseEntries); // Notify subscribers about the updated expense entries
    console.log('Expense Entries:', this.expenseEntries); // Log the updated expense entries for debugging
  }

  // Method to get a copy of a specific income entry based on its index
  getIncomeEntry(index: number) {
    return { ...this.incomeEntries[index] }; // Return a copy of the income entry using object spread
  }

  // Method to get a copy of a specific expense entry based on its index
  getExpenseEntry(index: number) {
    return { ...this.expenseEntries[index] }; // Return a copy of the expense entry using object spread
  }

  // Method to update an existing income entry based on its index and the new entry data
  onUpdateIncomeEntry(paramId: number, newEntry: IncomeEntry) {
    this.incomeEntries[paramId] = newEntry; // Update the income entry in the array
    this.incomeSubject.next(this.incomeEntries); // Notify subscribers about the updated income entries
  }

  // Method to update an existing expense entry based on its index and the new entry data
  onUpdateExpenseEntry(paramId: number, newEntry: ExpenseEntry) {
    this.expenseEntries[paramId] = newEntry; // Update the expense entry in the array
    this.expenseSubject.next(this.expenseEntries); // Notify subscribers about the updated expense entries
  }
}
