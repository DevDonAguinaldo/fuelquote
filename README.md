# cosc4353_project
Final project for software design class. Utilizes technologies such as HTML/CSS/JS, Node.js - Express, and MongoDB.

To start up project locally you need to run mongodb and have nodejs installed. Once MongoDB is installed locally,
you then start the mongo server with './mongod' in the command line in the directory it was installed. Then cd into
the project directory and run the command 'node <nameofindexfile>.js'. It will be listening on port 3030 on local server.

Our project is hosted on Heroku and can be accessed through the url: 'https://fuelquote-project.herokuapp.com'.

View source code via Github: 'https://github.com/DevDonAguinaldo/cosc4353_project'.

Project Details: 
{
  "name": "project",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/DevDonAguinaldo/cosc4353_project"
  },
  "author": "Don",
  "dependencies": {
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.4",
    "ejs": "^2.6.2",
    "express": "^4.17.1",
    "express-session": "^1.16.2",
    "mongoose": "^5.6.2",
    "nodemon": "^1.19.1",
    "passport": "^0.4.0",
    "passport-http": "*",
    "passport-local": "^1.0.0",
    "passport-local-mongoose": "^5.0.1",
    "semantic-modal": "^1.1.1",
    "semantic-ui-css": "^2.4.1",
    "semantic-ui-message": "^2.3.1"
  },
  "keywords": [
    "node",
    "heroku",
    "express"
  ],
  "license": "ISC"
}
