1. Create a PostgreSQL database locally
2. Inside **.env** in DATABASE_URL replace **mydb** with the name of your database 
3. Install the dependencies with `pipenv install`
4. Activate the virtual environment with `pipenv shell`
5. Upgrade the database with `python manage.py db upgrade`
6. Start the app with `pipenv run flask run`