---
date: 05-02-2017
title: Smaller Moment Import
description: Soon™
author: Brandon Pierce
authorGithub: https://github.com/brandonjpierce
---

With `moment` 2.18 and higher, all locales are bundled together within the core library. The `IgnorePlugin` can be used to remove them and greatly reduce bundle size.

```javascript
module.exports = {
  ...
  plugins: [
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
  ]
  ...
}
```

> Reference: [ignore plugin documentation](https://webpack.js.org/plugins/ignore-plugin/)
