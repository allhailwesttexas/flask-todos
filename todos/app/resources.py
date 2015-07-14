from flask.ext.restful import Resource, reqparse
from marshmallow import Schema, fields

from .models import Todo
from . import db, api


# ##### SCHEMAS #####


class TodoSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str()
    done = fields.Boolean()
    description = fields.Str()
    uri = fields.Method("build_uri", dump_only=True)

    def build_uri(self, todo):
        return api.url_for(TodoAPI, id=todo.id)

todo_schema = TodoSchema()
todos_schema = TodoSchema(many=True)


# ##### RESOURCES #####


class TodoListAPI(Resource):

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type=str, required=True,
                                   help='No todo title provided',
                                   location='json')
        self.reqparse.add_argument('description', type=str, default="",
                                   location='json')
        super(TodoListAPI, self).__init__()

    def get(self):
        tasks = Todo.query
        ser = todos_schema.dump(tasks)
        return {'todos': ser.data}

    def post(self):
        args = self.reqparse.parse_args()
        d = {'title': args['title'],
             'description': args['description'],
             'done': False}
        t = Todo(**d)
        db.session.add(t)
        db.session.commit()
        ser = todo_schema.dump(t)
        return {'todo': ser.data}


class TodoAPI(Resource):

    # decorators = [auth.login_required]

    def __init__(self):
        self.reqparse = reqparse.RequestParser()
        self.reqparse.add_argument('title', type=str, location='json')
        self.reqparse.add_argument('description', type=str, location='json')
        self.reqparse.add_argument('done', type=bool, location='json')
        super(TodoAPI, self).__init__()

    def get(self, id):
        t = Todo.query.get_or_404(id)
        ser = todo_schema.dump(t)
        return {"todo": ser.data}

    def put(self, id):
        kwargs = self.reqparse.parse_args()
        t = Todo.query.get_or_404(id)
        for attr, value in kwargs.items():
            if value is not None:
                setattr(t, attr, value)
        db.session.add(t)
        db.session.commit()
        ser = todo_schema.dump(t)
        return {"todo": ser.data}

    def delete(self, id):
        t = Todo.query.get_or_404(id)
        db.session.delete(t)
        db.session.commit()
        return {'result': True}
