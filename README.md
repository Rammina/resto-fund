# RestoFund

## Table of Contents

- [Overview](https://github.com/Rammina/resto-fund#overview)
- [Features](https://github.com/Rammina/resto-fund#features)
- [Technologies Used](https://github.com/Rammina/resto-fund#technologies-used)
- [Installation](https://github.com/Rammina/resto-fund#installation)
  - [Back-end](https://github.com/Rammina/resto-fund#backend)
    - [MongoDB Atlas Setup](https://github.com/Rammina/resto-fund#mongodb-atlas-setup)
    - [Cloudinary Setup](https://github.com/Rammina/resto-fund#cloudinary-setup)
    - [Stripe Webhook Development Setup](https://github.com/Rammina/resto-fund#stripe-webhook-development-setup)
  - [Front-end](https://github.com/Rammina/resto-fund#frontend)
- [Dependencies](https://github.com/Rammina/resto-fund#dependencies)
- [License](https://github.com/Rammina/resto-fund#license)

## Overview

RestoFund is a crowd-funding web application, specialized for helping restaurants collect donations to
help deal with disasters. It was initially a [team project for Chingu Voyage 30](https://chingu.io/), but forked and updated as a solo project. Technologies used are React.js, Node.js, Express, MongoDB, Sass, Google OAuth, Stripe API.

<b>LIVE LINK:</b> https://resto-fund.vercel.app/

### Features

<br/>
User Authentication
<ul>
    <li>User registration</li>
    <li>Login</li>
    <li>Login via Google</li>
</ul>
Main Features
<ul>
    <li>Create a fundraising project</li>
    <li>View list of all fundraising projects</li>
    <li>View fundraising project page</li>
    <li>Edit fundraising project</li>
    <li>Delete fundraising project</li>
    <li>Donate to a fundraising project</li>
</ul>
User Dashboard
<ul>
    <li>View owned fundraising projects</li>
    <li>View supported fundraising projects</li>
    <li>Payout info</li>
</ul>

### Technologies Used

<br>

<img alt="JavaScript" src="https://img.shields.io/badge/javascript-%23323330.svg?&style=for-the-badge&logo=javascript&logoColor=%23F7DF1E"/> <img alt="React" src="https://img.shields.io/badge/react-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/> <img alt="Redux" src="https://img.shields.io/badge/redux-%23593d88.svg?&style=for-the-badge&logo=redux&logoColor=white"/> <img alt="NodeJS" src="https://img.shields.io/badge/node.js-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img alt="Express.js" src="https://img.shields.io/badge/express.js-%23404d59.svg?&style=for-the-badge"/> <img alt="MongoDB" src ="https://img.shields.io/badge/MongoDB-%234ea94b.svg?&style=for-the-badge&logo=mongodb&logoColor=white"/> <img alt="SASS" src="https://img.shields.io/badge/SASS-hotpink.svg?&style=for-the-badge&logo=SASS&logoColor=white"/> <img alt="CSS3" src="https://img.shields.io/badge/css3-%231572B6.svg?&style=for-the-badge&logo=css3&logoColor=white"/> 

<ul>
    <li>Stripe</li>
    <li>Cloudinary</li>
</ul>

## Installation

Clone this project locally and then follow the instructions below:

### Backend

To start the backend server, go to the root folder.

Install dependencies by running:

```bash
npm install
```

Then, start the project's server in development mode on port 5000 by running:

```bash
npm run server
```

The backend application requires an .env file which contains the following keys:

- MONGO_URL
- JWT_SECRETKEY
- STRIPE_SECRETKEY
- STRIPE_ENDPOINT_SECRET
- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- CLOUDINARY_NAME

The JWT_SECRETKEY is used for JWT auth tokens.

To run the server, one must make an account for both MongoDB Atlas and Cloudinary.

Registration instructions for both sites can be found in:

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)
- [Cloudinary](https://cloudinary.com/users/register/free)

<hr>

#### MongoDB Atlas Setup

Instructions for [MongoDB Atlas installation can be found here.](https://github.com/Rammina/chingu-team-stuff/blob/main/mongodb_dev_installation.md)

#### Cloudinary Setup

To setup Cloudinary, one must first create an account. After registration, check the dashboard for the following information and put them on the .env file:

- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- CLOUDINARY_NAME

<img src="https://res.cloudinary.com/rammina/image/upload/v1619599174/cloudinary-api_hy3jku.png" alt="Cloudinary Dashboard"/>

<hr>

#### Stripe Webhook Development Setup

Instructions for [Stripe Webhook installation for development environment can be found here.](https://github.com/Rammina/chingu-team-stuff/blob/main/stripe_dev_installation.md)

### Frontend

To start the client-side application, go to the client folder:

```bash
cd client
```

Install dependencies by running:

```bash
npm install
```

Go back to the root folder:

```bash
cd ..
```

Start the client application in development mode on port 3000 by running:

```bash
npm run client
```

The frontend application requires an .env file which contains the following key:

- REACT_APP_GOOGLE_AUTH_CLIENT_ID

To run the build process:

```bash
npm run build
```

<hr>

## Dependencies

Server

<ul>
    <li>@stripe/stripe-js: ^1.15.0</li>
    <li>async: ^3.2.0</li>
    <li>axios: ^0.21.1</li>
    <li>bcryptjs: ^2.4.3</li>
    <li>body-parser: ^1.19.0</li>
    <li>cloudinary: ^1.22.0</li>
    <li>concurrently: ^6.1.0</li>
    <li>cors: ^2.8.5</li>
    <li>date-fns: ^2.21.3</li>
    <li>dotenv: ^9.0.1</li>
    <li>express: ^4.17.1</li>
    <li>helmet: ^3.15.1</li>
    <li>http-errors: ~1.6.2</li>
    <li>jsonwebtoken: ^8.5.1</li>
    <li>mongodb: ^3.6.6</li>
    <li>mongoose: ^5.12.7</li>    
    <li>morgan: ^1.10.0</li>
    <li>nocache: ^2.1.0</li>
    <li>stripe": ^8.150.0</li>

</ul>
Server Dev Dependencies:
<ul>
    <li>nodemon: ^2.0.7</li>
    <li>prettier: 2.3.0</li>
</ul>

Client:

<ul>
    <li>@stripe/stripe-js: ^1.15.0</li>
    <li>@testing-library/jest-dom: ^5.11.4</li>
    <li>@testing-library/react: ^11.1.0</li>
    <li>@testing-library/user-event: ^12.1.10</li>
    <li>axios: ^0.21.1</li>
    <li>date-fns: ^2.22.1</li>
    <li>node-sass: ^4.14.1</li>
    <li>react: ^17.0.2</li>
    <li>react-dom: ^17.0.2</li>
    <li>react-redux: ^7.2.4</li>
    <li>react-router-dom: ^5.2.0</li>
    <li>react-scripts: ^4.0.3</li>
    <li>react-toastify: ^7.0.4</li>
    <li>redux-form: ^8.3.7</li>
    <li>redux-thunk: ^2.3.0</li>
    <li>stripe: ^8.150.0</li>
    <li>web-vitals: ^1.0.1</li>
</ul>
<br>

<hr>

## License

This project is licensed under the [MIT License](https://choosealicense.com/licenses/mit/).

