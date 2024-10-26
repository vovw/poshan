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
  const handlesome = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const targets = {
      calories: formData.get("calories"),
      protein: formData.get("protein"),
      carbs: formData.get("carbs"),
      fats: formData.get("fats"),
    };
    console.log("Nutrition Targets:", targets);
  };
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });
  const [isReg, setIsReg] = useState(false);
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
          router.push("/dashboard");
        } else raiseError("error at registration");
        console.log("Form submitted:", formData);
        // Example API call:
        // await axios.post('/api/register', formData);

        // Reset form after successful submission
        setFormData({
          email: "",
          password: "",
          calories: 0,
          protien: 0,
          carbs: 0,
          fats: 0,
        });
      } catch (error) {
        console.error("Registration error:", error);
        alert("Registration failed. Please try again."); // Replace with your error handling
      } finally {
        setIsLoading(false);
      }
    }
  };

  return isReg ? (
    <div className="flex flex-row justify-center">
      <Card className="w-[350px] bg-zinc-950 text-white">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-center">
            Set Nutrition Targets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="calories">Daily Calories</Label>
              <Input
                id="calories"
                name="calories"
                type="number"
                value={formData.calories}
                onChange={handleChange}
                placeholder="e.g. 2000"
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="protein">Protein (g)</Label>
              <Input
                id="protein"
                name="protein"
                type="number"
                value={formData.protein}
                onChange={handleChange}
                placeholder="e.g. 150"
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input
                id="carbs"
                name="carbs"
                value={formData.carbs}
                onChange={handleChange}
                type="number"
                placeholder="e.g. 250"
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fats">Fats (g)</Label>
              <Input
                id="fats"
                name="fats"
                value={formData.fats}
                onChange={handleChange}
                type="number"
                placeholder="e.g. 65"
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
              onSubmit={handleSubmit}
            >
              Save Targets
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  ) : (
    <div className="mt-32">
      <div className="flex flex-col justify-center items-center">
        <Card className="w-[350px]">
          <CardHeader className="flex flex-row justify-center">
            <CardTitle className="text-xl">Register</CardTitle>
          </CardHeader>
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
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button
              className="w-full"
              disabled={isLoading}
              onClick={() => {
                formData.email != "" && formData.password != ""
                  ? setIsReg(true)
                  : setIsReg(false);
              }}
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
        </Card>
      </div>
    </div>
  );
}
