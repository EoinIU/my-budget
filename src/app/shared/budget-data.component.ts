import { Injectable } from "@angular/core";
import { ExpenseEntry, IncomeEntry } from "./budget-entry.model";
import { Subject } from "rxjs";

@Injectable({ providedIn: "root" })
export class BudgetDataService {

  incomeSubject = new Subject<IncomeEntry[]>();
  expenseSubject = new Subject<ExpenseEntry[]>();

  incomeEntries: IncomeEntry[] = [
    new IncomeEntry("500", "50", "Wages"),
    // Add more initial income entries if needed
  ];

  expenseEntries: ExpenseEntry[] = [
    new ExpenseEntry("40", "50", "Phone bill"),
    new ExpenseEntry("40", "50", "Groceries"),
    // Add more initial expense entries if needed
  ];

  incomeDelete(index: number) {
    this.incomeEntries.splice(index, 1);
    this.incomeSubject.next(this.incomeEntries);
  }

  expenseDelete(index: number) {
    this.expenseEntries.splice(index, 1);
    this.expenseSubject.next(this.expenseEntries);
  }
}