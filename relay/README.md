1. https://github.com/facebook/relay/issues/1983 : fragments on connection type do not work.

2. девсервер вебпака конфликтует с релей-компилятором на инотифаях - перестает реагировать на изменения кода, так что
   надо перезапускать вебпак: echo 16384 | sudo tee /proc/sys/fs/inotify/max_user_watches

3. https://github.com/facebook/relay/issues/2509

4. useReducer: dispatch is async?

5. isLoading() in pagination container is bogus: https://github.com/facebook/relay/issues/1973

6. To throw error in QueryRenderer's render callback is a bad idea even if error boundary exists.
   Look at requestCache: if you throw in render callback then QueryRenderer's componentDidMount method
   is never called and thus requestCache is never cleared. If you try to rerender component again
   you will be served with data from requestCache.
