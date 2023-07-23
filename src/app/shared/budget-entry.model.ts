

export class IncomeEntry {
  constructor(
    public incomeValue: string,
    public incomeFrequency: string,
    public incomeDescription: string
  ) {}
}
export class ExpenseEntry {
  constructor(
    public expenseValue: string,
    public expenseFrequency: string,
    public expenseDescription: string
  ) {}
}