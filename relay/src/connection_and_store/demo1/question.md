Relay connection is spamming store with seemingly redundant records. Or I'm doing something wrong.

Here is a connection

```
allCities(
          first: $first
          after: $after
          last: $last
          before: $before
        ) @connection(key: "CityList_allCities", filters: [])
```

As expected it creates a record in store inside `client:root`:
```
__CityFeed_allCities_connection: {__ref: "client:root:__CityFeed_allCities_connection"}
```
That record contains refs to all loaded edges so far. That's Ok.

But store also is spammed with stuff like
```
allCities(first:3): {__ref: "client:root:allCities(first:3)"}
allCities(after:"3",first:3): {__ref: "client:root:allCities(after:"3",first:3)"}
```
There is no need to keep those in store because they reference same things as `__CityFeed_allCities_connection`.

Here is link to screenshot from chrome devtools: 


