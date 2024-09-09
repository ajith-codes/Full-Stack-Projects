interface Employee {
  name: string;
  email: string;
}

interface Assignment {
  Employee_Name: string;
  Employee_EmailID: string;
  Secret_Child_Name: string;
  Secret_Child_EmailID: string;
}

export const assignSecretSanta = (employees: Employee[]): Assignment[] => {
  // Implement your Secret Santa assignment logic here
  // This should return an array of objects with all 4 properties filled

  const assignments: Assignment[] = [];

  // Example logic for Secret Santa assignment
  const shuffled = [...employees].sort(() => Math.random() - 0.5);
  for (let i = 0; i < employees.length; i++) {
    const giver = employees[i];
    const receiver = shuffled[(i + 1) % employees.length];

    assignments.push({
      Employee_Name: giver.name,
      Employee_EmailID: giver.email,
      Secret_Child_Name: receiver.name,
      Secret_Child_EmailID: receiver.email
    });
  }

  return assignments;
};
