import { useUser } from "@clerk/react"
import { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";
import { supabase } from "../utils/supabase";

function InterviewList() {
    const {user} = useUser();
    const [interviewList, setInterviewList] = useState([]);

    useEffect(() => {
        getInterviewList()
    }, [])

    const getInterviewList = async() => {
        const { data, error } = await supabase
                                    .from("mockInterview")
                                    .select("*")
                                    // .eq("createdBy", user.primaryEmailAddress?.emailAddress)
                                    .order("id", { ascending: false });

                                    if (error) {
                                        console.error("error", error);
                                    }

                                    console.log("data", data);

        setInterviewList(data);
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