"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const NutritionTargetsForm = () => {
  const handleSubmit = (e) => {
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

  return (
    <div className="flex flex-row justify-center items-center">
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
                placeholder="e.g. 150"
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="carbs">Carbs (g)</Label>
              <Input
                id="carbs"
                name="carbs"
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
                type="number"
                placeholder="e.g. 65"
                className="bg-zinc-900 border-zinc-800 text-white"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Save Targets
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionTargetsForm;
