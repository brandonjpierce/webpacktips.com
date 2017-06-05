---
date: 05-02-2017
title: Stub Node Packages
description: Soon™
author: Brandon Pierce
authorGithub: https://github.com/brandonjpierce
---

Some libraries import Node modules but don't use them in the browser. You can tell webpack to provide empty mocks for them.

```javascript
module.exports = {
  ...
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
  ...
};
```

> Reference: [node documentation](https://webpack.js.org/configuration/node/)
