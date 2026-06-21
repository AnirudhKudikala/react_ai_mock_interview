import { Button } from "../components/ui/button"
import { Lightbulb, WebcamIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Webcam from "react-webcam";
import { Link, useParams } from "react-router";
import { supabase } from "../utils/supabase";

type InterviewData = {
    id?: number;
    mockId: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    jsonMockResp: string;
    createdBy: string;
    createdAt: string;
};

function Interview() {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(null);
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false);
  const [isValidInterviewId, setIsvalidInterviewId] = useState(false);
  const params = useParams();

  useEffect(() => {
    getInterviewDetails();
  }, [])

  const getInterviewDetails = async () => {
    const { data, error } = await supabase
                                .from("mockInterview")
                                .select("*")
                                .eq("mockId", params.interviewId);
    
    if (error) {
        console.log(error);
    }

    if (!data || data.length === 0) {
      // notFound();
      setIsvalidInterviewId(false)
    } else {
      setIsvalidInterviewId(true)
    }

    setInterviewData(data?.[0]);
    console.log(data);
  }

  if (!isValidInterviewId) {
    return <h2 className="text-lg justify-center flex align-middle text-red-600">Interview id not found</h2>
  }

  return (
    <div className="my-10 pl-10 pr-10">
      <h2 className="font-bold text-2xl">
        Let's Get Started
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col my-5 gap-5">
          <div className="flex flex-col gap-5 p-5 rounded-lg border">
            <h2 className="text-lg"><strong>Job Role/ Job Position: </strong>{interviewData?.jobPosition}</h2>
            <h2 className="text-lg"><strong>Job Description/ Tech Stack: </strong>{interviewData?.jobDesc}</h2>
            <h2 className="text-lg"><strong>Years of Experience: </strong>{interviewData?.jobExperience}</h2>
          </div>
          <div className="p-5 border rounded-lg border-yellow-300 bg-yellow-100">
            <h2 className="flex gap-2 items-center text-yellow-500">
              <Lightbulb /><strong>Information</strong>
            </h2>
            <h2 className="mt-3 text-yellow-500">To start your AI mock interview, please enable your webcam and microphone. This will help simulate a real interview experience, allowing the AI to better assess your responses. Once you've completed the interview, you’ll receive personalized feedback and results. Rest assured, we prioritize your privacy: we will <strong>never record or store</strong> your video, and you have the option to disable the webcam at any time.</h2>
          </div>
        </div>
        <div>
          {isWebCamEnabled ? 
            <Webcam 
              onUserMedia={() => setIsWebCamEnabled(true)} 
              onUserMediaError={() => setIsWebCamEnabled(false)} 
              mirrored
              style={{height: 300, width: 300}} 
            /> :
            <div>
              <WebcamIcon className="h-72 w-full my-7 p-20 bg-secondary rounded-lg border" />
              <Button className="w-full" style={{backgroundColor: "#4845D2", color: "white"}} onClick={() => {setIsWebCamEnabled(true)}}>Enable Web Cam and Microphone</Button>
            </div>
          }
        </div>
      </div>
      <div className="flex justify-end items-end">
        <Link to={`/interview/${params.interviewId}/start`}>
          <Button style={{backgroundColor: "#4845D2", color: "white"}}>Start Interview</Button>
        </Link>
      </div>
    </div>
  )
}

export default Interview