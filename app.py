from flask import Flask, jsonify, render_template
from flask import request
import requests
import parser2
import json

app = Flask(__name__)

@app.route('/')
def glossator():
    return render_template('base.html', text='GLOSSY')

@app.route('/', methods=['POST'])
def glossator_parse():
    text = request.form['text']
    data = parser2.parse(text)
    print(data)

    def_json_str = requests.get('http://api.pearson.com/v2/dictionaries/lasde/entries?headword=fence').json()
    define = def_json_str["results"][0]["senses"][0]["definition"][0]


    return render_template('parsed.html', words=data["words"], definition=define)
 


if __name__ == 'main':
    app.run(debug=True)
