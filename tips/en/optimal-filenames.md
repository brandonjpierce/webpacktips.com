---
date: 05-02-2017
title: Optimal Filenames
description: Soon™
author: Brandon Pierce
authorGithub: https://github.com/brandonjpierce
---

In development environment use `[name]`:

```javascript
module.exports = {
  ...
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js'
  }
  ...
};
```

```bash
0.chunk.js
1.chunk.js
main.js
common.js
```

In production environment use `[chunkhash]` to create a deterministic hash based on the contents of the file:

```javascript
module.exports = {
  ...
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js'
  }
  ...
};
```

```bash
0.c98844e375a767e87de9.chunk.js
1.9669e84fd8fdd85b0ac0.chunk.js
main.c0c1f9ad1c1ef2200b4c.js
common.ff94ba8ffba983762a95.js
```

If you are using `ExtractTextPlugin` use:

```javascript
'[name].[contenthash].css'
```

Note `[contenthash]` is _only_ available to `ExtractTextPlugin`.

> Reference: [filename documentation](https://webpack.js.org/configuration/output/#output-filename)
