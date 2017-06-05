---
date: 05-02-2017
title: Disable require.ensure
description: Soon™
author: Brandon Pierce
authorGithub: https://github.com/brandonjpierce
---

You can disable the use of `require.ensure()`, which is the old method of async chunk fetching, to force developers to use the new `import()` syntax:

```javascript
module.exports = {
  ...
  module: {
    rules: [{ parser: { requireEnsure: false } }]
  }
  ...
};
```

> Reference: [rule parser documentation](https://webpack.js.org/configuration/module/#rule-parser)
