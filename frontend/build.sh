
# Run Django build
python manage.py collectstatic --noinput

python manage.py runserver
# Run npm build
npm run build