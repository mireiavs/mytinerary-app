# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12

# Set the working directory to /app
WORKDIR /app

# copy package.json into the container at /app
COPY package*.json /app/

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /app
COPY . /app/

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Run the app when the container launches
CMD ["npm", "start"]