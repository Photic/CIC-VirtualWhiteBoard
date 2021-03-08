# BUILD ME => "docker build -t nullergrisen/livsteen_rest ."
# RUN ME => "docker run --restart=always --hostname livsteen_rest --name=livsteen_rest --memory=64m --cpuset-cpus=3 --net photicnet --ip 10.0.0.5 --publish=:49161:8080 --detach nullergrisen/livsteen_rest"

# Specify node version.
FROM node:14.5.0-slim
# FROM node

# Auther / Maintainer.
LABEL Steen René Hansen

# Create app directory.
WORKDIR /usr/src/app

# Add packages to new directory.
COPY package*.json ./

# Basic build tools
# RUN apt update && apt install -y graphicsmagick

# Install packages.
RUN npm install

# Bundle app source,.
COPY . .

# Expose port matching app port
EXPOSE 8080

# Start app.
CMD [ "node", "app.js" ]
