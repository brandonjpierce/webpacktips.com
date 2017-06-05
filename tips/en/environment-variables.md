---
date: 04-02-2017
title: Adding Environment Variables
description: Soon™
author: Brandon Pierce
authorGithub: https://github.com/brandonjpierce
---

You should always at least have `NODE_ENV` added to your bundle so that frameworks such as React can appropriately build the correct version. Below are the three ways you can add environment variables to your webpack bundle via [`EnvironmentPlugin`](https://webpack.js.org/plugins/environment-plugin/).

Inject all environment variables:

```javascript
module.exports = {
  ...
  plugins: [
    new webpack.EnvironmentPlugin()
  ]
  ...
};
```

Inject specific environment variables:

```javascript
module.exports = {
  ...
  plugins: [
    new webpack.EnvironmentPlugin([
      NODE_ENV
    ])
  ]
  ...
};
```

Inject specific environment variables, with fallback values:

```javascript
module.exports = {
  ...
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development'
    })
  ]
  ...
};
```

Integration with `dotenv` package via [`dotenv-webpack`](https://github.com/mrsteele/dotenv-webpack):

```javascript
const Dotenv = require('dotenv-webpack');

module.exports = {
  ...
  plugins: [
    new Dotenv()
  ]
  ...
};
```

> Reference: [environment plugin documentation](https://webpack.js.org/plugins/environment-plugin/)
