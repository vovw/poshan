"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const validateForm = () => {
    let tempErrors = {};
    if (!formData.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      tempErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      tempErrors.password = "Password must be at least 6 characters";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleSubmit = async (e) => {
    let headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Add your registration logic here
        let res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/register`, formData, {
          headers,
        });
        if (res.data.error == false) {
          Cookies.set("user", res.data.token, { expires: 7 });
          router.push("/click");
        } else raiseError("error at registration");
        console.log("Form submitted:", formData);
        // Example API call:
        // await axios.post('/api/register', formData);

        // Reset form after successful submission
        setFormData({
          email: "",
          password: "",
        });
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again."); // Replace with your error handling
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="mt-32">
      <div className="flex flex-col justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader className="flex flex-row justify-center">
            <CardTitle className="text-xl">Register</CardTitle>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  disabled={isLoading}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">{errors.email}</span>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <Label>Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  disabled={isLoading}
                />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    {errors.password}
                  </span>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
                onSubmit={handleSubmit}
              >
                {isLoading ? "Registering..." : "Register"}
              </Button>
              <p className="text-sm text-center text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-500 hover:underline">
                  Login
                </a>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
}
