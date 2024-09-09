Secret Santa Application
Overview
This project is a Secret Santa application that allows users to upload a list of employees, generate Secret Santa assignments, and download the results in an Excel file. It consists of a frontend built with React and a backend built with Node.js and TypeScript, using MySQL as the database.

Table of Contents
Frontend
Installation
Running the Application
Backend
Installation
Running the Application
API Endpoints
Additional Information
Contributing
License
Frontend
Overview
The frontend is a React application that allows users to upload an Excel file and download the Secret Santa assignments.

Frontend Installation
Clone the repository:

git clone https://github.com/ajith-codes/Full-Stack-Projects.git
cd secret-santa-frontend
Install dependencies:

npm install
Frontend Running the Application
Start the development server:

npm start
Open your browser and navigate to:

arduino
http://localhost:3000
Upload an Excel file and download the generated assignments.

Backend
Overview
The backend is a Node.js application with TypeScript that handles file uploads, processes the data, and interacts with the MySQL database.

Backend Installation
Clone the repository:

git clone https://github.com/ajith-codes/Full-Stack-Projects.git
cd secret-santa-backend
Install dependencies:


npm install
Create a .env file in the root directory with the following content:

env
Copy code
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=secret_santa
Run database migrations (if applicable):

npm run typeorm migration:run
Backend Running the Application
Start the server:

npm start
The server will be running on:

arduino
Copy code
http://localhost:5000
API Endpoints
POST /upload
Description: Upload an Excel file containing employee data. Generates Secret Santa assignments and returns the results in an Excel file.
Request:
Form-data: file (Excel file)
Response:
200 OK with an Excel file attachment if successful.
400 Bad Request if no file is uploaded or if the file is invalid.
500 Internal Server Error if there is an issue processing the file.
Additional Information
Dependencies:

Frontend: React, Axios
Backend: Express, Multer, XLSX, TypeORM, MySQL
Database Setup:

Make sure MySQL is installed and running.
Create a database named secret_santa and configure the connection details in the .env file.
Contributing
Fork the repository on GitHub.
Clone your forked repository:

git clone https://github.com/yourusername/secret-santa-backend.git
Create a new branch:
git checkout -b feature/your-feature
Make your changes and commit:
git add .
git commit -m "Add your message here"
Push to your forked repository:
git push origin feature/your-feature
Create a Pull Request on GitHub.
License
This project is licensed under the MIT License - see the LICENSE file for details.
