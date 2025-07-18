import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    referredBy: "", // optional referral code input
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function handleChange(event) {
    const value = event.currentTarget.value;
    const key = event.currentTarget.id;
    setFormData({ ...formData, [key]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/register`,
        formData
      );
      if (response.status === 201) {
        setTimeout(() => navigate("/login"), 200);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || error.message);
      setTimeout(() => setErrorMessage(""), 3000);
    }
  }

  const { username, email, password, referredBy } = formData;

  return (
    <main className="bg-indigo-50 p-20">
      <form
        className="max-w-md mx-auto space-y-4 flex flex-col items-center justify-center h-screen w-full"
        onSubmit={handleSubmit}
      >
        <div className="w-full">
          <label htmlFor="username">Username:</label>
          <input
            id="username"
            value={username}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="w-full">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={handleChange}
            className="input"
          />
        </div>
        <div className="w-full">
          <label htmlFor="referredBy">Referral Code (optional):</label>
          <input
            id="referredBy"
            value={referredBy}
            onChange={handleChange}
            className="input"
          />
        </div>

        <p className="error">{errorMessage}</p>

        <p>
          Already have an account?{" "}
          <Link to="/login">
            <span className="underline">Login.</span>
          </Link>
        </p>

        <button className="w-full p-2 rounded bg-green-600 hover:bg-purple-500 transition-colors font-bold">
          Signup
        </button>
      </form>
    </main>
  );
}

export default SignupPage;
