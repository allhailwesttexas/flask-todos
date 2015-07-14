# from flask.ext import restless
from . import db


class Todo(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    done = db.Column(db.Boolean, default=False)
    description = db.Column(db.String)

    def __repr__(self):
        return "Title: {}, Completed: {}".format(self.title, self.done)
