PROJ_NAME=$1
PROJ_PATH=src/$PROJ_NAME

while inotifywait -e close_write $PROJ_PATH; 
do npx relay-compiler --src $PROJ_PATH --schema $PROJ_PATH/schema.graphql; 
done
