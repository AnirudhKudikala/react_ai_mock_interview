import { Lightbulb, Volume2 } from "lucide-react";
import type { Question } from "../types/interview";

interface QuestionsSectionProps {
  interviewQuestions: Question[];
  activeQuestionIndex: number;
}

function QuestionsSection({interviewQuestions, activeQuestionIndex}: QuestionsSectionProps) {
  const textToSpeech = (text: string) => {
    if ("speechSynthesis" in window) {
      if (window.speechSynthesis.speaking) {
        // If currently speaking, stop the speech
        window.speechSynthesis.cancel();
      } else {
        // Create a new SpeechSynthesisUtterance and speak
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
      }
    } else {
      alert("Sorry, your browser does not support text to speech");
    }
  };

  return (
    <div className="p-5 border rounded-lg my-10">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {interviewQuestions?.map((_, index: number) => (
          <h2
            key={index}
            className={`p-2 rounded-full text-xs md:text-sm text-center
              ${
                activeQuestionIndex === index
                  ? "bg-primary text-white"
                  : "bg-secondary"
              }`}
          >
            Question #{index + 1}
          </h2>
        ))}
      </div>

      <h2 className="m-5 text-md md:text-lg">
        {interviewQuestions?.[activeQuestionIndex]?.question}
      </h2>

      <Volume2
        className="cursor-pointer"
        onClick={() =>
          textToSpeech(
            interviewQuestions?.[activeQuestionIndex]?.question ?? ""
          )
        }
      />

      <div className="border rounded-lg p-5 bg-blue-100 mt-20">
        <h2 className="flex gap-2 items-center text-primary">
          <Lightbulb />
          <strong>Note:</strong>
        </h2>

        <h2 className="text-sm text-primary my-2">
          Before you begin answering each question, please click on the
          "Record" button when you are ready to respond. This will capture
          your answers and help simulate a real interview experience.
          Once you've completed all the questions, you'll receive detailed
          feedback on your performance. You'll also get a summary of your
          answers, allowing you to compare them with our suggestions and
          improve your responses.
        </h2>
      </div>
    </div>
  );
}

export default QuestionsSection;