import { useEffect, useState } from "react";
import QuestionsSection from "../components/QuestionsSection";
import RecordAnswerSection from "../components/RecordAnswerSection";
import { Button } from "../components/ui/button"
import { Link, useParams } from "react-router";
import { supabase } from "../utils/supabase";
import type { Interview, Question,  } from "../types/interview";

function StartInterview() {
    const [interviewData, setInterviewData] = useState<Interview | null>(null);

    const [questions, setQuestions] = useState<Question[]>([]);
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
    const params = useParams();
    useEffect(() => {
        getInterviewDetails();
    }, [])

    const getInterviewDetails = async () => {
        const { data, error } = await supabase
                                    .from("mockInterview")
                                    .select("*")
                                    .eq("mockId", params.interviewId)
                                    .single();

        if (error) {
            console.error(error);
            return;
        }

        const jsonMockResp = typeof data.jsonMockResp === "string"
                            ? JSON.parse(data.jsonMockResp)
                            : data.jsonMockResp;

        setQuestions(jsonMockResp);
        setInterviewData(data);
    }

  return (
    <div className="pl-10 pr-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <QuestionsSection interviewQuestions={questions} activeQuestionIndex={activeQuestionIndex} />
            <RecordAnswerSection interviewQuestions={questions} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData} />
        </div>
        <div className="flex justify-end gap-6">
            {activeQuestionIndex > 0 && 
                <Button variant="outline" onClick={() => setActiveQuestionIndex(activeQuestionIndex -1)}>
                    Previous Question
                    </Button>
            }
            {activeQuestionIndex < questions?.length - 1 && 
                <Button style={{backgroundColor: "#4845D2", color: "white"}} onClick={() => setActiveQuestionIndex(activeQuestionIndex + 1)}>
                    Next Question
                </Button>
            }
            {activeQuestionIndex === questions?.length - 1 &&
                <Link to={'/interview/' + interviewData?.mockId + "/feedback"}> 
                    <Button style={{backgroundColor: "#4845D2", color: "white"}}>End Interview</Button>
                </Link>
            }
        </div>
    </div>
  )
}

export default StartInterview