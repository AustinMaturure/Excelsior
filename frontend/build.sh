
# Run Django build
python manage.py collectstatic --noinput

docker-compose up

# Run npm build
npm run build