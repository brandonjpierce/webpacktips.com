---
date: 05-02-2017
title: Naming Async Chunks
description: Soon™
author: Brandon Pierce
authorGithub: https://github.com/brandonjpierce
---

Naming async chunks can be quite useful since by default `[name]` for `chunkFilename` will simply produce a zero based index e.g. `0.chunk.js`. Naming chunks is also critical for proper long term caching support.

In webpack v2.4.0 and higher:

```javascript
import(/* webpackChunkName: "example-chunk-name" */ 'module');
```

```bash
example-chunk-name.chunk.js
```

In webpack v2.6.0 `[index]` and `[request]` are also supported:

```javascript
import(/* webpackChunkName: "example-chunk-name/[request]" */ 'module');
import(/* webpackChunkName: "example-chunk-name/[index]" */ 'module');
```

```bash
example-chunk-name/module.chunk.js
example-chunk-name/0.chunk.js
```

With old `require.ensure` syntax:

```javascript
require.ensure([], require => {
  require('a-module');
}, 'example-chunk-name');
```

```bash
example-chunk-name.chunk.js
```

> Reference: [chunk name documentation](https://webpack.js.org/guides/code-splitting-async/#chunk-names)
