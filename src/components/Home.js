import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");
  const uploadFileHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    axios
      .post("http://localhost:5001/upload/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: isLoggedIn,
        },
      })
      .then((response) =>
        setMessage(`File uploaded Sucessfully, Status Code ${response.status}`)
      )
      .catch((error) => {
        console.log(error.message);
        setMessage(error.message);
      });
  };
  return (
    <div className="home">
      <div className="upload">
        <form
          className="form-upload"
          onSubmit={uploadFileHandler}
          action="/upload"
          method="post"
        >
          <input
            type="file"
            onChange={(event) => {
              setFile(event.target.files[0]);
            }}
            name="file"
            className="input-upload"
          />
          <label for="actual-btn">Choose File</label>
          <button type="submit" className="uploadBtn">
            Upload File
          </button>
        </form>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Home;
