## SWE30003 - Database

Our application is deployed at https://relaxingkoala.vercel.app/

Our API & Database is also deployed on Vercel.

Setting up our Backend (API/DB) locally is not recommended as our application is hardcoded to read from our API/Database hosted on Vercel.

The following notes are for developer reference only.

If you would like to host the DB locally please do the following:

Locally host the DB on your machine on port 3306.

    Install XAMPP, MySQL or MySQL Workbench (GUI)
    Execute "database-create.sql" & "database-initialize" queries in MySQL command line or Workbench GUI
    Right now, the database credentials are hard coded in our project check that they match the following:
        User: root
        Password: N/A
        Database Name: swe30003_assignment3

Potentially will also need to install required libraries using "npm install package.json"

If using XAMPP password will be blank by default, so no config required.

If there is a password you must remove it by logging in as root using "mysql -u root -p" and clearing the password using "ALTER USER 'root'@'localhost' IDENTIFIED BY '';"

You will also need to run the Express API file located in /backend/api/index.ts
