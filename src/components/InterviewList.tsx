import { useUser } from "@clerk/react"
import { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { supabase } from "../utils/supabase";
import { Loader2 } from "lucide-react";
import type { Interview } from "../types/interview";

function InterviewList() {
    const {user} = useUser();
    const [interviewList, setInterviewList] = useState<Interview[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        user && getInterviewList()
    }, [user])

    const getInterviewList = async () => {
        setLoading(true);
    
        const { data, error } = await supabase
            .from("mockInterview")
            .select("*")
            .eq(
                "createdBy",
                user?.primaryEmailAddress?.emailAddress ?? ""
            )
            .order("id", { ascending: false });
    
        if (error) {
            console.error("error", error);
        }
    
        setInterviewList(data || []);
        setLoading(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    if (interviewList.length === 0) {
        return (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              No Interviews Yet
            </h2>
            <p className="mt-2 text-gray-500 max-w-md">
              You haven't created any mock interviews yet. Start a new interview to
              practice your skills and receive AI-powered feedback.
            </p>
          </div>
        );
    }

    return (
        <div>
            <h2 className="font-medium text-xl">Previous Interviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
                {interviewList?.map((interview, index) => (
                    <InterviewItemCard key={index} interview={interview} />
                ))}
            </div>
        </div>
    )
}

export default InterviewList