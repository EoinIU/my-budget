// Importing required modules and classes
import { Injectable } from "@angular/core";
import { ExpenseEntry, IncomeEntry } from "./budget-entry.model";
import { Subject, map } from "rxjs";
import { HttpClient } from "@angular/common/http";

// Injectable decorator: Marks the class as injectable and registers it with the root injector
@Injectable({ providedIn: "root" })
export class BudgetDataService {

    // Declaring variables
    public maxIncomeId: number;
    public maxExpenseId: number;
    public totalYearlyIncome: number;
    public totalYearlyExpense: number;

    constructor(private http: HttpClient){}

    // Subjects to hold and broadcast changes in income and expense entries
    incomeSubject = new Subject<IncomeEntry[]>();
    expenseSubject = new Subject<ExpenseEntry[]>();
    totalYearlyIncomeSubject: Subject<number> = new Subject<number>();
    totalYearlyExpenseSubject: Subject<number> = new Subject<number>();

    // Initial data for income and expense entries
    incomeEntries: IncomeEntry[] = [];
    expenseEntries: ExpenseEntry[] = [];

    // Method to delete an income entry based on its index
    incomeDelete(id: string) {
        this.http.delete<{message: string}>('http://localhost:3000/remove-income-entry/' + id).subscribe((jsonData) => {
        console.log(jsonData);
        this.getIncomeEntries();
        this.totalYearlyIncome = this.calculateTotalYearlyIncome();
        this.totalYearlyIncomeSubject.next(this.totalYearlyIncome);
        this.getTotalYearlyIncome();
        })
    }

    // Method to delete an expense entry based on its index
    expenseDelete(id: string) {
        this.http.delete<{message: string}>('http://localhost:3000/remove-expense-entry/' + id).subscribe((jsonData) => {
        console.log(jsonData);
        this.getExpenseEntries();
        this.totalYearlyExpense = this.calculateTotalYearlyExpense();
        this.totalYearlyExpenseSubject.next(this.totalYearlyExpense);
        this.getTotalYearlyExpense();
        })
    }

    // Method to add a new income entry
    onAddIncomeEntry(incomeEntry: IncomeEntry) {
        this.http.get<{ maxIncomeId: string }>('http://localhost:3000/max-income-id').subscribe((jsonData) => {
          incomeEntry.id = jsonData.maxIncomeId + 1;
          this.http.post<{ message: string }>('http://localhost:3000/add-income-entry', incomeEntry).subscribe((jsonData) => {
            console.log(incomeEntry);
            this.getIncomeEntries();
      
            // Add the new entry to the income entries array
            this.incomeEntries.push(incomeEntry);
            this.incomeSubject.next(this.incomeEntries); // Notify subscribers about the updated income entries
      
            // Calculate the total yearly income including the newly added entry
            this.totalYearlyIncome = this.calculateTotalYearlyIncome();
            this.totalYearlyIncomeSubject.next(this.totalYearlyIncome); // Update the totalYearlyIncome value
            this.getTotalYearlyIncome();

          });
        });
      }
      

    // Method to add a new expense entry
    onAddExpenseEntry(expenseEntry: ExpenseEntry) {
        this.http.get<{ maxExpenseId: string }>('http://localhost:3000/max-expense-id').subscribe((jsonData) => {
          expenseEntry.id = jsonData.maxExpenseId + 1;
          this.http.post<{ message: string }>('http://localhost:3000/add-expense-entry', expenseEntry).subscribe((jsonData) => {
            console.log(expenseEntry);
            this.getExpenseEntries();
      
            // Add the new entry to the expense entries array
            this.expenseEntries.push(expenseEntry);
            this.expenseSubject.next(this.expenseEntries); // Notify subscribers about the updated expense entries
      
            // Calculate the total yearly expense including the newly added entry
            this.totalYearlyExpense = this.calculateTotalYearlyExpense();
            this.totalYearlyExpenseSubject.next(this.totalYearlyExpense); // Update the totalYearlyExpense value
            this.getTotalYearlyExpense();
            console.log('get total yearly expense: ',this.getTotalYearlyExpense())

          });
        });
      }
      

    // Method to fetch income entries from the server
    getIncomeEntries(){
      this.http.get<{incomeEntries: any}>('http://localhost:3000/income-entries')
      .pipe(map((responseData) =>{
          return responseData.incomeEntries.map((entry: {
            incomeValue: Number; incomeFrequency: String; incomeDescription: String; incomeYearly: Number; _id: String;
          }) =>{
            return{
              incomeValue: entry.incomeValue,
              incomeFrequency: entry.incomeFrequency,
              incomeDescription: entry.incomeDescription,
              incomeYearly: entry.incomeYearly,
              id: entry._id
            }
          })
      }))
        .subscribe((updateResponse) =>{
          this.incomeEntries = updateResponse;
          this.incomeSubject.next(this.incomeEntries);
          console.log("Income entries updated:", this.incomeEntries);
        })
    }

    // Method to fetch expense entries from the server
    getExpenseEntries(){
      this.http.get<{expenseEntries: any}>('http://localhost:3000/expense-entries')
      .pipe(map((responseData) =>{
          return responseData.expenseEntries.map((entry: {
            expenseValue: Number; expenseFrequency: String; expenseDescription: String; expenseYearly: Number; _id: String;
          }) =>{
            return{
              expenseValue: entry.expenseValue,
              expenseFrequency: entry.expenseFrequency,
              expenseDescription: entry.expenseDescription,
              expenseYearly: entry.expenseYearly,
              id: entry._id
          }
          })
       }))
      .subscribe((updateResponse) =>{
      this.expenseEntries = updateResponse;
      this.expenseSubject.next(this.expenseEntries);
      console.log("Expense entries updated:", this.expenseEntries);
      })
    }

    // Method to get a copy of a specific income entry based on its index
    getIncomeEntry(id: string) {
        const index = this.incomeEntries.findIndex(el =>{
        return el.id == id;
        })
        return this.incomeEntries[index];
    }

    // Method to get a copy of a specific expense entry based on its index
    getExpenseEntry(id: string) {
        const index = this.expenseEntries.findIndex(el =>{
        return el.id == id;
        })
        return this.expenseEntries[index];
    }

    // Method to update an existing income entry based on its index and the new entry data
    onUpdateIncomeEntry(id: string, newEntry: IncomeEntry) {
        this.http.put<{message: string}>('http://localhost:3000/update-income-entry/' + id, newEntry).subscribe((jsonData) => {
        console.log(jsonData.message);
        this.getIncomeEntries();
        this.totalYearlyIncome = this.calculateTotalYearlyIncome();
        this.totalYearlyIncomeSubject.next(this.totalYearlyIncome);
        this.getTotalYearlyIncome();
        })
    }

    // Method to update an existing expense entry based on its index and the new entry data
    onUpdateExpenseEntry(id: string, newEntry: ExpenseEntry) {
        this.http.put<{message: string}>('http://localhost:3000/update-expense-entry/' + id, newEntry).subscribe((jsonData) => {
        console.log(jsonData.message);
        this.getExpenseEntries();
        this.totalYearlyExpense = this.calculateTotalYearlyExpense();
        this.totalYearlyExpenseSubject.next(this.totalYearlyExpense);
        this.getTotalYearlyExpense();
        })
    }

    // Method to fetch the total yearly income from the server
    getTotalYearlyIncome() {
        this.http.get<{ totalYearlyIncome: number }>('http://localhost:3000/total-yearly-income').subscribe((jsonData) => {
          this.totalYearlyIncome = jsonData.totalYearlyIncome;
          this.totalYearlyIncomeSubject.next(this.totalYearlyIncome);
        });
      }
    
      // Method to fetch the total yearly expense from the server
      getTotalYearlyExpense() {
        this.http.get<{ totalYearlyExpense: number }>('http://localhost:3000/total-yearly-expense').subscribe((jsonData) => {
          this.totalYearlyExpense = jsonData.totalYearlyExpense;
          this.totalYearlyExpenseSubject.next(this.totalYearlyExpense);
        });
      }
    
    // Method to calculate the sum of all incomeYearly values using reduce method
    public calculateTotalYearlyIncome(): number {
        return this.incomeEntries.reduce((total, entry) => total + entry.incomeYearly, 0);
      }

    // Mwthod to calculate the sum of all expenseYearly values using reduce method
    public calculateTotalYearlyExpense(): number {
        return this.expenseEntries.reduce((total, entry) => total + entry.expenseYearly, 0);    
      }
    
}