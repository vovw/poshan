"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Camera, Utensils, TrendingUp } from "lucide-react";
import CameraCapture from "../click/click";
import axios from "axios";
import Cookies from "js-cookie";
const ModernFoodTracker = () => {
  const [meals, setMeals] = useState([]);
  const [reload, setReload] = useState(false);
  const [dailyGoals, setDailyGoals] = useState({
    calories: 2000,
    protein: 80,
    carbs: 200,
    fats: 55,
  });

  const [currentStats, setCurrentStats] = useState({
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });


  useMemo(() => {
    let newstats = {
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    };
    meals.forEach((meal) => {
      meal.items.forEach((item) => {
        console.log(item);
        newstats.calories += item.calories;
        newstats.protein += item.protein;
        newstats.carbs += item.carbs;
        newstats.fats += item.fats;
      });
    });
    setCurrentStats(newstats);
  }, [meals]);
  useEffect(() => {
    fetchMeals();
    fetchGoals();
  }, [reload]);
  let fetchMeals = async () => {
    try {
      let user = Cookies.get("user");
      let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-all-meals`,
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
  let fetchGoals = async () => {
    try {
      let user = Cookies.get("user");
      let headers = {
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/get-goals`,
        { user_id: user },
        { headers },
      );
      console.log(response.data);
      if (response.data) {
        setDailyGoals({
          calories:response.data.calories,
          protein:response.data.protein,
          carbs:response.data.carbs,
          fats:response.data.fats
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <CameraCapture reload={reload} setReload={setReload} />
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
              currentStats.calories,
              dailyGoals.calories,
              "Calories",
            )}
            {renderProgressBar(
              currentStats.protein,
              dailyGoals.protein,
              "Protein (g)",
            )}
            {renderProgressBar(
              currentStats.carbs,
              dailyGoals.carbs,
              "Carbs (g)",
            )}
            {renderProgressBar(
              currentStats.fats,
              dailyGoals.fats,
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
                    {currentStats.calories}
                  </div>
                  <div className="text-sm text-gray-500">Calories</div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="text-2xl font-bold text-green-500">
                    {currentStats.protein}g
                  </div>
                  <div className="text-sm text-gray-500">Protein</div>
                </div>
              </div>
              <div className="text-sm text-gray-500 text-center">
                {dailyGoals.calories - currentStats.calories}{" "}
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
