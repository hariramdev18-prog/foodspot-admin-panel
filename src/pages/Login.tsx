import React, { useState, useContext } from "react";
import { LoginContext } from "../context/LoginContext";

const Login = () => {
  const [pin, setPin] = useState({
    box1: "",
    box2: "",
    box3: "",
    box4: "",
  });
  const { setIsLogin } = useContext(LoginContext);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!/^[0-9]?$/.test(value)) return;
    setPin({
      ...pin,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    const finalPin = pin.box1 + pin.box2 + pin.box3 + pin.box4;
    console.log("PIN:", finalPin);

    if (finalPin === "2074") {
      setIsLogin(true);
    } else {
      alert("Wrong PIN");
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* LEFT SIDE - PIN */}
      <div className="w-full md:w-1/2 flex justify-center items-center bg-white p-8">
        <div className="w-80">
          <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">
            Food Spot Login
          </h2>

          <p className="text-gray-500 text-center mb-6">
            Enter your 4 digit PIN
          </p>

          <div className="flex justify-between mb-6">
            {["box1", "box2", "box3", "box4"].map((box, index) => (
              <input
                key={index}
                type="text"
                name={box}
                value={pin[box as keyof typeof pin]}
                onChange={handleChange}
                maxLength={1}
                className="border-2 border-orange-300 focus:border-orange-500 outline-none w-14 h-14 text-center text-xl rounded-lg"
              />
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 transition text-white w-full py-3 rounded-lg font-semibold"
          >
            Submit
          </button>
        </div>
      </div>

      {/* RIGHT SIDE - IMAGE DESIGN */}
      <div className="w-full md:w-1/2 relative hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
          alt="Food background"
          className="w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-white text-center p-10">
          <h1 className="text-4xl font-bold mb-4">Welcome to Food Spot </h1>
          <p className="text-lg opacity-90">
            Delicious meals. Fast delivery. Fresh ingredients.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
