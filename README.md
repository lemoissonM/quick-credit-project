[![Build Status](https://travis-ci.org/lemoissonM/quick-credit-project.svg?branch=develop)](https://travis-ci.org/lemoissonM/quick-credit-project)
[![Coverage Status](https://coveralls.io/repos/github/lemoissonM/quick-credit-project/badge.svg?branch=develop)](https://coveralls.io/github/lemoissonM/quick-credit-project?branch=develop)

# quick-credit-project
Quick credit is an platform that allow you to manage a loan grant system. From this platform users can create and login to their accounts, request as well as manage their loan applications while admins can manage all type of loan transactions, from accepting or rejecting them, to posting repayment transactions for different loans and also manage all users in the system.

# The UI has a user and an admin part 

:exclamation: :exclamation: :exclamation: To access the admin dashboard from the login put admin@quickcredit.com as mail and "12345678" as password
:blush: :blush: :blush: :blush:

### You can user the gh-page link to access the UI
Gh pages link : https://lemoissonm.github.io/quick-credit-project/UI/
Gh pages admin dashboard link : https://lemoissonm.github.io/quick-credit-project/UI/dashboard_admin.html
Gh pages user dashboard link : https://lemoissonm.github.io/quick-credit-project/UI/dashboard.html

## If you want to use this application localy
* clone this repository 
run ` git clone https://github.com/lemoissonM/quick-credit-project/ `
* Run run `npm install` to install all dependencies 
* Then Run `npm start` 


## To perform any api call that do action granted to admins such as 
* View all loan application 
* Approve a loan application 
* Verify a user 
* Add loan repayment transaction 
* View all current loans
* View all repaid loans
* View all approved loans 

## You can also perform other APi calls sych as :
* Signup 
* Signin 
* Reset password 
* Request a new loan

### For more information about endpoints find the documentation at
https://fistlemoisson.docs.apiary.io/

### Please ensure you are identified as admin by following the following process 
* Log in as admin by calling : https://quic-credit-andela.herokuapp.com/api/v1/auth/signin 
  * Body : email = admin@quick-credit.com and password = 12345678
* Copy the token in the json response 
* Add an authorization header to all your next request with value *Bearer {token}*
### ex : *Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MCwiaWF0IjoxNTU3NDM3NzI5LCJleHAiOjE1NTc1MjQxMjl9.8d-KMN0dCpeMmZ9VokoxBZq1pwIAjGD3SUkS2WZy03g*

## For any other request please login or create account first 
* Create account documentation : https://fistlemoisson.docs.apiary.io/#/reference/0/create-an-account-signup
* Login into acount documenation : https://fistlemoisson.docs.apiary.io/#/reference/0/log-into-account

If you are using postman don't forget to configure the environnement variable to keep the authorization token when signing in or signing up 
## Please after adding an environnement variable called 'token' add the following codes to your postman request test
```javascript
var jsonData = JSON.parse(responseBody);
postman.setEnvironmentVariable('token', jsonData.data.token);
```
Then you should add the authorization header with the following value 
```javascript
Bearer {{token}}
```

# Author : Murhula Metre 
## Harvest Lemoisson
