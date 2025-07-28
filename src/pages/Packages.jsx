import React from "react";
import { Trophy, Zap, Users, TrendingUp } from "lucide-react";
import { Button } from "../components/ui/button";
import MobileNavBottom from "../components/MobileNavBottomPackages";

const packages = [
  {
    name: "Genz Package",
    price: "Ksh 1500",
    description:
      "This is the top-tier package for the go-getters. Genz users enjoy access to premium, high-earning products and featured listings daily. With the highest daily view limits, early access to new products, and boosted referral earnings, Genz is for those playing to win.",
    benefits: [
      "View up to 15 products daily",
      "Earn from high-paying, priority products",
      "Access to featured & exclusive offers",
      "Top-tier referral bonuses",
      "Priority in chain payouts",
    ],
    icon: <Zap className="w-6 h-6 mx-auto text-yellow-300" />,
    imagePlaceholder:
      "[Insert premium image here, e.g. crown or lightning bolt]",
  },
  {
    name: "Mbogi Package",
    price: "Ksh 1000",
    description:
      "For the squad that hustles together. Mbogi gives you more firepower with boosted earnings and the ability to view more products daily. Great for building your network and maximizing daily gains.",
    benefits: [
      "View up to 10 products daily",
      "Eligible for higher-paying listings",
      "Better position in referral chain",
      "Daily rotation advantage",
    ],
    icon: <Users className="w-6 h-6 mx-auto text-white" />,
    imagePlaceholder: "[Insert team/circle image here]",
  },
  {
    name: "Baller Package",
    price: "Ksh 750",
    description:
      "Step up your game. Baller users get daily earning opportunities from multiple listings and a boost in chain earnings. Ideal for those testing the waters before going full throttle.",
    benefits: [
      "View up to 7 products daily",
      "Access to medium-tier rewards",
      "Referrals earn you more",
      "Basic featured listing access",
    ],
    icon: <TrendingUp className="w-6 h-6 mx-auto text-orange-300" />,
    imagePlaceholder: "[Insert image of growth or level-up concept]",
  },
  {
    name: "Comrade Package",
    price: "Ksh 500",
    description:
      "Just getting started? Comrade is your starter pack. You'll get daily view earnings and a chance to build your chain. Great for students or beginners trying out the system.",
    benefits: [
      "View up to 4 products daily",
      "Entry-level earnings",
      "Join referral chain",
      "Upgrade anytime",
    ],
    icon: <Trophy className="w-6 h-6 mx-auto text-white" />,
    imagePlaceholder: "[Insert casual or student-friendly icon/image]",
  },
];

const Packages = () => {
  return (
    <div>
      <main className="container mx-auto py-12 px-4 md:pt-32 pt-20 mb-20">
        <h1 className="text-3xl font-bold text-center mb-8 p-2">
          Choose Your Package
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-lg p-6 text-white flex flex-col items-center justify-between"
            >
              {pkg.icon}
              <h2 className="text-lg font-semibold mt-2">{pkg.name}</h2>
              <p className="text-sm opacity-80 mb-2">{pkg.price}</p>
              <p className="text-sm mb-4 text-center">{pkg.description}</p>
              <ul className="text-xs mb-4 text-left list-disc pl-4 space-y-1">
                {pkg.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
              <Button className="bg-yellow-500 text-black font-bold w-full">
                Make Payment
              </Button>
            </div>
          ))}
        </div>
      </main>
      <MobileNavBottom />
    </div>
  );
};

export default Packages;
