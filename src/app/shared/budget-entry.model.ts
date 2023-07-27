// Annotation for the "IncomeEntry" class
export class IncomeEntry {
  constructor(
    public id: number,                  // Property to store the ID of the income entry (e.g., 1)
    public incomeValue: string,         // Property to store the value of the income entry (e.g., "500")
    public incomeFrequency: string,    // Property to store the frequency of the income entry (e.g., "Weekly")
    public incomeDescription: string   // Property to store the description of the income entry (e.g., "Wages")
  ) {}
}

// Annotation for the "ExpenseEntry" class
export class ExpenseEntry {
  constructor(
    public id: number,                  // Property to store the ID of the expense entry (e.g., 1)
    public expenseValue: string,        // Property to store the value of the expense entry (e.g., "40")
    public expenseFrequency: string,   // Property to store the frequency of the expense entry (e.g., "Monthly")
    public expenseDescription: string  // Property to store the description of the expense entry (e.g., "Phone bill")
  ) {}
}
