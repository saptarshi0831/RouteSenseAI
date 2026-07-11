import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { loginUser } from "../api/auth.api";
import useAuth from "../hooks/useAuth";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await loginUser(formData);

      login(response.data);

      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Invalid email or password."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        icon="🔐"
        title="Welcome Back"
        subtitle="Sign in to continue using RouteSense AI"
      >
        <form onSubmit={handleSubmit}>

          <Input
            label="Email Address"
            type="email"
            name="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            icon={Mail}
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            icon={Lock}
            required
          />

          <div className="remember-row">

            <label className="remember-me">

              <input type="checkbox" />

              <span>Remember me</span>

            </label>

            <Link
              to="/forgot-password"
              className="forgot-link"
            >
              Forgot Password?
            </Link>

          </div>

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
          >
            Sign In
          </Button>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="bottom-text">
            Don't have an account?

            <Link
              to="/register"
              className="bottom-link"
            >
              Create Account
            </Link>

          </p>

        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default Login;