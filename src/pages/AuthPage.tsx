import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function AuthPage() {
  const auth = useContext(AuthContext);
  const [showRegister, setShowRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
const navigation = useNavigate()
  // authorization check
  if (!auth) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      // api call here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await auth.logIn(email, password);
      
      navigation( "/projects")
    } catch (error: any) {
      console.error(error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      // api call here
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      await auth.register(username, email, password);

      setShowRegister(false);
    } catch (error: any) {
      console.error(error.message);
      setError(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-white flex flex-col items-center justify-center mt-10">
      <h1 className="text-3xl font-bold mt-10 text-center">
        Start managing your projects.
      </h1>

      {/* ERROR  */}
      {error && <div className="mt-4 text-red-400">{error}</div>}

      {/* FORM  */}
      {showRegister ? (
        <form
          onSubmit={handleRegister}
          className="border p-5 mt-8 rounded w-80 flex flex-col gap-4"
        >
          <div className="text-xl font-bold">Register</div>

          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              id=""
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ml-2 border rounded"
            />
          </label>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              id=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-10 border rounded"
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-3 border rounded"
            />
          </label>

          <input
            type="submit"
            value="Register"
            className="border py-2 px-4 rounded"
          />

          {/* LOADING  */}
          {loading && <div className="animate-pulse">...</div>}
        </form>
      ) : (
        <form
          onSubmit={handleLogin}
          className="border p-5 mt-8 rounded w-80 flex flex-col gap-4"
        >
          <div className="text-xl font-bold">Login</div>
          <label htmlFor="email">
            Email:
            <input
              type="text"
              name="email"
              id=""
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="ml-10 border rounded"
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="password"
              name="password"
              id=""
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="ml-3 border rounded"
            />
          </label>
          <input
            type="submit"
            value="Login"
            className="border py-2 px-4 rounded"
          />

          {/* LOADING  */}
          {loading && <div className="animate-pulse">...</div>}
        </form>
      )}

      {/* TOGGLE FORM  */}
      {showRegister ? (
        <div>
          Already have an account?{" "}
          <span
            className="text-blue-500 hover:cursor-pointer"
            onClick={() => setShowRegister(false)}
          >
            Sign in
          </span>{" "}
        </div>
      ) : (
        <div>
          Don't have an account?{" "}
          <span
            className="text-blue-500 hover:cursor-pointer"
            onClick={() => setShowRegister(true)}
          >
            Sign up
          </span>{" "}
        </div>
      )}
    </div>
  );
}

export default AuthPage;