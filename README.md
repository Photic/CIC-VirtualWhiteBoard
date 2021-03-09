# WhiteboardApp

- [WhiteboardApp](#whiteboardapp)
  - [Completed Backend](#completed-backend)
  - [Completed Frontend](#completed-frontend)
- [Init node_modules](#init-node_modules)
- [Running](#running)
- [Building to Docker](#building-to-docker)
- [Using](#using)
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

## Completed Frontend
    - Sam and Bertha wants to use the virtual whiteboard, to do this they must first login with the team given login
    - Sam and Bertha are sick and tired of random people deleting their posts, they want their own logins and to only be able to delete their own posts
    - Sam wants to create a new piece of text to put onto the virtual board so that he can write a motivational text, he wants it to be as long as a tweet 

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

# Using

Bertha@this.whiteboard.com

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
* Bertha would love if she could post a youtube video that she saw last week 
* Bertha would like to see media be rendered on the board 
* Sam wants to delete a post he's created, the youtube video was not as fun as he remembered it !
* Bertha would like to be able to put a comment on posts so that Sam can see that she's seen the post
* Bertha would like to be able to "like" a post
* Bertha's lunch has been stolen from the fridge and would like to put an anonymous post up that tells the thief off !

### Role management

* Sam would like to become a moderator for the virtual board to make sure that bad stuff is not posted, when he is a moderator he can delete all posts !
* Sam would like to add Jennifer as a new user of the whiteboard and give her a login

### Account management
* Sam does not like his name on the whiteboard and would like to change it to "Sam Wise" 
* Sam would like to be able to change his password, Bertha keeps logging in and posting for him


### Note on roles
You do not need a graphical interface if you are a backender, as you do not need a backend if you are a frontender! Mock what you can or skip tasks that does not make sense if that is not what you are applying for. 

