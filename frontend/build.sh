
# Run Django build
python manage.py collectstatic --noinput

gunicorn backend.wsgi:application -c gunicorn_config.py

# Run npm build
npm run build