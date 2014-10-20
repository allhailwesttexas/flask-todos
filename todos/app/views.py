from flask import render_template
from todos.app import app
from todos.app.models import Todo


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/todos')
def todos_list():
    todos = Todo.query.all()
    return render_template('todos.html', todos=todos)