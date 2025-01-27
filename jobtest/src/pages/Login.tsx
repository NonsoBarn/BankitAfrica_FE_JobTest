import { useState, FormEvent } from "react";
import ButtonComponent from "../components/ButtonComponent";
import InputComponent from "../components/InputComponent";
import { useNavigate } from "react-router-dom";
import { FormErrors } from "../types/generalTypes";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Form validation logic
  const validateForm = (): boolean => {
    const validationErrors: FormErrors = {};

    if (!email) {
      validationErrors.email = "Email is required.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      validationErrors.email = "Invalid email format.";
    }

    if (!password) {
      validationErrors.password = "Password is required.";
    } else if (password.length < 8) {
      validationErrors.password = "Password must be at least 8 characters.";
    }

    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  // Submit handler logic
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    setTimeout(() => {
      navigate("/transaction-history");
      alert("Login successful!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-sky-200 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div>
            <h1 className="text-2xl font-semibold text-center">The Bank</h1>
          </div>
          <div className="max-w-md mx-auto mt-10">
            <p className="text-xl font-semibold ">Login</p>
            <form onSubmit={handleSubmit} className="divide-y divide-gray-200">
              <div className="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <InputComponent
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email address"
                  label="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputComponent
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <p className="text-red-500 text-xs italic">
                  {errors.password && errors.email
                    ? `${errors.password}, ${errors.email}`
                    : errors.password || errors.email}
                </p>

                <ButtonComponent
                  text={isSubmitting ? "Submitting..." : "Submit"}
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  disabled={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
