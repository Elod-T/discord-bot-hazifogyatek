## build runner
FROM node:lts-alpine AS build-runner

RUN apk add g++ make python3

# Set temp directory
WORKDIR /tmp/app

# Move package.json
COPY package.json .

# Install dependencies
RUN npm install

# Move source files
COPY src ./src
COPY tsconfig.json   .

# Build project
RUN npm run build

## production runner
FROM node:lts-alpine AS prod-runner

RUN apk add g++ make python3

# Set work directory
WORKDIR /app

# Copy package.json from build-runner
COPY --from=build-runner /tmp/app/package.json /app/package.json

# Install dependencies
RUN npm install --omit=dev

# Move build files
COPY --from=build-runner /tmp/app/build /app/build

# Start bot
CMD [ "npm", "run", "start" ]
