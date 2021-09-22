# University REST 
## Setup db with test data 
Config: `connector/src/utilites/config.js`  
Running: `cd connector && npm run prepare` or `cd connector && node src/utilites/fillDb.js`.  
It will clear `university-rest-db` collection (default, can be changed in config) and add 4 lectors in 2 departments with different salaries and degrees.
## Connector 
Config: `connector/src/utilites/config.js`  
Dependencies: `cd connector && npm install`  
Running: `cd connector && npm start` or `cd connector && node src/app.js`. By default running port is 3000 (can be changed in config).  
Endpoints:
 - `/getHeadOfDepartment?name={department_name}` - get head of the department
 - `/getDepartmentStatistic?name={department_name}` - get department statistic
 - `/getAverageSalaryOfDepartment?name={department_name}` - get average salary of lectors of the department
 - `/getCountOfEmployeeForDepartment?name={department_name}` - get count of employee of the department
 - `/globalSearch?query={query_to_search}` - global lectors names search
## Client 
Config: `clinet/src/utilites/config.js`  
Dependencies: `cd clinet && npm install`  
Running: `cd clinet && npm start` or `cd clinet && node src/app.js`. By default running port is 8080 and using connector on 3000 (can be changed in config).  
Endpoints:
 - `/search?query={search_query}` - get data using commands:  
   - Who is head of department {department_name}
   - Show {department_name} statistic
   - Show the average salary for department {department_name}
   - Show count of employee for {department_name}
   - Global search by {template}
