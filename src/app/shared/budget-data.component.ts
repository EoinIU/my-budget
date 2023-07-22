import { Injectable } from "@angular/core";
import { ExpenseEntry, IncomeEntry } from "./budget-entry.model";


@Injectable({providedIn: "root" })
export class BudgetDataService{

    incomeEntries: IncomeEntry [] = [
        new IncomeEntry ("500", "50", "Wages"),
        

    ]
    expenseEntries: ExpenseEntry [] = [
        new ExpenseEntry ("40", "50", "Phone bill"),
        new ExpenseEntry ("40", "50", "Groceries"),
        

    ]
}