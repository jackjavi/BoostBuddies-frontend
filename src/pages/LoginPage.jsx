import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContextWrapper";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/users/login`,
        formData
      );
      if (response.status === 200) {
        storeToken(response.data.token);
        await authenticateUser();
      }
    } catch (error) {
      console.log(
        `Login error log ${error?.response?.data?.error?.message} || ${error.message}`
      );
      setErrorMessage(error?.response?.data?.error?.message || error.message);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  }

  const { password, email } = formData;

  return (
    <main className="bg-indigo-50 p-10">
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 flex flex-col items-center justify-center h-screen w-full "
      >
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

        {isLoading ? (
          <Spinner />
        ) : (
          <div>
            <p className="error">{errorMessage}</p>
            <p>
              You don't have an account ?{" "}
              <Link to={"/signup"}>
                <span className="underline">Sign up</span>
              </Link>
            </p>
          </div>
        )}
        <button
          className={`w-full p-2 rounded font-bold transition-colors ${
            isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-purple-500"
          }`}
          disabled={isLoading}
        >
          Login
        </button>
      </form>
    </main>
  );
}

export default LoginPage;
