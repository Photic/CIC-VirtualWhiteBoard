# WhiteboardApp

The plan was to have movable boxes on a grid like system, I guess that is kinda archived.

- [WhiteboardApp](#whiteboardapp)
  - [Completed Backend](#completed-backend)
  - [Completed Frontend](#completed-frontend)
- [Technologies Used](#technologies-used)
  - [Server](#server)
  - [Client](#client)
- [Init node_modules](#init-node_modules)
- [Running](#running)
- [Building to Docker](#building-to-docker)
- [Using the app](#using-the-app)
- [CIC-IBM Description of the Virtual white board](#cic-ibm-description-of-the-virtual-white-board)
  - [Roles](#roles)
  - [Description](#description)
  - [Tasks](#tasks)
    - [Login](#login)
    - [Virtual board](#virtual-board)
    - [Role management](#role-management)
    - [Account management](#account-management)
    - [Note on roles](#note-on-roles)

## Completed Backend
  - Sam and Bertha wants to use the virtual whiteboard, to do this they must first login with the team given login
  - Sam wants to create a new piece of text to put onto the virtual board so that he can write a motivational text, he wants it to be as long as a tweet 
  - Sam wants to delete a post he's created, the youtube video was not as fun as he remembered it
  - Bertha's lunch has been stolen from the fridge and would like to put an anonymous post up that tells the thief off
  - Sam would like to become a moderator for the virtual board to make sure that bad stuff is not posted, when he is a moderator he can delete all posts
  - Sam would like to add Jennifer as a new user of the whiteboard and give her a login
  - Bertha would love if she could post a youtube video that she saw last week
  - Sam would like to be able to change his password, Bertha keeps logging in and posting for him 

## Completed Frontend
  - Sam and Bertha wants to use the virtual whiteboard, to do this they must first login with the team given login
  - Sam and Bertha are sick and tired of random people deleting their posts, they want their own logins and to only be able to delete their own posts
  - Sam wants to create a new piece of text to put onto the virtual board so that he can write a motivational text, he wants it to be as long as a tweet

# Technologies Used

I chose Angular because it is a framework I am familiar with, more so then React, though I do regret not going with Flutter since it is the one I know best of the 3. Thought I was afraid that since it only JUST became web stable, that there would still be some issues.

I chose nodejs/express because I think it is an easy to use backend service, and I just love how JavaScript just doesn't give a F*** about syntax. That being said, I would have liked to create the server using Typescript instead, just took the easy way out. 

## Server
Used:
  - "bcrypt": "^5.0.1", used to encrypt user password before it is stored in the database. Also used to validate said password when logging in again. 
  - "dotenv": "^8.2.0", easy way to have instant specific variables. This would normally not be populated on git. 
  - "express": "^4.17.1", easy server.
  - "jsonwebtoken": "^8.5.1", To validate previous logins, and validate all endpoints after login / user creation.
  - "log4js": "^6.3.0", Simple logging tool, have the defaults info, error, debug. Nice to have.
  - "sqlite": "^4.0.19", sqlite3.Database wrapper.
  - "sqlite3": "^5.0.2" Simple local database, was an attempt to not complicated things, not sure I succeeded.

Also Installed:
  - "archiver": "^5.0.0", The plan was to save images locally if people wanted to upload them instead of just using an image url, mg would have been required as well.
  - "moment": "^2.27.0", Moment was just meant for easy time keeping / conversion.
  - "moment-timezone": "^0.5.31",
  - "socket.io": "^2.3.0", socket.io was meant to be used as a live update, login would init the frontend with all posts from the database with a normal http.get, and all following interaction would come from a socket. 
  - "socketio-jwt": "^4.6.2",
  - "multer": "^1.4.2", Again file handling.

## Client
Dep Used:
  - "@angular/animations": "~11.2.4",
  - "@angular/cdk": "^11.2.3",
  - "@angular/common": "~11.2.4",
  - "@angular/compiler": "~11.2.4",
  - "@angular/core": "~11.2.4",
  - "@angular/forms": "~11.2.4",
  - "@angular/material": "^11.2.3",
  - "@angular/platform-browser": "~11.2.4",
  - "@angular/platform-browser-dynamic": "~11.2.4",
  - "@angular/router": "~11.2.4",
  - "@auth0/angular-jwt": "^5.0.2",
  - "angular-gridster2": "^11.1.3", Allows me to create the card grid
  - "rxjs": "~6.6.0",
  - "tslib": "^2.0.0",
  - "zone.js": "~0.11.3"

Dep also installed:
  - "moment": "^2.29.1",

Dev Used:
  - "@angular-devkit/build-angular": "~0.1102.3",
  - "@angular/cli": "~11.2.3",
  - "@angular/compiler-cli": "~11.2.4",
  - "@types/jasmine": "~3.6.0",
  - "@types/node": "^12.11.1",
  - "codelyzer": "^6.0.0",
  - "jasmine-core": "~3.6.0",
  - "jasmine-spec-reporter": "~5.0.0",
  - "karma": "~6.1.0",
  - "karma-chrome-launcher": "~3.1.0",
  - "karma-coverage": "~2.0.3",
  - "karma-jasmine": "~4.0.0",
  - "karma-jasmine-html-reporter": "^1.5.0",
  - "protractor": "~7.0.0",
  - "ts-node": "~8.3.0",
  - "tslint": "~6.1.0",
  - "typescript": "~4.1.5"

# Init node_modules
This is a project created with Angular / Angular Materials, nodejs / Express. So the project requires the latest version of nodejs install on the local machine or docker. 

If only using Docker, skip to [Building to Docker](#building-to-docker).

To initiate the project, run following:
```
npm run init
``` 

In the default directory "./" where Angular´s package.json resides.

# Running
Skip if not running nodejs.

Opening 2 terminal, and typing in:
```
npm run dev
```
In:
```
./
and
./server
```

Will run the "ng-serve" with an attached proxy connection and "nodemon ." which restarts the server with every code change made.

# Building to Docker
In the default directory, run:

```
npm run build
```

This will not only build the angular project, but it will also begin the build process of the Dockerfile within the ./server folder. It goes without saying that this step required Docker to be installed on the local machine. 

After the script has run, you should be able to see the docker image with:
```
docker images
```

To run the image enter:
```
docker run --restart=always --hostname whiteboard-app --name=whiteboard-app --publish=:8080:8080 --detach nullergrisen/whiteboard-app
```

The server will be running at http://0.0.0.0:8080

# Using the app

There are tow default users in the app:
  - user : Bertha@this.whiteboard.com
  - password : 1234

  - user : Sam@this.whiteboard.com
  - password : 1234

Brilliant passwords, I know.

For features only working for the backend, I have included a file called "whiteboard.postman_collection.json" This, as it says, is a postman collection of the endpoints you can use after login. Just remember to use the correct JWT. When you login the inspector console in your browser will show you the token to be copy pasted into postman if the default one doesn't work.

# CIC-IBM Description of the Virtual white board

## Roles
* Frontend
* Backend
* Fullstack

## Description
You are making a virtual white board for your team to hang up interesting tid bits and motivational things. The whiteboard can be used for serious things but you know your team and it's more than likely going to be the funniest youtube videos of the week. 

The virtual white board should be accesisble to everyone on the team through a webpage and will in the future we shown on a big screen for all to enjoy. You decide what this board could be used for, is it just for fun motivational things such as videos and images or is it for current task or deadlines that needs attention? That is up to you. 

Good luck future CIC dev!

## Tasks
all tasks are described as "user stories" - simply put a user wants to be able to do this, you come up with how they are going to do it. **You're not meant to do all stories but as many as you can and in no particular order.**
### Login

* Sam and Bertha wants to use the virtual whiteboard, to do this they must first login with the team given login !
* Sam and Bertha are sick and tired of random people deleting their posts, they want their own logins and to only be able to delete their own posts !
* Sam has forgotten his password and would like to reset it 

### Virtual board

*  Sam wants to create a new piece of text to put onto the virtual board so that he can write a motivational text, he wants it to be as long as a tweet !
* Bertha would like to be able to put links to images onto the board !
* Bertha would love if she could post a youtube video that she saw last week !
* Bertha would like to see media be rendered on the board 
* Sam wants to delete a post he's created, the youtube video was not as fun as he remembered it !
* Bertha would like to be able to put a comment on posts so that Sam can see that she's seen the post
* Bertha would like to be able to "like" a post
* Bertha's lunch has been stolen from the fridge and would like to put an anonymous post up that tells the thief off !

### Role management

* Sam would like to become a moderator for the virtual board to make sure that bad stuff is not posted, when he is a moderator he can delete all posts !
* Sam would like to add Jennifer as a new user of the whiteboard and give her a login !

### Account management
* Sam does not like his name on the whiteboard and would like to change it to "Sam Wise" 
* Sam would like to be able to change his password, Bertha keeps logging in and posting for him !


### Note on roles
You do not need a graphical interface if you are a backender, as you do not need a backend if you are a frontender! Mock what you can or skip tasks that does not make sense if that is not what you are applying for. 

