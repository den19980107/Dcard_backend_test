import config from '../config/default'
const FACEBOOK = {
  clientID: "[your id]",
  clientSecret: "[your secret]"
}

const GOOGLE = {
  clientID: "[your id]",
  clientSecret: "[your secret]"
}

const SESSION = {
  COOKIE_KEY: "user"
};

const localDB = 'mongodb://localhost:27017/dcard-test';
const productionDB = 'mongodb://localhost:27017/dcard-test'
const DBUrl = config.mode == "production" ? productionDB : localDB
const MONGODB = {
  MONGODB_URI: DBUrl
};

export = {
  FACEBOOK,
  GOOGLE,
  SESSION,
  MONGODB
}