from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.restful import Api

app = Flask(__name__)
app.config.from_object('todos.settings')
db = SQLAlchemy(app)
api = Api(app)

import views
import models
import resources

v1 = '/api/v1.0/todos'
api.add_resource(resources.TodoListAPI, v1, endpoint='todos')
api.add_resource(resources.TodoAPI, v1 + '/<int:id>', endpoint='todo')
