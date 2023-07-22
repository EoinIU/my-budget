import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BudgetDataService } from '../shared/budget-data.component';
import { IncomeEntry } from '../shared/budget-entry.model';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit{
  incomeForm: FormGroup;

  constructor (private budgetDataService: BudgetDataService, private router: Router) { }

  ngOnInit (): void {
    this.incomeForm = new FormGroup({
      "incomeDescription": new FormControl (null,[Validators.required]),
      "incomeValue": new FormControl (null, [Validators.required]),
      "incomeFrequency": new FormControl (null, [Validators.required])
    })
  }

  onSubmit(){
    const newEntry = new IncomeEntry (this.incomeForm.value.incomeValue, this.incomeForm.value.incomeFrequency,this.incomeForm.value.incomeDescription) ;
    this.budgetDataService.onAddIncomeEntry (newEntry) ;
    this.router.navigateByUrl ("");
    }
}

