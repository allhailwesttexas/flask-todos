from flask.ext.script import Manager, Shell, Server
from flask.ext.migrate import MigrateCommand
from livereload import Server as LiveReloadServer

from todos.app import app, db

manager = Manager(app)


def _make_context():
    '''Return context dict for a shell session so you can access
    app, db, and the User model by default.
    '''
    return {'app': app, 'db': db}

manager.add_command("server", Server(port=8000))
manager.add_command("shell", Shell(make_context=_make_context))
# manager.add_command('db', MigrateCommand)


@manager.command
def liveserver():
    server = LiveReloadServer(app)
    server.watch('todos/')
    server.serve()


@manager.command
def createdb():
    db.create_all()


if __name__ == '__main__':
    manager.run()
