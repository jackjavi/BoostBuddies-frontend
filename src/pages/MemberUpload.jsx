import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContextWrapper";
import { useNavigate } from "react-router-dom";

function MemberUpload() {
  const [formData, setFormData] = useState({
    dateOfBirth: "",
  });
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { authenticateUser, user } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleInputChange(event) {
    const { id, value } = event.target;
    setFormData({ ...formData, [id]: value });
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!file) {
      setErrorMessage("Please upload a profile picture.");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    try {
      const data = new FormData();
      data.append("dateOfBirth", formData.dateOfBirth);
      data.append("file", file);
      data.append("userId", user.id);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/members/create`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.status === 201) {
        setSuccessMessage("Member created successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
        await authenticateUser();
        setFormData({ dateOfBirth: "" });
        setFile(null);
        navigate("/profile");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.error || "Something went wrong.");
      setTimeout(() => setErrorMessage(""), 3000);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto space-y-4 flex flex-col items-center justify-center h-screen w-full"
    >
      <div className="w-full">
        <label htmlFor="dateOfBirth">Date of Birth:</label>
        <input
          className="mt-1 mb-4 p-2 w-full outline outline-1 outline-slate-800 rounded-md text-gray-700"
          type="date"
          id="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleInputChange}
        />
      </div>
      <div className="w-full">
        <label htmlFor="profilePicture">Profile Picture:</label>
        <input
          className="mt-1 mb-4 p-2 w-full outline outline-1 outline-slate-800 rounded-md text-gray-700"
          type="file"
          id="profilePicture"
          onChange={handleFileChange}
        />
      </div>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}
      <button className="w-full p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors font-bold">
        Submit
      </button>
    </form>
  );
}

export default MemberUpload;
