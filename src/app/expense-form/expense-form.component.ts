import { Component, OnInit } from '@angular/core';
import { ExpenseEntry } from '../shared/budget-entry.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetDataService } from '../shared/budget-data.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})

export class ExpenseFormComponent implements OnInit{
    incomeForm: FormGroup;
  expenseForm: FormGroup<{ expenseDescription: any; expenseValue: any; expenseFrequency: any; }>;
  
    constructor (private budgetDataService: BudgetDataService, private router: Router) { }
  
    ngOnInit (): void {
      this.expenseForm = new FormGroup({
        "expenseDescription": new FormControl (null,[Validators.required]),
        "expenseValue": new FormControl (null, [Validators.required]),
        "expenseFrequency": new FormControl (null, [Validators.required])
      })
    }
  
    onSubmit(){
      const newEntry = new ExpenseEntry (this.incomeForm.value.incomeValue, this.incomeForm.value.incomeFrequency,this.incomeForm.value.incomeDescription) ;
      this.budgetDataService.onAddExpenseEntry (newEntry) ;
      this.router.navigateByUrl ("");
      }
  }
  

