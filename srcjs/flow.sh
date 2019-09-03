PROJ_NAME=$1
PROJ_PATH=./$PROJ_NAME

while inotifywait -e close_write $PROJ_PATH; 
do npx flow status;
done