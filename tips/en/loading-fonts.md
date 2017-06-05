---
date: 05-02-2017
title: Loading Fonts
description: Soon™
author: Brandon Pierce
authorGithub: https://github.com/brandonjpierce
---

Dependencies:

- `file-loader`

```javascript
module.exports = {
  ...
  module: {
    rules: [{
      test: /\.(eot|ttf|otf|woff|woff2)$/,
      use: [{
        loader: 'file-loader',
        options: {
          // Output fonts in specific directory with specific name convention
          name: 'fonts/[name].[ext]',

          // If you need to manipulate publicPath to fix CSS lookups
          publicPath: '../'
        }
      }]
    }]
  }
  ...
}
```

> Reference: [file loader documentation](https://github.com/webpack-contrib/file-loader)
