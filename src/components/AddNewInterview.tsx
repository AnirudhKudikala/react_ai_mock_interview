import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/react";
import { LoaderCircle } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { chatSession } from "../utils/GeminiAIModel";
import { supabase } from "../utils/supabase";

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobExperience, setJobExperience] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useUser();
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const inputPrompt = `
            Generate exactly 5 interview questions and answers.

            Return ONLY valid JSON.

            Format:
            [
                {
                    "question": "Question here",
                    "answer": "Answer here"
                }
            ]

            Job Position: ${jobPosition}
            Job Description: ${jobDescription}
            Years of Experience: ${jobExperience}`;

    try {
        const result = await chatSession.sendMessage({
            message: inputPrompt,
        });
        console.log("result", result)
          
        const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";

        const parsedData = JSON.parse(jsonText);
        console.log("parsedData", parsedData);
    
        const interviewId = uuidv4();
    
        const { data, error } = await supabase
            .from("mockInterview")
            .insert([
            {
                mockId: interviewId,
                jsonMockResp: jsonText,
                jobPosition,
                jobDesc: jobDescription,
                jobExperience,
                createdBy: user?.primaryEmailAddress?.emailAddress ?? "",
                createdAt: moment().format("DD-MM-YYYY"),
            },
            ])
            .select("mockId");
    
        if (error) {
            throw error;
        }
    
        if (data?.[0]?.mockId) {
            setOpenDialog(false);
            navigate(`/interview/${data[0].mockId}`);
        }
    } catch (error) {
        console.error("Error generating interview:", error);
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interview
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2>
                    Add details about Job position/role, Job description and years
                    of experience
                  </h2>
                  <div className="mt-7 my-3">
                    <label>Job Role/Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      value={jobPosition}
                      onChange={(event) => setJobPosition(event.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/ Tech Stack (In Short)</label>
                    <Textarea
                      placeholder="Ex. Next, React, Node, Express, SQL etc."
                      required
                      value={jobDescription}
                      onChange={(event) =>
                        setJobDescription(event.target.value)
                      }
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max={50}
                      required
                      value={jobExperience}
                      onChange={(event) =>
                        setJobExperience(event.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" style={{backgroundColor: "#4845D2", color: "white"}} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <LoaderCircle className="animate-spin" />
                        Generating from AI
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
