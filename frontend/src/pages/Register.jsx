import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";

import AuthLayout from "../components/auth/AuthLayout";
import AuthCard from "../components/auth/AuthCard";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

import { registerUser } from "../api/auth.api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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

    setError("");

    if (formData.password !== formData.confirmPassword) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to create account."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <AuthCard
        icon="👤"
        title="Create Account"
        subtitle="Create your RouteSense AI account"
      >
        <form onSubmit={handleSubmit}>

          <Input
            label="Full Name"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            icon={User}
            required
          />

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
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            icon={Lock}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            icon={Lock}
            required
          />

          {error && (
            <div className="error-box">
              {error}
            </div>
          )}

          <Button
            type="submit"
            loading={loading}
          >
            Create Account
          </Button>

          <div className="divider">
            <span>OR</span>
          </div>

          <p className="bottom-text">
            Already have an account?

            <Link
              to="/"
              className="bottom-link"
            >
              Sign In
            </Link>

          </p>

        </form>
      </AuthCard>
    </AuthLayout>
  );
}

export default Register;