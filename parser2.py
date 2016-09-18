
import spacy

en = spacy.load("en")
print("finished loading parser2")

def parse(text):
    doc = en(text)

    data = {}
    data["words"] = []

    for token in doc:
        data["words"].append(token)
        """
        word = {}
        word["orth"] = token.orth_
        word["pos"] = token.pos_
        word["lemma"] = token.lemma_
        data["words"].append(word)
        """

    return data

