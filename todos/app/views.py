from flask import render_template
from . import app


@app.route('/v0')
def index():
    return render_template('index.html')


@app.route('/v1')
def rindex():
    return render_template('rindex.html')
