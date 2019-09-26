CLIENT_PATH=$1
SCHEMA_PATH=$2

echo "Client code: $CLIENT_PATH"
echo "Server code: $SCHEMA_PATH"

while inotifywait -e close_write $CLIENT_PATH $SCHEMA_PATH; 
do npx relay-compiler --src $CLIENT_PATH --schema $SCHEMA_PATH --noFutureProofEnums; 
done

# PROJ_NAME=$1
# PROJ_PATH=src/$PROJ_NAME

# while inotifywait -e close_write $PROJ_PATH; 
# do npx relay-compiler --src $PROJ_PATH --schema $PROJ_PATH/schema.graphql; 
# done
