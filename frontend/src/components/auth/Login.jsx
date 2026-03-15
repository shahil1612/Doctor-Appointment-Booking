// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { User, Stethoscope, Mail, Lock, LogIn, Home } from "lucide-react";
import FormInput from "../ui/FormInput";
import ParticleBackground from "../ui/ParticleBackground";
import toast from "react-hot-toast";
import { authAPI } from "../../services/api";
import {
  loginSuccess,
  mapBackendUserType,
  selectIsAuthenticated,
  selectUserType,
} from "../../store/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUserType = useSelector(selectUserType);
  const [userType, setUserType] = useState("PATIENT");
  const [formData, setFormData] = useState({
    UserType: "PATIENT",
    Email: "",
    Password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !currentUserType) {
      return;
    }

    navigate(
      currentUserType === "DOCTOR" ? "/doctor-dashboard" : "/patient-dashboard",
      { replace: true },
    );
  }, [isAuthenticated, currentUserType, navigate]);

  const handleUserTypeToggle = (type) => {
    setUserType(type);
    setFormData({ ...formData, UserType: type });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const data = await authAPI.login(formData);
      const backendUserType = mapBackendUserType(
        data.Usertype || data.usertype,
      );
      const token = data.Token || data.token;

      if (!token || !backendUserType) {
        throw new Error("Invalid login response from server.");
      }

      dispatch(
        loginSuccess({
          token,
          userType: backendUserType,
        }),
      );

      toast.success(data.Message || data.message || "Login successful!");

      navigate(
        backendUserType === "DOCTOR"
          ? "/doctor-dashboard"
          : "/patient-dashboard",
        { replace: true },
      );
    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex flex-col items-center justify-center p-4">
      {/* Background with Particles */}
      <ParticleBackground />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 mb-6"
      >
        <img src="/sehat-logo.png" alt="Sehat" className="h-16 w-auto" />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative z-10 text-center mb-6"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back</h1>
        <p className="text-gray-400 text-base">Sign in to your Sehat account</p>
      </motion.div>

      {/* User Type Toggle - Outside Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative z-10 mb-6"
      >
        <div className="flex gap-2 bg-white/5 p-1 rounded-lg border border-white/10">
          <button
            type="button"
            onClick={() => handleUserTypeToggle("PATIENT")}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              userType === "PATIENT"
                ? "bg-blue-100/20 text-white border-2 border-blue-100 shadow-lg shadow-blue-100/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <User size={16} />
            Patient
          </button>
          <button
            type="button"
            onClick={() => handleUserTypeToggle("DOCTOR")}
            className={`px-4 py-2 rounded-md font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
              userType === "DOCTOR"
                ? "bg-blue-100/20 text-white border-2 border-blue-100 shadow-lg shadow-blue-100/20"
                : "text-gray-400 hover:text-white hover:bg-white/5"
            }`}
          >
            <Stethoscope size={16} />
            Doctor
          </button>
        </div>
      </motion.div>

      {/* Main Card Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="relative z-10 w-full max-w-md mb-6"
      >
        {/* Glassmorphic Card */}
        <div className="bg-linear-to-br from-white/10 to-white/5 backdrop-blur-3xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="space-y-4">
              {/* Email */}
              <FormInput
                label="Email Address"
                icon={Mail}
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                placeholder="john@example.com"
                required
              />

              {/* Password */}
              <FormInput
                label="Password"
                icon={Lock}
                type="password"
                name="Password"
                value={formData.Password}
                onChange={handleInputChange}
                placeholder="Enter your password"
                required
                minLength={6}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="mt-3 text-right">
              <a
                href="#"
                className="text-xs text-blue-100 hover:text-white transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.01 }}
                whileTap={{ scale: isLoading ? 1 : 0.99 }}
                className="w-full bg-blue-300 hover:bg-blue-400 disabled:bg-blue-300/50 text-black font-semibold py-2.5 px-5 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all text-sm"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    <LogIn size={16} />
                    Sign In
                  </>
                )}
              </motion.button>
            </div>

            {/* Sign Up Link */}
            <div className="mt-4 text-center">
              <span className="text-xs text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-100 hover:text-white font-medium transition-colors"
                >
                  Sign up
                </Link>
              </span>
            </div>
          </form>
        </div>
      </motion.div>

      {/* Back to Home Button - Outside Card at Bottom */}
      <Link
        to="/"
        className="relative z-10 text-gray-400 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
      >
        <Home size={18} />
        Back to home
      </Link>
    </div>
  );
};

export default Login;
