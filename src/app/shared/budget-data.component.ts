import { Injectable } from "@angular/core";
import { ExpenseEntry, IncomeEntry } from "./budget-entry.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class BudgetDataService {

  incomeSubject = new Subject<IncomeEntry[]>();
  expenseSubject = new Subject<ExpenseEntry[]>();

  incomeEntries: IncomeEntry[] = [
    new IncomeEntry("500", "50", "Wages"),
  ];

  expenseEntries: ExpenseEntry[] = [
    new ExpenseEntry("40", "50", "Phone bill"),
    new ExpenseEntry("40", "50", "Groceries"),
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
  }

  onAddExpenseEntry (expenseEntry: ExpenseEntry) {
    this.expenseEntries.push (expenseEntry) ;
    this.expenseSubject.next(this.expenseEntries)
  }
}