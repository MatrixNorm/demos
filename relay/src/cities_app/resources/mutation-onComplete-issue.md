inititial state
{base}

commitMutation with optimistic update
{base} <-- {optimistic update}

applyUpdate while mutation is still ongoing
{base} <-- {optimistic update} <-- {apply update}

mutation completes:

- server response is merged to base
- optimistic update is reverted
- apply update is rebased

{new base} <-- {apply update}

onComplete callback is called:

```javascript
const snapshot = environment.lookup(operation.fragment);
```

This is not the "raw response" but the value after {apply update} is
optimistically applied to {new base}.
