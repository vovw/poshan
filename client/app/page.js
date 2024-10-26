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
            <a href="#testimonials" className="hover:text-green-600">
              User Feedback
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
              <a href="/register">Start Your Journey</a>
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
      <section id="testimonials" className="bg-green-50 py-20">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-12">
            Trusted by our 50 users
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">
                &quot;The userinterface is very cute and nice&quot;
              </p>
              <div className="font-semibold text-green-800">- Prajwal</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">
                &quot;The login and user expirenace is very minimal and
                straightforward&quot;
              </p>
              <div className="font-semibold text-green-800">- Shri</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <p className="text-gray-600 mb-4">
                &quot;The idea is very revolutionary if done right&quot;
              </p>
              <div className="font-semibold text-green-800">- Sujal</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-green-800 mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto mb-12">
            Start your journey to better nutrition with our flexible plans
            designed to meet your needs
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Tier */}
            <div className="bg-white rounded-xl shadow-sm p-8 border-2 border-green-100 hover:border-green-200 transition-all">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-green-800 mb-2">
                  Basic
                </h3>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  Free
                </div>
                <p className="text-gray-600">Perfect to get started</p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <Leaf className="text-green-600" size={20} />
                  <span>Basic image nutrition analysis</span>
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="text-green-600" size={20} />
                  <span>Daily nutrition tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="text-green-600" size={20} />
                  <span>Basic goal setting & tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="text-green-600" size={20} />
                  <span>Limited food database access</span>
                </li>
              </ul>
              <button className="w-full border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 font-semibold">
                <a href="/register">Get Started</a>
              </button>
            </div>

            {/* Pro Tier */}
            <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-green-600 hover:border-green-700 transition-all relative">
              <div className="absolute top-0 right-0 bg-green-600 text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-sm">
                POPULAR
              </div>
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-green-800 mb-2">Pro</h3>
                <div className="text-4xl font-bold text-green-600 mb-2">
                  ₹499<span className="text-lg text-gray-600">/month</span>
                </div>
                <p className="text-gray-600">
                  For serious nutrition enthusiasts
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-2">
                  <Leaf className="text-green-600" size={20} />
                  <span>All Basic features</span>
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="text-green-600" size={20} />
                  <span>Personalized AI recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="text-green-600" size={20} />
                  <span>Alternative food suggestions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="text-green-600" size={20} />
                  <span>Curated recipe recommendations</span>
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="text-green-600" size={20} />
                  <span>Personalized meal planning</span>
                </li>
                <li className="flex items-center gap-2">
                  <Leaf className="text-green-600" size={20} />
                  <span>Priority customer support</span>
                </li>
              </ul>
              <button className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold">
                <a href="/register">Upgrade to Pro</a>
              </button>
            </div>
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
            eating with poषण.
          </p>
          <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 text-lg">
            <a href="/register">Get Started Free</a>
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf size={24} />
              <span className="text-xl font-bold">poषण</span>
            </div>
            <p className="text-green-100">
              Your journey to better nutrition starts here.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-green-100">
              <li>
                <a href="/privacy" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-green-100">
          Made with ❤️ in Mumbai Hacks
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
