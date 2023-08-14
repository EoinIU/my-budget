// Constructer for the "IncomeEntry" class
export class IncomeEntry {
  constructor(
    public id: string,                  // Property to store the ID of the income entry (e.g., 1)
    public incomeValue: number,         // Property to store the value of the income entry (e.g., "500")
    public incomeFrequency: string,    // Property to store the frequency of the income entry (e.g., "Weekly")
    public incomeDescription: string,   // Property to store the description of the income entry (e.g., "Wages")
    public incomeYearly: number         // Property to store the yearly equivalent of the income value (e.g., €52000 for a €1000 weekly income)
  ) {}
}

// Constructer for the "ExpenseEntry" class
export class ExpenseEntry {
  constructor(
    public id: string,                  // Property to store the ID of the expense entry (e.g., 1)
    public expenseValue: number,        // Property to store the value of the expense entry (e.g., "40")
    public expenseFrequency: string,   // Property to store the frequency of the expense entry (e.g., "Monthly")
    public expenseDescription: string,  // Property to store the description of the expense entry (e.g., "Phone bill")
    public expenseYearly: number        // Property to store the yearly equivalent of the expenses value (e.g., €5200 for a €100 weekly expense)
  ) {}
}
