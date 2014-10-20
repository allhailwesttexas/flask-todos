from todos.app import db


class Todo(db.Model):
    __tablename__ = 'todos'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    completed = db.Column(db.Boolean)

    def __repr__(self):
        return "Title: {}, Completed: {}".format(self.title, self.completed)