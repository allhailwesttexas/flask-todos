from unipath import Path

p = Path(__file__).absolute()


SQLALCHEMY_DATABASE_URI = 'sqlite:///' + Path(p.parent, 'db',
                                              'db.sqlite')
DEBUG = True

CSRF_ENABLED = True
SECRET_KEY = 'replace me!'

ADMINS = ['peter.stensmyr@gmail.com']
