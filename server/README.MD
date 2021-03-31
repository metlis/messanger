1. Create a PostgreSQL database locally
2. Transfer the contents of **.env.sample** to **.env**
3. Inside **.env** in DATABASE_URL replace **mydb** with the name of your database and provide a new secret key
4. Install the dependencies with `pipenv install`
5. Activate the virtual environment with `pipenv shell`
6. Upgrade the database with `python manage.py db upgrade`
7. Start the app with `pipenv run flask run`