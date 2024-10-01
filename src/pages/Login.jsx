import { useEffect, useState } from "react";
import LabelInput from "../components/LabelInput";
import PasswordInput from "../components/PasswordInput";
import axios from "axios";
import EmailInput from "../components/EmailInput";
import Aos from "aos";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { loadClient } from "../redux/actions/clientActions";
import { useDispatch } from "react-redux";

const Login = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [registerFirstName, setRegisterFirstName] = useState("");
  const [registerLastName, setRegisterLastName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleForm = () => {
    setIsLoginActive(!isLoginActive);
  };

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculateAngle = (arrowPosition) => {
    const deltaX = mousePosition.x - arrowPosition.x;
    const deltaY = mousePosition.y - arrowPosition.y;
    return Math.atan2(deltaY, deltaX) * (180 / Math.PI); // Convierte de radianes a grados
  };

  const arrowPositions = [
    { x: window.innerWidth / 2, y: window.innerHeight * 0.1 },
    { x: window.innerWidth / 2.5, y: window.innerHeight * 0.85 },
    { x: window.innerWidth / 1.6, y: window.innerHeight * 0.85 },
    { x: window.innerWidth * 0.8, y: window.innerHeight / 2 },
    { x: window.innerWidth * 0.2, y: window.innerHeight / 2 },
    { x: window.innerWidth * 0.9, y: window.innerHeight * 0.1 },
    { x: window.innerWidth * 0.1, y: window.innerHeight * 0.1 },
    { x: window.innerWidth * 0.1, y: window.innerHeight * 0.85 },
    { x: window.innerWidth * 0.9, y: window.innerHeight * 0.85 },
    { x: window.innerWidth * 0.2, y: window.innerHeight * 0.3 },
    { x: window.innerWidth * 0.8, y: window.innerHeight * 0.3 },
    { x: window.innerWidth * 0.2, y: window.innerHeight * 0.7 },
    { x: window.innerWidth * 0.8, y: window.innerHeight * 0.7 },
  ];

  const alerError = (msg) => {
    Swal.fire({
      title: "Oops! Something went wrong.",
      text: msg,
      icon: "error",
    });
  };

  const alerSuccess = (msg) => {
    Swal.fire({
      title: "Success!",
      text: msg,
      icon: "success",
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validación de email
    if (!loginEmail || !/\S+@\S+\.\S+/.test(loginEmail)) {
      alerError("Please enter a valid email address.");
      return;
    }

    // Validación de contraseña (mínimo 8 caracteres)
    // if (!loginPassword || loginPassword.length < 8) {
    //     alerError("Password must be at least 8 characters long.");
    //   return;
    // }

    const user = { email: loginEmail, password: loginPassword };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/login",
        user
      );
      alerSuccess(
        "Login successful. Welcome back to WaveCompany. You can now access your account and enjoy our services."
      );
      navigate("/home");
      console.log(response.data);

      localStorage.setItem("token", response.data);
      dispatch(loadClient());
    } catch (error) {
      alerError(error.response.data);
    }
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    // First Name validation
    if (!registerFirstName || registerFirstName.length < 2) {
      alerError("First name must be at least 2 characters long.");
      return;
    }

    // Last Name validation
    if (!registerLastName || registerLastName.length < 2) {
      alerError("Last name must be at least 2 characters long.");
      return;
    }

    // Email validation
    if (!registerEmail || !/\S+@\S+\.\S+/.test(registerEmail)) {
      alerError("Please enter a valid email address.");
      return;
    }

    // Password validation
    if (!registerPassword || registerPassword.length < 8) {
      alerError(
        "Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character."
      );
      return;
    }

    const user = {
      firstName: registerFirstName,
      lastName: registerLastName,
      email: registerEmail,
      password: registerPassword,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        user
      );
      alerSuccess("You have successfully registered. You may now log in.");
      toggleForm();
    } catch (error) {
      alerError(error.response.data);
    }
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-gray-100 p-4"
      data-aos="flip-left"
    >
      <div
        className="w-full z-10 max-w-3xl bg-white rounded-lg shadow-xl overflow-hidden"
        data-aos="flip-right"
      >
        <div className="relative flex flex-col md:flex-row h-[600px] md:h-[500px]">
          {/* Login Form */}
          <div
            className={`absolute inset-0 w-full md:w-1/2 p-8 transition-all duration-500 ease-in-out ${
              isLoginActive
                ? "translate-x-0 opacity-100 z-10"
                : "translate-x-full opacity-0 z-0"
            }`}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
            <form className="space-y-4" onSubmit={(e) => handleLogin(e)}>
              <div className="space-y-2">
                <LabelInput
                  name="username"
                  title="Username"
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <PasswordInput
                  name="password"
                  title="Password"
                  onChange={(e) => setLoginPassword(e.target.value)}
                />
              </div>
              <button
                className="w-full flex justify-center items-center bg-black text-white py-2 rounded-3xl duration-100 hover:bg-white hover:text-black hover:border-2 hover:border-black hover:shadow-2xl hover:font-bold"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>

          {/* Signup Form */}
          <div
            className={`absolute inset-0 w-full md:w-1/2 p-8 transition-all duration-500 ease-in-out ${
              isLoginActive
                ? "translate-x-full opacity-0 z-0"
                : "translate-x-0 opacity-100 z-10"
            } md:translate-x-full`}
          >
            <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
            <form className="space-y-4" onSubmit={handleRegister}>
              <div className="space-y-2">
                <LabelInput
                  name="firstname"
                  title="First name"
                  onChange={(e) => setRegisterFirstName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <LabelInput
                  name="lastname"
                  title="Last name"
                  onChange={(e) => setRegisterLastName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <EmailInput
                  name="email"
                  title="Email"
                  onChange={(e) => setRegisterEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <PasswordInput
                  name="password"
                  title="Password"
                  onChange={(e) => setRegisterPassword(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <PasswordInput
                  name="confirmpassword"
                  title="Confirm Password"
                  onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                />
              </div>
              <button
                className="w-full flex justify-center items-center bg-black text-white py-2 rounded-3xl duration-100 hover:bg-white hover:text-black hover:border-2 hover:border-black hover:shadow-2xl hover:font-bold"
                type="submit"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Image Section */}
          <div
            className={`absolute inset-y-0 w-full md:w-1/2 transition-transform duration-500 ease-in-out  ${
              isLoginActive ? "translate-x-full" : "translate-x-0"
            }`}
          >
            <a href="#" className="group relative block bg-black ">
              <img
                alt=""
                src="https://i.ibb.co/3pTB00j/collage-Login.jpg"
                className="absolute inset-0 h-full w-full object-cover opacity-50 transition-opacity group-hover:opacity-30"
              />

              <div className="relative p-4 sm:p-6 lg:p-8 text-center">
                <p className="text-xl font-bold uppercase tracking-widest bg-[#000000be] text-white border-b-white border-b-4 border rounded-3xl">
                  Wave Center
                </p>

                <p className="text-xl font-bold text-white sm:text-2xl">
                  Where every wave is a new cultural experience.
                </p>

                <div className="mt-32 sm:mt-48 ">
                  <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-base text-white ">
                      Welcome to WaveCenter!✨ Here you can access your account
                      to discover everything our cultural center has to offer.
                      If you are not yet part of our community, register in a
                      few simple steps and start enjoying our events, workshops
                      and exclusive activities. Log in with your email and
                      password, or create a new account if it's your first time.
                      We are waiting for you to experience culture in every
                      wave! 🌊
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="text-center p-4 bg-gray-100 relative z-50 mt-20 border-t-black border-t-2">
          <button variant="link" onClick={toggleForm}>
            {isLoginActive
              ? "Need an account? Sign Up"
              : "Already have an account? Login"}
          </button>
        </div>
      </div>
      {arrowPositions.map((position, index) => {
        const arrowAngle = calculateAngle(position);
        return (
          <div
            key={index}
            className="absolute z-0 hover:bg-white hover:shadow-2xl hover:rounded-full"
            style={{
              left: position.x,
              top: position.y,
              transform: `translate(-50%, -50%) rotate(${arrowAngle}deg)`,
              width: "150px", // Cambia según sea necesario
              height: "150px", // Cambia según sea necesario
              backgroundImage:
                "url('https://png.pngtree.com/png-vector/20230430/ourmid/pngtree-right-arrow-vector-png-image_6745379.png')", // Cambia a la ruta de tu flecha
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          />
        );
      })}
    </div>
  );
};

export default Login;
