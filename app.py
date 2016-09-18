from flask import Flask, jsonify, render_template
from flask import request
import requests
import parser2
import json

HOME_TEXT = "Glossator provides syntax highlighting and quick access to dictionary definitions for English text."

app = Flask(__name__)

@app.route('/')
def glossator():
    data = parser2.parse(HOME_TEXT)
    return render_template('base.html', words=data["words"])

@app.route('/', methods=['POST'])
def glossator_parse():
    text = request.form['text']
    data = parser2.parse(text)
    return render_template('parsed.html', words=data["words"])


if __name__ == 'main':
    app.run(debug=True)
