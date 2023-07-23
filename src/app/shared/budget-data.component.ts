import { Injectable } from "@angular/core";
import { ExpenseEntry, IncomeEntry } from "./budget-entry.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class BudgetDataService {

  

  incomeSubject = new Subject<IncomeEntry[]>();
  expenseSubject = new Subject<ExpenseEntry[]>();

  incomeEntries: IncomeEntry[] = [
    new IncomeEntry("500", "Weekly", "Wages"),
  ];

  expenseEntries: ExpenseEntry[] = [
    new ExpenseEntry("40", "Monthly", "Phone bill"),
    new ExpenseEntry("40", "Monthly", "Groceries"),
  ];

  incomeDelete(index: number) {
    this.incomeEntries.splice(index, 1);
    this.incomeSubject.next(this.incomeEntries);
  }

  expenseDelete(index: number) {
    this.expenseEntries.splice(index, 1);
    this.expenseSubject.next(this.expenseEntries);
  }

  onAddIncomeEntry (incomeEntry: IncomeEntry) {
    this.incomeEntries.push (incomeEntry) ;
    this.incomeSubject.next(this.incomeEntries)
    console.log('Income Entries:', this.incomeEntries);
  }

  onAddExpenseEntry (expenseEntry: ExpenseEntry) {
    this.expenseEntries.push (expenseEntry) ;
    this.expenseSubject.next(this.expenseEntries)
    console.log('Expense Entries:', this.expenseEntries);
  } 

  getIncomeEntry(index: number){
    return {...this.incomeEntries [index]}
  }
  getExpenseEntry(index: number){
    return {...this.expenseEntries [index]}
  }
  
  onUpdateIncomeEntry(paramId: number, newEntry: IncomeEntry) {
    this.incomeEntries [paramId] = newEntry;
    this.incomeSubject.next (this.incomeEntries) ;
  }
  onUpdateExpenseEntry(paramId: number, newEntry: ExpenseEntry) {
    this.expenseEntries [paramId] = newEntry;
    this.expenseSubject.next (this.expenseEntries) ;
  }
}