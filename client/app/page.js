/* eslint-disable react/no-unescaped-entities */
"use client";

import Image from "next/image";
import React from "react";
import { Leaf, Battery, Brain, Heart } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="font-serif">
      {/* Navigation */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-sm z-50 border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Leaf className="text-green-600" size={24} />
            <span className="text-2xl font-bold text-green-800">poषण</span>
          </div>
          <div className="hidden md:flex gap-8 text-gray-600">
            <a href="#features" className="hover:text-green-600">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-green-600">
              How it Works
            </a>
            <a href="#pricing" className="hover:text-green-600">
              Pricing
            </a>
          </div>
          <div className="flex gap-4">
            <button className="text-green-600 hover:text-green-700">
              <a href="/login">Login</a>
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
              <a href="/register">Get Started</a>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-6">
            Your Personal
            <span className="text-green-600"> Nutrition </span>
            Assistant
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            Transform your relationship with food using AI-powered nutrition
            tracking. Understand your body better, eat mindfully, and achieve
            your wellness goals.
          </p>
          <div className="flex gap-4 justify-center mb-16">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 text-lg">
              Start Your Journey
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg hover:bg-green-50 text-lg">
              Watch Demo
            </button>
          </div>
          <Image
            src="/ui.png"
            alt="Healthy Food"
            width={100}
            height={100}
            layout="responsive"
            objectFit="contain"
          />
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-16">
            Why Choose poषण?
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: <Battery className="text-green-600" size={32} />,
                title: "Smart Tracking",
                description:
                  "Effortlessly track your meals with AI-powered vision llama models and instant nutritional analysis.",
              },
              {
                icon: <Brain className="text-green-600" size={32} />,
                title: "Personalized Insights",
                description:
                  "Get tailored recommendations and suggestions based on your goals, preferences, and dietary restrictions.",
              },
              {
                icon: <Heart className="text-green-600" size={32} />,
                title: "Holistic Approach",
                description:
                  "Focus on overall diet wellness, not just calories. Track nutrients and diet habits.",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-green-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="bg-green-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-12">
            Trusted by Thousands
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((testimonial) => (
              <div
                key={testimonial}
                className="bg-white p-6 rounded-xl shadow-sm"
              >
                <p className="text-gray-600 mb-4">
                  &quot;Poshan has completely changed how I think about food.
                  The insights are incredible!&quot;
                </p>
                <div className="font-semibold text-green-800">- Happy User</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-6">
            Ready to Transform Your Nutrition Journey?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of others who have discovered the power of mindful
            eating with Poshan.
          </p>
          <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 text-lg">
            Get Started Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf size={24} />
              <span className="text-xl font-bold">Poshan</span>
            </div>
            <p className="text-green-100">
              Your journey to better nutrition starts here.
            </p>
          </div>
          {["Product", "Company", "Resources", "Legal"].map((section) => (
            <div key={section}>
              <h3 className="font-semibold mb-4">{section}</h3>
              <ul className="space-y-2 text-green-100">
                <li>
                  <a href="#" className="hover:text-white">
                    Link 1
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Link 2
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Link 3
                  </a>
                </li>
              </ul>
            </div>
          ))}
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
