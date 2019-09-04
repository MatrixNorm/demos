while inotifywait -e close_write ./srcjs; 
do npx flow status;
done