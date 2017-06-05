---
date: 05-02-2017
title: Optimal Devtool
description: Soon™
author: Brandon Pierce
authorGithub: https://github.com/brandonjpierce
---

For development environment use `cheap-module-source-map`. The other possible options are `eval` and `cheap-module-eval-source-map`. Since `eval` does not read original code using a transpiler like babel will make it unusable. While `cheap-module-eval-source-map` is a great contender for speed, it currently does not show correct traces in Chrome or Firefox.

```javascript
module.exports = {
  ...
  devtool: 'cheap-module-source-map',
  ...
}
```

For production you can either use `source-map` or `hidden-source-map`. Note that if you are using `ExtractTextPlugin` you will need to use `source-map` to get correct source map files for your extracted CSS.

```javascript
module.exports = {
  ...
  devtool: 'source-map',
  ...
}
```

> Reference: [devtool documentation](https://webpack.js.org/configuration/devtool/)
