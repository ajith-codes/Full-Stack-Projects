import fs from 'fs';
import csv from 'csv-parser';
import { parse } from 'json2csv';

interface Employee {
  name: string;
  email: string;
}

interface SecretSantaAssignment {
  Employee_Name: string;
  Employee_EmailID: string;
  Secret_Child_Name: string;
  Secret_Child_EmailID: string;
}

export const processCSV = (filePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const employees: Employee[] = [];
    const previousAssignments: Map<string, string> = new Map();

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        employees.push({ name: row['Employee_Name'], email: row['Employee_EmailID'] });
        previousAssignments.set(row['Employee_EmailID'], row['Secret_Child_EmailID']);
      })
      .on('end', () => {
        const shuffledEmployees = shuffleArray(employees.slice());
        const assignments: SecretSantaAssignment[] = [];

        for (let i = 0; i < employees.length; i++) {
          const giver = employees[i];
          let receiverIndex = (i + 1) % employees.length;
          while (shuffledEmployees[receiverIndex].email === giver.email || previousAssignments.get(giver.email) === shuffledEmployees[receiverIndex].email) {
            receiverIndex = (receiverIndex + 1) % employees.length;
          }
          const receiver = shuffledEmployees[receiverIndex];
          assignments.push({
            Employee_Name: giver.name,
            Employee_EmailID: giver.email,
            Secret_Child_Name: receiver.name,
            Secret_Child_EmailID: receiver.email
          });
        }

        const csvData = parse(assignments);
        resolve(csvData);
      })
      .on('error', (error) => reject(error));
  });
};

const shuffleArray = <T>(array: T[]): T[] => {
  let currentIndex = array.length, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
};
