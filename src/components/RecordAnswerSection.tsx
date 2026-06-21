import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Mic } from "lucide-react";
import Webcam from "react-webcam";
import useSpeechToText from "react-hook-speech-to-text";
import { toast } from "sonner";
import { chatSession } from "../utils/GeminiAIModel";
// import { useUser } from "@clerk/react";
import dayjs from "dayjs";
import { supabase } from "../utils/supabase";
import type { Question } from "../types/interview";

interface InterviewData {
  mockId: string;
}

interface RecordAnswerSectionProps {
  interviewQuestions: Question[];
  activeQuestionIndex: number;
  interviewData: InterviewData | null;
}

function RecordAnswerSection({
  interviewQuestions,
  activeQuestionIndex,
  interviewData,
}: RecordAnswerSectionProps) {
  const userAnswerRef = useRef<string>("");

//   const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const {
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    userAnswerRef.current = results
      .map((result: string | any) =>
        typeof result === "string"
          ? result
          : result.transcript
      )
      .join(" ");

    console.log("Updated userAnswer:", userAnswerRef.current);
  }, [results]);

  const toggleRecord = async () => {
    if (isRecording) {
      stopSpeechToText();

      setTimeout(() => {
        const finalUserAnswer = userAnswerRef.current;

        if (finalUserAnswer.split(" ").length < 10) {
          setLoading(false);

          toast.error(
            "That is a very short answer. Try recording again."
          );

          return;
        }

        userAnswerRef.current = "";

        uploadUserAnswers(finalUserAnswer);
      }, 300);
    } else {
      startSpeechToText();
    }
  };

  const uploadUserAnswers = async (
    finalUserAnswer: string
  ) => {
    setLoading(true);

    const feedbackPrompt = `
I have a question and an answer that I would like evaluated.

Please provide feedback on the answer, including:
- rating (1-10)
- feedback

Return only JSON.

Question:
${interviewQuestions?.[activeQuestionIndex]?.question}

Answer:
${finalUserAnswer}
`;

    try {
      const result = await chatSession.sendMessage({
        message: feedbackPrompt,
      });

      const jsonText =
        result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ??
        "";

      const cleanedJson = jsonText
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      const jsonFeedbackResp = JSON.parse(cleanedJson);

      const { error } = await supabase
        .from("userAnswer")
        .insert([
          {
            mockIdRef: interviewData?.mockId,
            question:
              interviewQuestions?.[activeQuestionIndex]
                ?.question,
            correctAns:
              interviewQuestions?.[activeQuestionIndex]
                ?.answer,
            userAns: finalUserAnswer,
            feedback: jsonFeedbackResp.feedback,
            rating: jsonFeedbackResp.rating,
            userEmail:
            //   user?.primaryEmailAddress?.emailAddress ??
              "",
            createdAt: dayjs().format("DD-MM-YYYY")
          },
        ]);

      if (error) {
        console.error("Insert failed:", error);

        toast.error("Failed to save answer.");
      } else {
        toast.success("Answer recorded successfully.");
      }
    } catch (error) {
      console.error(
        "Error fetching feedback:",
        error
      );

      toast.error(
        "Failed to generate interview feedback."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-cols justify-center items-center rounded-lg p-5 my-20 mt-20">
        <img
          src="/webcam.jpg"
          width={200}
          height={200}
          className="absolute"
          alt="webcam"
        />

        <Webcam
          mirrored
          style={{
            height: 300,
            width: "100%",
            zIndex: 10,
          }}
        />
      </div>

      <Button
        variant="outline"
        disabled={loading}
        className="my-10"
        onClick={toggleRecord}
      >
        {isRecording ? (
          <h2 className="flex justify-center items-center text-red-600">
            <Mic className="mr-2" />
            Stop Recording...
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
}

export default RecordAnswerSection;