
import spacy

en = spacy.load("en")

def parse(text):
    doc = en(text)

    data = {}
    data["words"] = []

    for token in doc:
        word = {}
        word["orth"] = token.orth_
        word["pos"] = token.pos_
        word["lemma"] = token.lemma_
        data["words"].append(word)

    return data

print("finished loading parser2")

