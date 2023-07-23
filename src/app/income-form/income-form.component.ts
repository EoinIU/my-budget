// Importing required modules and components
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BudgetDataService } from '../shared/budget-data.component';
import { IncomeEntry } from '../shared/budget-entry.model';

// Defining the component metadata
@Component({
  selector: 'app-income-form',
  templateUrl: './income-form.component.html',
  styleUrls: ['./income-form.component.css']
})
export class IncomeFormComponent implements OnInit {

  // FormGroup to handle the income form and its fields
  incomeForm: FormGroup;

  // A boolean variable to track whether the form is in edit mode or not
  editMode = false;

  // An instance of IncomeEntry to store the income data if the form is in edit mode
  incomeEntry: IncomeEntry;

  // A variable to store the income entry ID from the route parameter
  paramId: number;

  // An array of frequency options for the income entry
  frequencyOptions: string[] = ["Weekly", "Fortnightly", "Four-weekly", "Monthly", "Yearly"];

  // Constructor to inject services (BudgetDataService, Router, ActivatedRoute)
  constructor(private budgetDataService: BudgetDataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  // Lifecycle hook: Runs when the component is initialized
  ngOnInit(): void {
    // Subscribing to the paramMap to get the income entry ID from the route parameter
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.editMode = true;
        this.paramId = +paramMap.get('id')!; // Converting the ID from string to a number using the + operator
        this.incomeEntry = this.budgetDataService.getIncomeEntry(this.paramId);
      } else {
        this.editMode = false;
      }
    });

    // Creating the incomeForm FormGroup with its respective FormControls
    this.incomeForm = new FormGroup({
      "incomeDescription": new FormControl(this.editMode ? this.incomeEntry.incomeDescription : null, [Validators.required]),
      "incomeValue": new FormControl(this.editMode ? this.incomeEntry.incomeValue : null, [Validators.required]),
      "incomeFrequency": new FormControl(this.editMode ? this.incomeEntry.incomeFrequency : null)
    });
  }

  // Method called when the form is submitted
  onSubmit() {
    // Creating a new IncomeEntry object with the form values
    const newEntry = new IncomeEntry(
      this.incomeForm.value.incomeValue,
      this.incomeForm.value.incomeFrequency,
      this.incomeForm.value.incomeDescription
    );

    // Checking if the form is in edit mode
    if (this.editMode) {
      // If in edit mode, update the existing income entry using onUpdateIncomeEntry method in BudgetDataService
      this.budgetDataService.onUpdateIncomeEntry(this.paramId, newEntry);
    } else {
      // If not in edit mode, add a new income entry using onAddIncomeEntry method in BudgetDataService
      this.budgetDataService.onAddIncomeEntry(newEntry);
    }

    // After submission, navigate back to the root page (assuming the root page displays the budget)
    this.router.navigateByUrl("");
  }
}
