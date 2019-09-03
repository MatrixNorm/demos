# Workspaces Shadow CLJS Demo

## Running the demo

```
npm install
npx shadow-cljs watch workspaces 
```

Then open http://localhost:3655/.

## REPL

```
(shadow/nrepl-select :workspaces)
```

`flow status` interacts with webpack-dev-server:

1. start `flow status`
2. then start webpack devserver
3. observe that webpack does not react to file changes
