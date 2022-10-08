export enum Env {
  Dev = "development",
  Test = "test",
  Prod = "production",
}

class Environment {
  env: Env;

  constructor() {
    this.env = process.env.NODE_ENV as Env;
  }

  isDev() {
    return this.env === Env.Dev;
  }

  isTest() {
    return this.env === Env.Test;
  }

  isProd() {
    return this.env === Env.Prod;
  }
}

export const environment = new Environment();
