CLIENT_PATH=$1
SCHEMA_PATH=$2
#RELAY_DIR=src/__relay__/${CLIENT_PATH:4}

echo "Client path: $CLIENT_PATH"
echo "Server path: $SCHEMA_PATH"
#echo $RELAY_DIR

while inotifywait -r -e close_write $CLIENT_PATH $SCHEMA_PATH; 
  do npx relay-compiler --src $CLIENT_PATH \
                        --schema $SCHEMA_PATH \
                        --artifactDirectory src/__relay__ \
                        --language typescript; 
done;
