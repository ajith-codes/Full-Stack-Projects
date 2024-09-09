// src/types/EmployeeData.ts
export interface EmployeeData {
  Employee_Name: string;
  Employee_EmailID: string;
  Secret_Child_Name?: string; // Make these optional if not always present
  Secret_Child_EmailID?: string;
}
