from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def glossator():
    return render_template('base.html', text='GLOSSY')


if __name__ == 'main':
    app.run(debug=True)
