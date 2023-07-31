// Importing required modules and components
import { Component, OnInit } from '@angular/core';
import { ExpenseEntry } from '../shared/budget-entry.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BudgetDataService } from '../shared/budget-data.component';
import { ActivatedRoute, Router } from '@angular/router';

// Defining the component metadata
@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.css']
})
export class ExpenseFormComponent implements OnInit {

  // FormGroup to handle the expense form and its fields
  expenseForm: FormGroup;

  // A boolean variable to track whether the form is in edit mode or not
  editMode = false;

  // An instance of ExpenseEntry to store the expense data if the form is in edit mode
  expenseEntry: ExpenseEntry;

  // A variable to store the expense entry ID from the route parameter
  paramId: number;

  // An array of frequency options for the expense entry
  frequencyOptions: string[] = ["Weekly", "Fortnightly", "Four-weekly", "Monthly", "Yearly"];

  // Constructor to inject services (BudgetDataService, Router, ActivatedRoute)
  constructor(private budgetDataService: BudgetDataService, private router: Router, private activatedRoute: ActivatedRoute) { }

  // Lifecycle hook: Runs when the component is initialized
  ngOnInit(): void {
    // Subscribing to the paramMap to get the expense entry ID from the route parameter
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')) {
        this.editMode = true;
        this.paramId = +paramMap.get('id')!; // Converting the ID from string to a number using the + operator
        this.expenseEntry = this.budgetDataService.getExpenseEntry(this.paramId);
      } else {
        this.editMode = false;
      }
    });

    // Creating the expenseForm FormGroup with its respective FormControls
    this.expenseForm = new FormGroup({
      "expenseDescription": new FormControl(this.editMode ? this.expenseEntry.expenseDescription : null, [Validators.required]),
      "expenseValue": new FormControl(this.editMode ? this.expenseEntry.expenseValue : null, [Validators.required]),
      "expenseFrequency": new FormControl(this.editMode ? this.expenseEntry.expenseFrequency : null)
    });
  }

  // Method called when the form is submitted
  onSubmit() {
    // Declaring new property to hold yearly expense value
    let expenseYearlyVar: number = 0;

    // if statement to determine what the frequency selected by the user is and calculating the yearly equivalent of the income
    if (this.expenseForm.value.expenseFrequency === "Weekly") {
      expenseYearlyVar = (this.expenseForm.value.expenseValue)*52;
      console.log("Weekly income");
    } else if (this.expenseForm.value.expenseFrequency === "Fortnightly") {
      expenseYearlyVar = (this.expenseForm.value.expenseValue)*26;
      console.log("Fortnightly income");
    } else if (this.expenseForm.value.expenseFrequency === "Four-weekly") {
      expenseYearlyVar = (this.expenseForm.value.expenseValue)*13;
      console.log("Four-weekly income");
    } else if (this.expenseForm.value.expenseFrequency === "Monthly") {
      expenseYearlyVar = (this.expenseForm.value.expenseValue)*12;
      console.log("Monthly income");
    } else if (this.expenseForm.value.expenseFrequency === "Yearly") {
      expenseYearlyVar = (this.expenseForm.value.expenseValue)*1;
      console.log("Yearly income");
    };
    // Creating a new ExpenseEntry object with the form values
    const newEntry = new ExpenseEntry(
      1,
      this.expenseForm.value.expenseValue,
      this.expenseForm.value.expenseFrequency,
      this.expenseForm.value.expenseDescription,
      expenseYearlyVar
    );

    // Checking if the form is in edit mode
    if (this.editMode) {
      // If in edit mode, update the existing expense entry using onUpdateExpenseEntry method in BudgetDataService
      newEntry.id = +this.paramId;
      this.budgetDataService.onUpdateExpenseEntry(this.paramId, newEntry);
    } else {
      // If not in edit mode, add a new expense entry using onAddExpenseEntry method in BudgetDataService
      this.budgetDataService.onAddExpenseEntry(newEntry);
    }

    // After submission, navigate back to the root page (assuming the root page displays the budget)
    this.router.navigateByUrl("");
  }
}
