import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

function SignupPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    referredBy: null,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const value = event.currentTarget.value;
    const key = event.currentTarget.id;
    setFormData({ ...formData, [key]: value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/register`,
        formData
      );
      console.log(response);
      if (response.status === 201) {
        setTimeout(() => {
          navigate("/login");
        }, 200);
      }
    } catch (error) {
      console.log(
        `Signup error log ${error?.response?.data?.error?.message} || ${error.message}`
      );
      setErrorMessage(error?.response?.data?.error?.message || error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } finally {
      setIsLoading(false);
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
          <label htmlFor="username">Username: </label>
          <input
            className="mt-1 mb-4 p-2 w-full outline-0 rounded-md text-gray-700"
            type="text"
            id="username"
            value={username}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <label htmlFor="email">Email: </label>
          <input
            className="mt-1 mb-4 p-2 w-full outline-0 rounded-md text-gray-700"
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <label htmlFor="password">Password: </label>
          <input
            className="mt-1 mb-4 p-2 w-full outline-0 rounded-md text-gray-700"
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <div className="w-full">
          <label htmlFor="referredBy">Referral Code (optional): </label>
          <input
            className="mt-1 mb-4 p-2 w-full outline-0 rounded-md text-gray-700"
            type="text"
            id="referredBy"
            value={referredBy}
            onChange={handleChange}
          />
        </div>

        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <p className="error">{errorMessage}</p>
            <p>
              Already have an account?{" "}
              <Link to={"/login"}>
                <span className="underline">Login.</span>
              </Link>
            </p>
          </>
        )}
        <button
          className={`w-full p-2 rounded font-bold transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-purple-500"
          }`}
          disabled={isLoading}
        >
          Signup
        </button>
      </form>
    </main>
  );
}

export default SignupPage;
