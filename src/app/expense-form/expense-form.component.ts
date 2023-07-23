import { Component, OnInit } from '@angular/core';
import { ExpenseEntry } from '../shared/budget-entry.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetDataService } from '../shared/budget-data.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})

export class ExpenseFormComponent implements OnInit{
  
  expenseForm: FormGroup;
  editMode = false;
  expenseEntry: ExpenseEntry;
  paramId: number;
  //expenseForm: FormGroup<{ expenseDescription: any; expenseValue: any; expenseFrequency: any; }>;
  

  frequencyOptions: string[] = ["Weekly", "Fortnightly", "Four-weekly", "Monthly", "Yearly"];

  
    constructor (private budgetDataService: BudgetDataService, private router: Router, private activatedRoute: ActivatedRoute) { }
  
    ngOnInit (): void {
      this.activatedRoute.paramMap. subscribe (paramMap =>{
        if (paramMap.has ('id')){
          this.editMode=true;
          this.paramId = +paramMap.get('id')!;
          this.expenseEntry = this.budgetDataService.getExpenseEntry(this.paramId);
        }
        else{
          this.editMode = false;
        }
      })
  
      console.log('Expense Entry:', this.expenseEntry);
      this.expenseForm = new FormGroup({
        "expenseDescription": new FormControl (this.editMode ? this.expenseEntry.expenseDescription : null,[Validators.required]),
        "expenseValue": new FormControl (this.editMode ? this.expenseEntry.expenseValue : null, [Validators.required]),
        "expenseFrequency": new FormControl (this.editMode ? this.expenseEntry.expenseFrequency : null)
      });
    }
  
    onSubmit(){
      const newEntry = new ExpenseEntry (this.expenseForm.value.expenseValue, this.expenseForm.value.expenseFrequency,this.expenseForm.value.expenseDescription) ;
      if(this.editMode){
        this.budgetDataService.onUpdateExpenseEntry(this.paramId, newEntry)    
      }
      else{
        this.budgetDataService.onAddExpenseEntry (newEntry);
      }
      
      this.router.navigateByUrl ("");
      }
  }
  

