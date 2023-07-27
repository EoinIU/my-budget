// Importing required modules and classes
import { Injectable } from "@angular/core";
import { ExpenseEntry, IncomeEntry } from "./budget-entry.model";
import { Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";

// Injectable decorator: Marks the class as injectable and registers it with the root injector
@Injectable({ providedIn: "root" })
export class BudgetDataService {

public maxIncomeId: number;
public maxExpenseId: number;

constructor(private http: HttpClient){}

// Subjects to hold and broadcast changes in income and expense entries
incomeSubject = new Subject<IncomeEntry[]>();
expenseSubject = new Subject<ExpenseEntry[]>();

// Initial data for income and expense entries
incomeEntries: IncomeEntry[] = [];
expenseEntries: ExpenseEntry[] = [];

// Method to delete an income entry based on its index
incomeDelete(id: number) {
this.http.delete<{message: string}>('http://localhost:3000/remove-income-entry/' + id).subscribe((jsonData) => {
console.log(jsonData);
this.getIncomeEntries();
})
}

// Method to delete an expense entry based on its index
expenseDelete(id: number) {
this.http.delete<{message: string}>('http://localhost:3000/remove-expense-entry/' + id).subscribe((jsonData) => {
console.log(jsonData);
this.getExpenseEntries();
})
}

// Method to add a new income entry
onAddIncomeEntry(incomeEntry: IncomeEntry) {
this.http.get<{maxIncomeId: number}>('http://localhost:3000/max-income-id').subscribe((jsonData => {
incomeEntry.id = jsonData.maxIncomeId + 1;
this.http.post<{message: string}>('http://localhost:3000/add-income-entry', incomeEntry).subscribe((jsonData) => {
console.log(incomeEntry);
this.getIncomeEntries();
})
}))
this.incomeEntries.push(incomeEntry); // Add the new entry to the income entries array
this.incomeSubject.next(this.incomeEntries); // Notify subscribers about the updated income entries
console.log('Income Entries:', this.incomeEntries); // Log the updated income entries for debugging
}

// Method to add a new expense entry
onAddExpenseEntry(expenseEntry: ExpenseEntry) {
this.http.get<{maxExpenseId: number}>('http://localhost:3000/max-expense-id').subscribe((jsonData => {
expenseEntry.id = jsonData.maxExpenseId + 1;
this.http.post<{message: string}>('http://localhost:3000/add-expense-entry', expenseEntry).subscribe((jsonData) => {
console.log(expenseEntry);
this.getExpenseEntries();
})
}))
this.expenseEntries.push(expenseEntry); // Add the new entry to the expense entries array
this.expenseSubject.next(this.expenseEntries); // Notify subscribers about the updated expense entries
console.log('Expense Entries:', this.expenseEntries); // Log the updated expense entries for debugging
}

// Method to fetch income entries from the server
getIncomeEntries(){
this.http.get<{incomeEntries: IncomeEntry[]}>('http://localhost:3000/income-entries').subscribe((jsonData) =>{
this.incomeEntries = jsonData.incomeEntries;
this.incomeSubject.next(this.incomeEntries);
})
}

// Method to fetch expense entries from the server
getExpenseEntries(){
this.http.get<{expenseEntries: ExpenseEntry[]}>('http://localhost:3000/expense-entries').subscribe((jsonData) =>{
this.expenseEntries = jsonData.expenseEntries;
this.expenseSubject.next(this.expenseEntries);
})
}

// Method to get a copy of a specific income entry based on its index
getIncomeEntry(id: number) {
const index = this.incomeEntries.findIndex(el =>{
return el.id == id;
})
return this.incomeEntries[index] ;
}

// Method to get a copy of a specific expense entry based on its index
getExpenseEntry(id: number) {
const index = this.expenseEntries.findIndex(el =>{
return el.id == id;
})
return this.expenseEntries[index] ;
}

// Method to update an existing income entry based on its index and the new entry data
onUpdateIncomeEntry(id: number, newEntry: IncomeEntry) {
this.http.put<{message: string}>('http://localhost:3000/update-income-entry/' + id, newEntry).subscribe((jsonData) => {
console.log(jsonData.message);
this.getIncomeEntries();
})
}

// Method to update an existing expense entry based on its index and the new entry data
onUpdateExpenseEntry(id: number, newEntry: ExpenseEntry) {
this.http.put<{message: string}>('http://localhost:3000/update-expense-entry/' + id, newEntry).subscribe((jsonData) => {
console.log(jsonData.message);
this.getExpenseEntries();
})
}
}