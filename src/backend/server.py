from flask import Flask, request, jsonify
from flask_cors import CORS
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

app = Flask(__name__)
CORS(app)

@app.route("/similarity", methods=["POST"])
def similarity():
    data = request.json
    doc1 = data.get("doc1", "")
    doc2 = data.get("doc2", "")

    if not doc1 or not doc2:
        return jsonify({"error": "Missing documents"}), 400

    vectorizer = TfidfVectorizer()
    tfidf = vectorizer.fit_transform([doc1, doc2])
    score = cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0]

    return jsonify({"score": float(score)})

import os

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 10000))
    app.run(host="0.0.0.0", port=port)