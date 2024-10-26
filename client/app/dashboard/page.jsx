"use client";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Camera, Utensils, TrendingUp } from "lucide-react";
import CameraCapture from "../click/click";
import axios from "axios";
import Cookies from "js-cookie";
const ModernFoodTracker = () => {
  const dailyStats = {
    calories: { current: 1250, goal: 2000 },
    protein: { current: 45, goal: 80 },
    carbs: { current: 130, goal: 200 },
    fats: { current: 35, goal: 55 },
  };
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  useEffect(() => {
    fetchMeals();
  }, []);
  const [meals, setMeals] = useState([]);
  let fetchMeals = async () => {
    try {
      let user = Cookies.get("user");
      let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      let response = await axios.post(
        `${BACKEND_URL}/get-all-meals`,
        { user_id: user },
        { headers },
      );
      console.log(response.data);
      if (response.data) {
        setMeals(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const meals = [
  //   {
  //     id: 1,
  //     time: "8:30 AM",
  //     name: "Breakfast",
  //     imageUrl: "/api/placeholder/300/200",
  //     items: [
  //       {
  //         name: "Masala Dosa",
  //         quantity: 1,
  //         calories: 250,
  //         protein: 8,
  //         carbs: 45,
  //         fats: 6,
  //       },
  //       {
  //         name: "Coconut Chutney",
  //         quantity: 1,
  //         calories: 120,
  //         protein: 3,
  //         carbs: 8,
  //         fats: 9,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     time: "1:30 PM",
  //     name: "Lunch",
  //     imageUrl: "/api/placeholder/300/200",
  //     items: [
  //       {
  //         name: "Roti",
  //         quantity: 3,
  //         calories: 240,
  //         protein: 9,
  //         carbs: 45,
  //         fats: 1.5,
  //       },
  //       {
  //         name: "Dal",
  //         quantity: 1,
  //         calories: 150,
  //         protein: 9,
  //         carbs: 20,
  //         fats: 3,
  //       },
  //       {
  //         name: "Mixed Veg Curry",
  //         quantity: 1,
  //         calories: 180,
  //         protein: 6,
  //         carbs: 20,
  //         fats: 8,
  //       },
  //     ],
  //   },
  // ];

  const renderProgressBar = (current, goal, label) => (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{label}</span>
        <span className="text-gray-500">
          {current} / {goal}
        </span>
      </div>
      <Progress value={(current / goal) * 100} className="h-2" />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Header Section */}
      <div className="flex flex-col justify-between items-center">
        <h1 className="text-2xl font-bold">Nutrition Tracker</h1>
        <CameraCapture />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Utensils className="text-blue-500" size={20} />
              Daily Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {renderProgressBar(
              dailyStats.calories.current,
              dailyStats.calories.goal,
              "Calories",
            )}
            {renderProgressBar(
              dailyStats.protein.current,
              dailyStats.protein.goal,
              "Protein (g)",
            )}
            {renderProgressBar(
              dailyStats.carbs.current,
              dailyStats.carbs.goal,
              "Carbs (g)",
            )}
            {renderProgressBar(
              dailyStats.fats.current,
              dailyStats.fats.goal,
              "Fats (g)",
            )}
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-white">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="text-green-500" size={20} />
              Todays Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-blue-500">
                    {dailyStats.calories.current}
                  </div>
                  <div className="text-sm text-gray-500">Calories</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-500">
                    {dailyStats.protein.current}g
                  </div>
                  <div className="text-sm text-gray-500">Protein</div>
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center">
                {dailyStats.calories.goal - dailyStats.calories.current}{" "}
                calories remaining
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Meals List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Todays Meals</h2>
        {meals?.map((meal) => (
          <Card
            key={meal.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="flex">
              <img
                src={meal.image_url}
                alt={meal.name}
                className="w-32 h-32 object-cover"
              />
              <div className="p-4 flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{meal.name}</h3>
                    <p className="text-sm text-gray-500">{meal.time}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">
                      {meal.items.reduce((acc, item) => acc + item.calories, 0)}{" "}
                      kcal
                    </div>
                    <div className="text-sm text-gray-500">
                      {meal.items.reduce((acc, item) => acc + item.protein, 0)}g
                      protein
                    </div>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {meal.items
                    .map((item) => `${item.quantity} ${item.name}`)
                    .join(", ")}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ModernFoodTracker;
