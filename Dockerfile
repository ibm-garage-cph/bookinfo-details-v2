# Source image - starting point
FROM node:12

# Sets the working directory for any RUN, CMD, ENTRYPOINT, COPY and ADD command
WORKDIR /app

# Copy files from dockerfile location disk to image
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src src
COPY test test

# Run scripts inside the image on build-time
RUN npm install

RUN ls -la

# Command executed on container run time
CMD npm start