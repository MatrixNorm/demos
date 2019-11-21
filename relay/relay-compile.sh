CLIENT_PATH=$1
SCHEMA_PATH=$2

echo "Client code: $CLIENT_PATH"
echo "Server code: $SCHEMA_PATH"

while inotifywait -r -e close_write $CLIENT_PATH $SCHEMA_PATH; 
  do npx relay-compiler --src $CLIENT_PATH \
                        --schema $SCHEMA_PATH \
                        --artifactDirectory $CLIENT_PATH/__generated__ \
                        --noFutureProofEnums; 
done;
