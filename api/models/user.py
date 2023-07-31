from datetime import datetime
from uuid import uuid4
from database import db

class User(db.Model):

    __tablename__ = "users"

    id = db.Column(db.String(256),default=uuid4().hex,primary_key=True)
    firstname = db.Column(db.String(128), nullable=True)
    lastname = db.Column(db.String(128), nullable=True)
    otp = db.Column(db.Integer(),nullable=True)
    email = db.Column(db.String(128), unique=True, nullable=False)
    verified = db.Column(db.Boolean,default=False)
    created_at = db.Column(db.DateTime(),default=datetime.now())

    def __init__(self,email,otp=None,fname=None,lname=None):
        self.firstname = fname
        self.lastname = lname
        self.otp = otp
        self.email = email
    
    def verify(self) ->bool:
        try:
            self.verified = True
            self.otp = None
            db.session.commit()
            return True
        except:
            return False
    
    def update(self) ->bool:
        try:
            db.session.commit()
            return True
        except:
            return False

    def create(self) -> bool:
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except:
            return False