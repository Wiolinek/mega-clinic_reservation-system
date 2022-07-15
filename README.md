# MegaClinic.

> MegaClinic is a website providing variety of medical services. It is home page of medical clinic with reservation system. UPacient can choose a specialist and send reservation. Doctor can login to personal account and check all the bookings made by pacients.

Project was created to learn all technologies used here, and practice.



TO LOGIN TO DOCTOR ACCOUNT USE:
LOGIN NAME.SURNAME: (eg. karolina.smith)
PASSOWRD: surname123 (eg. smith123)

also:
I'm adding temporarly env file content to connect database:

DATABASE_URL = mongodb+srv://Wiola:mojabaza!23@cluster0.sbg2x.mongodb.net/doctorsDatabase?retryWrites=true&w=majority
PORT=3030
SECRET_CODE=njsnjsklnjkgnjkamkldfbnklNJKBHnknkNJKNklnKL


## I'm also adding life version but it is after midnight(01:10am) so you can skip it ;)
https://megaclinic.ultra-violet.codes/ - BUT - on localhost page works fine - on PROD login page throw an error after putting credentials, after refreshing the page and changing url to home page it works, user is logged in.. trying to figure out what is going on...


## Table of Contents

- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [License](#license)
- [Contact](#contact)

## Technologies Used

- React
- React Router
- Express.js
- MySQL
- React Calendar
- Typescript

## Screenshots

![]()
![]()

## Setup

### Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Project Status

Project is: _complete_

## Room for Improvement

- implement CSS pre-processor
- implement Formik for handling reservtion form
- fix filtering timeschedule for each doctor - now it does not count the date when filter booked visits so if there is a visit booked for 9:00 for specific doctor, it will be removed from his schedule for each day.

## License

This website was built by Wiola Polok www.u-v.codes.
Copyright @ 2022 Wiola Polok www.u-v.codes. All Rights Reserved.
You are allowed to use it for both personal and commercial use, but not to claim it as your own design.

## Contact

Created by [@Wiolinek](https://github.com/Wiolinek) - feel free to contact me!
