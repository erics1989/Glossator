from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'


if __name__ == 'main':
    app.run(debug=True)
