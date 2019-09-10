https://github.com/facebook/relay/issues/1983

девсервер вебпака конфликтует с релей-компилятором на инотифаях -  перестает реагировать на изменения кода, так что 
надо перезапускать вебпак: echo 16384 | sudo tee /proc/sys/fs/inotify/max_user_watches

graphql-codegen generated shit flow types

