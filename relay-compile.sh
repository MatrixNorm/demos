PROJ_NAME=$1
PROJ_PATH=srcjs/$PROJ_NAME
npx relay-compiler --src $PROJ_PATH --schema $PROJ_PATH/schema.graphql