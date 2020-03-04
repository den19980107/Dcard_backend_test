# Dcard Backend Intern Work Shop
###### tags: `Dcard 後端實習`

## Live Demo

### Check the website I build: http://dcard-test.appspot.com/drawCard
![](https://i.imgur.com/NARY99v.gif)

### Test the api can run this
``` cmd
curl -I http://dcard-test.appspot.com/api/drawCard
```
![](https://i.imgur.com/O86hurU.png)

## Back End 
* node.js
* typescript
* mongodb

## Front End
* react.js
* ant design

## Middleware
the middleware is in **/src/routes/draw-card.ts** and see this method **connectionLimitMiddleware**


## Quick Start

### Dev Mode
if you want to run at development mode, clone the repositorie and run

```
npm install
npm run dev
```

it will start the server and client concurrently
and check **http://localhost:3000**


### Production Mode
if you want to run at production mode, clone the repositorie and run 

```
npm install
npm run production
```
and check **http://localhost:5000**



## notice
If you want you enable the third party authentication feature, please fill up the config file (in /src/config/keys.ts), you will see somthing like this
``` javascript
import config from '../config/default'
const FACEBOOK = {
  clientID: "[your id]",
  clientSecret: "[your secret]"
}

const GOOGLE = {
  clientID: "[your id]",
  clientSecret: "[your secret]"
}

```
fill up the **clientId** and **clientSecret** and you are good to go