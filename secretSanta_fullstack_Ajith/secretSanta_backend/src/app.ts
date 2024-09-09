import { Employee } from './entity/Employee';
import { EmployeeData } from './entity/EmployeeData';
import { AppDataSource } from "./database/data-source"; // Import the DataSource
import { assignSecretSanta } from './utils/secretSantaAlgorithm';
import express from 'express';
import cors from 'cors';
import multer from 'multer';
import fileUploadRoutes from './routes/employeeRoutes';

const app = express();
app.use(cors());


// Initialize database connection
AppDataSource.initialize()
  .then(() => console.log('Database connected'))
  .catch(error => console.error('Database connection error:', error));

  app.use('/api', fileUploadRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});