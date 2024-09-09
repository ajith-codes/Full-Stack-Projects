import { Employee } from '../entity/Employee';
import { getRepository } from 'typeorm';

export const assignSecretSantas = async () => {
  const employeeRepo = getRepository(Employee);
  const employees = await employeeRepo.find();
  
  // Shuffle employees
  const shuffled = employees.slice().sort(() => Math.random() - 0.5);

  // Create assignments
  const assignments = employees.map((employee, index) => {
    const secretChild = shuffled[(index + 1) % shuffled.length];
    return {
      employee,
      secretChild
    };
  });

  return assignments;
};
