import { useState } from "react";
import "./App.css";

export default function App() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [score, setScore] = useState(null);

  function readFile(file) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.readAsText(file);
    });
  }

  async function handleCompare() {
    if (!file1 || !file2) {
      alert("Upload both documents");
      return;
    }

    try {
      const doc1 = await readFile(file1);
      const doc2 = await readFile(file2);

      const res = await fetch(
        "https://document-similarity-3ah4.onrender.com/similarity",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ doc1, doc2 }),
        }
      );

      const data = await res.json();
      setScore(data.score);
    } catch (err) {
      alert("Error connecting to backend");
    }
  }

  return (
    <div className="container">
      <h1>Document Similarity Checker</h1>

      <div className="upload">
        <input type="file" onChange={(e) => setFile1(e.target.files[0])} />
        <input type="file" onChange={(e) => setFile2(e.target.files[0])} />
      </div>

      <button onClick={handleCompare}>Compare Documents</button>

      {score !== null && (
        <div className="score">
          Similarity Score: {(score * 100).toFixed(2)}%
        </div>
      )}
    </div>
  );
}