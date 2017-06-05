---
date: 05-02-2017
title: Long Term Caching
description: Soon™
author: Brandon Pierce
authorGithub: https://github.com/brandonjpierce
---

A lot of this was lifted from the incredible article by Tim Sebastian [Predictable long term caching with Webpack](https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31) so please make sure to read that as it gives excellent insight into the complexity of long term caching.

High level overview:

- `NamedModulesPlugin` is actually much better than `HashedModuleIdsPlugin` for gzip
- `NamedModulesPlugin` as a bonus helps with HMR debugging
- `NamedChunksPlugin` is required to help `NamedChunkPlugin` since it _only_ handles chunks with names and by default async chunks are nameless
- `NameAllModulesPlugin` handles any modules not covered by `NormalModulesPlugin` such as ones defined in `externals`
- `CommonsChunkPlugin` extracts the webpack runtime

Dependencies:
  - `name-all-modules-plugin`

```javascript
const RequestShortener = require('webpack/lib/RequestShortener');
const NameAllModulesPlugin = require('name-all-modules-plugin');

module.exports = {
  ...
    output: {
      filename: '[name].[chunkhash].js',
      chunkFilename: '[name].[chunkhash].js'
    },
    plugins: [
      new webpack.NamedModulesPlugin(),
      new webpack.NamedChunksPlugin(chunk => {
        if (chunk.name) return chunk.name;

        if (chunk.modules.length > 0) {
          const lastModule = chunk.modules[chunk.modules.length - 1];
          const rs = new RequestShortener(lastModule.context);
          return rs.shorten(lastModule.request).replace(/[.\/\\]/g, '_');
        }

        return null;
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      }),
      new NameAllModulesPlugin()
    ]
  ...
};
```

If you are using `ExtractTextPlugin` be sure to use `[name].[contenthash].css` as the filename. Note `[contenthash]` is _only_ available to `ExtractTextPlugin`.
