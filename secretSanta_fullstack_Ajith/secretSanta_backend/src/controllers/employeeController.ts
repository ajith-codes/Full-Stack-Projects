import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import { assignSecretSanta } from '../utils/secretSantaAlgorithm';
import { AppDataSource } from '../database/data-source';
import { Employee } from '../entity/Employee';

interface EmployeeData {
  Employee_Name: string;
  Employee_EmailID: string;
}

export const handleFileUpload = async (req: Request, res: Response) => {
  console.log('File uploaded:', req.file);

  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded.');
    }

    // Read and parse the CSV file
    const workbook = XLSX.readFile(file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data: EmployeeData[] = XLSX.utils.sheet_to_json(sheet);

    // Extract employees
    const employees = data.map(row => ({
      name: row.Employee_Name,
      email: row.Employee_EmailID
    }));

    // Check if employees array is empty
    if (employees.length === 0) {
      return res.status(400).send('No employee data found in the file.');
    }

    // Assign Secret Santa
    const assignments = assignSecretSanta(employees);

    // Save assignments to the database
    for (const assignment of assignments) {
      await AppDataSource.getRepository(Employee).save({
        name: assignment.Employee_Name,
        email: assignment.Employee_EmailID,
        secretChildName: assignment.Secret_Child_Name,
        secretChildEmail: assignment.Secret_Child_EmailID
      });
    }

    // Create XLSX output
    const outputWorkbook = XLSX.utils.book_new();
    const outputSheet = XLSX.utils.json_to_sheet(assignments);
    XLSX.utils.book_append_sheet(outputWorkbook, outputSheet, 'Assignments');
    
    const buffer = XLSX.write(outputWorkbook, { bookType: 'xlsx', type: 'buffer' });

    res.setHeader('Content-Disposition', 'attachment; filename=secret_santa_assignments.xlsx');
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(buffer);

  } catch (error) {
    if (error instanceof Error) {
      console.error('Error processing file:', error.message);
    } else {
      console.error('Unknown error occurred:', error);
    }
    res.status(500).send('Internal Server Error');
  }
};
