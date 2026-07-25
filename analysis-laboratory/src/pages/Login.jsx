
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

  


  const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [tab, setTab] = useState("doctor");

    const handleRegister = () => {
    if (tab === "doctor") {
    navigate("/doctor/dashboard");
    } else {
     navigate("/employee/dashboard");
    }
  };

  const handleLogin = () => {
  if (tab === "doctor") {
    if (username === "doctor" && password === "1234") {
navigate("/doctor/dashboard");
    } else {
      alert("Wrong Doctor Username or Password");
    }
  
  } else {
    if (username === "employee" && password === "1234") {
     navigate("/employee/dashboard");
    } else {
      alert("Wrong Employee Username or Password");
    }
  }
};

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200">

      <div className="w-[420px] bg-white p-6 rounded-2xl shadow-xl
             animate-[fadeInUp_0.6s_ease-out]
             transition-all duration-300
             hover:-translate-y-2
             hover:shadow-2xl">
              <h1 className="text-3xl font-bold text-blue-600 text-center mb-4 ">Analysis-laboratory</h1>

        {/* Tabs */}
        <div className="flex mb-6 rounded-lg overflow-hidden border">


          <button
            onClick={() => setTab("doctor")}
            className={`w-1/2 p-2 text-sm font-semibold transition ${
              tab === "doctor" ? "bg-blue-600 text-white" : "bg-white"
            }`}
          >
            Doctor
          </button>

          

          <button
            onClick={() => setTab("employee")}
            className={`w-1/2 p-2 text-sm font-semibold transition ${
              tab === "employee" ? "bg-purple-600 text-white" : "bg-white"
            }`}
          >
            Employee
          </button>

        </div>

        {/* FORM */}
        {tab === "doctor" && (
          <div>
<h2 className="text-blue-600 font-bold mb-4">
  Doctor Login
</h2>
<input
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="w-full p-3 border rounded-lg mb-3"
/>           
<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-3 border rounded-lg mb-4"
/>

            <button
  onClick={handleLogin}
  className="w-full bg-blue-600 text-white p-3 rounded-lg"
>
  Login
</button>
          </div>
        )}

        

        {tab === "employee" && (
          <div>
<h2 className="text-purple-600 font-bold mb-4">
  Employee Login
</h2>
           <input
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  className="w-full p-3 border rounded-lg mb-3"
/>           
<input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  className="w-full p-3 border rounded-lg mb-4"
/>

            <button
  onClick={handleLogin}
  className="w-full bg-blue-600 text-white p-3 rounded-lg"
>
  Login
</button>
          </div>
        )}

      </div>
    </div>
  );
}

export default Login;