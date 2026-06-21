import DashboardLayout from "../layouts/DashboardLayout";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "₹0",
    features: [
      "5 interviews/day",
      "Basic feedback",
      "Question bank",
    ],
  },
  {
    name: "Pro",
    price: "₹99/month",
    features: [
      "Unlimited interviews",
      "Detailed AI feedback",
      "Voice analysis",
      "Career coaching",
    ],
  },
];

export default function Upgrade() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center">
          Upgrade Your Interview Skills
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="border rounded-2xl p-8 shadow-md"
            >
              <h2 className="text-2xl font-bold">
                {plan.name}
              </h2>

              <p className="text-4xl font-bold my-4">
                {plan.price}
              </p>

              <div className="space-y-3">
                {plan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex gap-2"
                  >
                    <Check size={18} />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
