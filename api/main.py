import random
from flask import Flask, request, jsonify
from flask_mail import Mail,Message
from flask_migrate import Migrate
from flask_cors import CORS
from models import User
from database import db
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
cors = CORS(app)
migrate = Migrate(app,db)
mail = Mail(app)

@app.get("/check-working")
def working():
    return jsonify({"message":"Site is working fine"}),200

@app.post("/verify-email")
def verifyEmail():
    email = request.get_json()["email"]
    otp = random.randint(100000,999999)
    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(email=email,otp=otp)
        User.create(user)
    else:
        if user.verified:
            return jsonify({"message":"Email already verified."}),200
        user.otp = otp
        User.update(user)
    msg = Message("OTP Verification",recipients=[email])
    msg.body = f"Your otp is : {otp}"
    mail.send(msg)
    return jsonify({"message":"OTP has been sent your email address"}),401

@app.post("/verify-otp")
def verifyOTP():
    email,otp = request.get_json()["email"],request.get_json()["otp"]
    user = User.query.filter_by(email=email).first()
    if user and user.otp == otp:
        if User.verify(user):
            return jsonify({"message":"verified"}),200
        return jsonify({"message":"failed"}),401
    else:
        return jsonify({"message":"failed"}),401

@app.post("/send-email-to-admin")
def sendMailToAdmin():
    jsonData = request.get_json()
    fname, lname, email, content = jsonData["fname"], jsonData["lname"], jsonData["email"], jsonData["content"]
    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message":"User not found"}),404
    if user and not user.verified:
        return jsonify({"message":"Please verify your email"}),401
    user.firstname = fname
    user.lastname = lname
    User.update(user)
    msg = Message("Message from neuralcompute.xyz",recipients=["sonukumarhansda61@gmail.com"])
    msg.body = f'''
    User detail 
    ------------
    First Name : {fname}
    Last Name : {lname}
    Email Address : {email}
    message : {content}
'''
    mail.send(msg)
    return jsonify({
        "message":"Message sent successfully !"
    }), 200


if __name__ == "__main__":
    app.run(
        debug=True,
        host="0.0.0.0",
        port=5000
    )
