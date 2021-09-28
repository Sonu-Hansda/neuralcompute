import os
from flask import Flask,render_template,url_for
app = Flask(__name__)

@app.route("/")
def homepage():
    return render_template('homepage.html',title='homepage')

@app.route("/about")
def aboutpage():
     return render_template('aboutpage.html',title='aboutpage')

@app.route("/blog")
def blogpage():
     return render_template('blogpage.html',title='blogpage')

@app.route("/course")
def coursepage():
     return render_template('coursepage.html',title='coursepage')


if __name__ == "__main__":
    app.run(host='127.0.0.1',debug=True,port=8000,)