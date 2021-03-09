# BUILD ME => "docker build -t nullergrisen/whiteboard-app ."
# RUN ME => "docker run --restart=always --hostname whiteboard-app --name=whiteboard-app --memory=64m --cpuset-cpus=3 --net photicnet --ip 10.0.0.5 --publish=:49161:8080 --detach nullergrisen/whiteboard-app"

# Specify node version.
FROM node:14.5.0-slim
# FROM node

# Auther / Maintainer.
LABEL Steen René Hansen

# Create app directory.
WORKDIR /usr/src/app

# Add packages to new directory.
COPY package*.json ./

# Install packages.
RUN npm install

# Bundle app source,.
COPY . .

# Expose port matching app port
EXPOSE 8080

# Start app.
CMD [ "node", "app.js" ]
