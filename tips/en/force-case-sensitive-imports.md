---
date: 05-02-2017
title: Force Case Sensitive Imports
description: Soon™
author: Brandon Pierce
authorGithub: https://github.com/brandonjpierce
---

Some environments are case insensitive (such as macOS and windows), whereas an environment like linux _is_ case sensitive. This plugin forces case sensitivity to ensure that the filesystem in in tact no matter the environment.

Dependencies:
  - `case-sensitive-paths-webpack-plugin`

```javascript
module.exports = {
  ...
  plugins: [
    new CaseSensitivePathsPlugin()
  ]
  ...
};
```

> Reference: [case sensitive documentation](https://github.com/Urthen/case-sensitive-paths-webpack-plugin)
