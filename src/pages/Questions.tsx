import { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import DashboardLayout from "../layouts/DashboardLayout";

const questions = [
  {
    question: "What is React Reconciliation?",
    answer:
      "Reconciliation is React's process of comparing the previous Virtual DOM with the new Virtual DOM and updating only the changed parts of the actual DOM.",
  },
  {
    question: "What is the difference between useMemo and useCallback?",
    answer:
      "useMemo memoizes a computed value, while useCallback memoizes a function reference to avoid unnecessary re-renders.",
  },
  {
    question: "What is React Fiber?",
    answer:
      "React Fiber is React's reconciliation engine that enables incremental rendering and improves responsiveness.",
  },
  {
    question: "Explain the React component lifecycle.",
    answer:
      "The lifecycle consists of mounting, updating, and unmounting phases. In functional components, hooks such as useEffect are commonly used to manage lifecycle behavior.",
  },
  {
    question: "What are React Server Components?",
    answer:
      "React Server Components render on the server and do not send their JavaScript to the client, reducing bundle size and improving performance.",
  },
  {
    question: "What is the difference between state and props?",
    answer:
      "Props are read-only values passed from parent to child components, while state is managed internally by a component and can change over time.",
  },
  {
    question: "How do you optimize performance in React?",
    answer:
      "Common techniques include React.memo, useMemo, useCallback, lazy loading, code splitting, virtualization, and state colocation.",
  },
  {
    question: "What is the new React Native Architecture?",
    answer:
      "The new architecture consists of JSI, Fabric, and TurboModules, which eliminate the bridge bottleneck and improve performance.",
  },
  {
    question: "What is the purpose of keys in React lists?",
    answer:
      "Keys help React identify which items have changed, been added, or removed, allowing efficient DOM updates.",
  },
  {
    question: "What is TanStack Query and why is it used?",
    answer:
      "TanStack Query simplifies server state management by providing caching, synchronization, background updates, and automatic refetching.",
  },
];

function Questions() {
  const [search, setSearch] = useState("");

  const filteredQuestions = questions.filter((item) =>
    item.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto p-6 md:p-10">
        <h1 className="text-4xl font-bold mb-2">
          Interview Question Bank
        </h1>

        <p className="text-gray-500 mb-8">
          Practice common React and React Native interview questions before your
          AI mock interview.
        </p>

        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg p-3 mb-8 focus:outline-none focus:ring-2 focus:ring-[#4845D2]"
        />

        <div className="space-y-4">
          {filteredQuestions.map((item, index) => (
            <Collapsible
              key={index}
              className="border rounded-xl shadow-sm"
            >
              <CollapsibleTrigger className="w-full flex justify-between items-center p-4 text-left font-medium">
                <span>{item.question}</span>
                <ChevronsUpDown className="h-5 w-5 text-[#4845D2]" />
              </CollapsibleTrigger>

              <CollapsibleContent>
                <div className="p-4 border-t text-gray-700">
                  {item.answer}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {filteredQuestions.length === 0 && (
          <div className="text-center py-10 text-gray-500">
            No questions found.
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Questions;