import { useState } from "react";
import "./App.css";

export default function App() {
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [score, setScore] = useState(null);
  async function handleCompare() {
  if (!file1 || !file2) {
    alert("Upload both documents");
    return;
  }

  const formData = new FormData();
  formData.append("file1", file1);
  formData.append("file2", file2);

  try {
    const res = await fetch(
      "https://document-similarity-3ah4.onrender.com/similarity",
      {
        method: "POST",
        body: formData
      }
    );

    const data = await res.json();
    setScore(data.score);

  } catch (err) {
    alert("Backend not running");
  }
}

  return (
    <div className="container">
      <h1>Document Similarity Checker</h1>

      <div className="upload">
        <input
          type="file"
          onChange={(e) => setFile1(e.target.files[0])}
        />

        <input
          type="file"
          onChange={(e) => setFile2(e.target.files[0])}
        />
      </div>

      <button onClick={handleCompare}>
        Compare Documents
      </button>

      {score !== null && (
        <div
          className="score"
          style={{
            backgroundColor:
              score > 0.75 ? "#d4edda" :
              score > 0.40 ? "#fff3cd" :
                             "#f8d7da",

            color:
              score > 0.75 ? "#155724" :
              score > 0.40 ? "#856404" :
                             "#721c24"
          }}
        >
          Similarity Score: {(score * 100).toFixed(2)}%
        </div>
      )}
    </div>
  );
}