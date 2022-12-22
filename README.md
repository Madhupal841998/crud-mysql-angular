# crud-mysql-angular
RUN XAMPP
CREATE DATABASE 'studentdb' IN http://localhost/phpmyadmin/ 
CREATE TABLE students(`id` int(10) NOT NULL AUTO_INCREMENT, `name` char(100) NOT NULL,`class` varchar(100) NOT NULL, PRIMARY KEY (`id`));
