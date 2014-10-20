from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restless import APIManager

app = Flask(__name__)
app.config.from_object('todos.settings')
db = SQLAlchemy(app)
manager = APIManager(app, flask_sqlalchemy_db=db)

import views
import models

# rest api for todos model
manager.create_api(models.Todo, methods=['GET', 'POST', 'DELETE'],
                   url_prefix='/api')