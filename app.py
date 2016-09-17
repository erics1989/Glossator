from flask import Flask, jsonify, render_template
from flask import request

app = Flask(__name__)

@app.route('/')
def glossator():
    return render_template('base.html', text='GLOSSY')

@app.route('/', methods=['POST'])
def glossator_parse():
    text = request.form['text']
    processed_text = text.upper()

    return render_template('parsed.html', parsed="<b>hello</b>")
 


if __name__ == 'main':
    app.run(debug=True)
