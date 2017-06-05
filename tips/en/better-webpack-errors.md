---
date: 05-02-2017
title: Better webpack Errors
description: Soon™
author: Brandon Pierce
authorGithub: https://github.com/brandonjpierce
---

The `FriendlyErrorsWebpackPlugin` provides a wonderfully clean and developer friendly alternative to webpack's default error handling:

Dependencies:
  - `friendly-errors-webpack-plugin`

```javascript
module.exports = {
  ...
  plugins: [
    new FriendlyErrorsWebpackPlugin()
  ]
  ...
}
```

![](https://camo.githubusercontent.com/c256a672a786f2cc15037e8a371a886ffe9505bd/687474703a2f2f692e696d6775722e636f6d2f5735397a3857462e676966)

> Reference: [friendly errors plugin documentation](https://github.com/geowarin/friendly-errors-webpack-plugin)
