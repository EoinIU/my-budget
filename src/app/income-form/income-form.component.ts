import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetDataService } from '../shared/budget-data.component';
import { IncomeEntry } from '../shared/budget-entry.model';

@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit{
  incomeForm: FormGroup;
  editMode = false;
  incomeEntry: IncomeEntry;
  paramId: number;

  frequencyOptions: string[] = ["Weekly", "Fortnightly", "Four-weekly", "Monthly", "Yearly"];

  constructor (private budgetDataService: BudgetDataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit (): void {
    this.activatedRoute.paramMap. subscribe (paramMap =>{
      if (paramMap.has ('id')){
        this.editMode=true;
        this.paramId = +paramMap.get('id')!;
        this.incomeEntry = this.budgetDataService.getIncomeEntry(this.paramId);
      }
      else{
        this.editMode = false;
      }
    })

    console.log('Income Entry:', this.incomeEntry);
    this.incomeForm = new FormGroup({
      "incomeDescription": new FormControl (this.editMode ? this.incomeEntry.incomeDescription : null,[Validators.required]),
      "incomeValue": new FormControl (this.editMode ? this.incomeEntry.incomeValue : null, [Validators.required]),
      "incomeFrequency": new FormControl (this.editMode ? this.incomeEntry.incomeFrequency : null)
    });
  }
  

  onSubmit(){
    const newEntry = new IncomeEntry (this.incomeForm.value.incomeValue, this.incomeForm.value.incomeFrequency,this.incomeForm.value.incomeDescription) ;
    if(this.editMode){
      this.budgetDataService.onUpdateIncomeEntry(this.paramId, newEntry)    
    }
    else{
      this.budgetDataService.onAddIncomeEntry (newEntry);
    }
    
    this.router.navigateByUrl ("");
    }
}