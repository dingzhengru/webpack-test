# My webpack test

|- package.json
|- webpack.config.js
|- index.html
|- /dist
  |- main.js
  |- index.html
|- /src
  |- index.js
|- /node_modules

## bundle src to dist
```npx webpack```  
or(需要在package.json => "scripts" add "build": "webpack")  
```npm run build```

## index.html
### Import your Js & Library
```
<script src="https://unpkg.com/lodash@4.16.6"></script>
<script src="./src/index.js"></script>
```
## src/index.js
### Import Library
```
import _ from 'lodash'
```

## package.json
## webpack.config.js
