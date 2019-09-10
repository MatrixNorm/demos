CLIENT_NAME=$1
SERVER_NAME=$2

CLIENT_PATH=./src/$CLIENT_NAME
SCHEMA_PATH=./src/$SERVER_NAME/schema.graphql

echo "Client code: $CLIENT_NAME"
echo "Server code: $SCHEMA_PATH"

while inotifywait -e close_write $CLIENT_PATH $SCHEMA_PATH; 
do npx relay-compiler --src $CLIENT_PATH --schema $SCHEMA_PATH; 
done

# PROJ_NAME=$1
# PROJ_PATH=src/$PROJ_NAME

# while inotifywait -e close_write $PROJ_PATH; 
# do npx relay-compiler --src $PROJ_PATH --schema $PROJ_PATH/schema.graphql; 
# done
