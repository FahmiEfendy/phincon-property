# Phincon Property - Streamlining Property Viewing Appointments

Phincon Property is a web platform designed exclusively for sellers to showcase their houses and for potential buyers to schedule property viewing appointments. Simplify the process of connecting sellers with interested buyers by providing a hassle-free appointment scheduling system. With Phincon Property, sellers can effortlessly input their house details, while customers can easily browse available houses and schedule appointments to view them.

Key Features:

- Effortless House Input: Sellers can efficiently input details about their properties.
- Appointment Scheduling: Customers can schedule appointments to view houses at their convenience.
- Seamless Communication: In-app messaging for easy and direct communication between sellers and potential buyers.

Enhance the house-selling experience with Phincon Property!

![App Screenshot](https://res.cloudinary.com/dgn6szubx/image/upload/v1709714200/ajvo2pe4k5nbvrmygto0.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/FahmiEfendy/phincon-property.git
```

### Back End

Go to the project directory

```bash
  cd phincon-property/server
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

Start the redis

```bash
  redis-server
```

Database migrations

```bash
  npx sequelize-cli db:migrate
```

### Front End

Go to the project directory

```bash
  cd phincon-property/client
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```

## Running Tests

Go to the project directory

```bash
  cd phincon-property/server
```

To run tests, run the following command

```bash
  npm run test
```

## Tech Stack

### Front End

- React.js - the core framework for website development

- Redux - a predictable state container for JavaScript apps. The Redux libraries in this webste are React Redux, Redux Persist and Redux Saga

- Material UI - high quality components to help this website development

- React Dropzone - a simple react hook to create drag-n-drop for files

### Back End

- Node.js - a JavaScript runtime

- Express - a Node.js framework that provide many feature for building this website

- Socket.IO - a library that enable low-latency, bidirectional and event-based communication between a client and a server. Socket.IO is used to implement message feature

- Cloudinary - a streamline media management platform to storing files

### Database

- MySQL - all data on this website is stored in MySQL

- Sequelize - an easier data handler, Sequelize making it simpler to create, retrieve, update, and delete in the database

### Data Cache

- Redis - a memory key-value database used for caching data
