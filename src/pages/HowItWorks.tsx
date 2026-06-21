import {
  Brain,
  Mic,
  FileText,
  Trophy,
} from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

const steps = [
  {
    icon: Brain,
    title: "Create Interview",
    desc: "Enter job role, description and experience.",
  },
  {
    icon: FileText,
    title: "AI Generates Questions",
    desc: "Gemini creates interview questions.",
  },
  {
    icon: Mic,
    title: "Record Answers",
    desc: "Answer questions using voice input.",
  },
  {
    icon: Trophy,
    title: "Get Feedback",
    desc: "Receive ratings and improvement suggestions.",
  },
];

export default function HowItWorks() {
  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold text-center">
          How AI Mock Interview Works
        </h1>

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={index}
                className="border rounded-xl p-6 shadow-sm"
              >
                <Icon
                  size={40}
                  className="text-[#4845D2]"
                />

                <h2 className="text-xl font-bold mt-4">
                  {step.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {step.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
}