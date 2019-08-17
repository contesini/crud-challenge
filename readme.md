# Project Dependencies
Just npm, docker and docker-compose but if you prefer run without docker you need [mongodb](https://www.mongodb.com/download-center), [angular-cli](https://cli.angular.io/) and [nodejs](https://nodejs.org/en/download/).

# Balanced Brackets
To run balanced brackets go to `./brackets` folder:
```bash
cd brackets && npm run test
```
You can check brackets code in [brackets/index.js](./brackets/index.js) file.

# Backend
To run backend go to `./backend` folder:
```bash
cd backend && npm run start:docker
```
You can check backend code in `./backend/src` folder.

To run backend test:
```bash
cd backend && npm run test
```
You can check backend tests in `./backend/tests` folder.

# FrontEnd
To run frontend go to `./frontend` folder:
```bash
cd frontend && npm run start:docker
```
You can check frontend code in `./frontend/src` folder.