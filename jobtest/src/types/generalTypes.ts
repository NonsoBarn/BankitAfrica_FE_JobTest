export interface FormErrors {
  email?: string;
  password?: string;
}

export interface ButtonProps {
  text: string;
  onClick: (e: React.FormEvent) => void;
  type: "button" | "submit";
  disabled?: boolean;
}

export interface InputComponentProps {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: "Debit" | "Credit";
  account: string;
  status: "Completed" | "Pending";
  category: string;
  method: string;
}
