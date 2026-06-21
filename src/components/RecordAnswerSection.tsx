import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Mic } from 'lucide-react';
import Webcam from 'react-webcam';
import useSpeechToText from 'react-hook-speech-to-text';
import { toast } from "sonner";
import { chatSession } from '../utils/GeminiAIModel';
import { useUser } from '@clerk/react';
import moment from 'moment';
import { supabase } from '../utils/supabase';

function RecordAnswerSection({ interviewQuestions, activeQuestionIndex, interviewData }) {
    const userAnswerRef = useRef(''); // Use ref to store user answer
    const {user} = useUser();
    const [loading, setLoading] = useState(false);
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
        setResults
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(() => {
        // Combine results to build the user answer
        results.map(result=> (
            userAnswerRef.current = result.transcript
        ))
        console.log("Updated userAnswer:", userAnswerRef.current); // Log for debugging
    }, [results]);

    const toggleRecord = async () => {
        if (isRecording) {
            stopSpeechToText();
            setTimeout(async() => {
                const finalUserAnswer = userAnswerRef.current; // Get the latest answer from ref

                if (finalUserAnswer.split(' ').length < 10) {
                    setLoading(false);
                    toast("That is a very short answer. Try recording again");
                    return;
                }
                userAnswerRef.current = '';
                uploadUserAnswers(finalUserAnswer);
            }, 300); // Adjust this delay if necessary
        } else {
            startSpeechToText(); // Start recording
        }
    };

    const uploadUserAnswers = async(finalUserAnswer) => {
        setLoading(true);
        const feedbackPrompt = `I have a question and an answer that I would like evaluated. Please provide feedback on the answer, including a rating on a scale from 1 to 10, and suggest any areas of improvement if necessary in just 3 to 5 lines in JSON format with rating field and feedback field.
                
            - Question: ${interviewQuestions?.[activeQuestionIndex]?.question}
            - Answer: ${finalUserAnswer}`;

        try {
            const result = await chatSession.sendMessage({
                message: feedbackPrompt,
            });
            console.log("result", result);
            const jsonText = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ?? "";
            // const mockJsonRes = result.response.text()
            //     .replace(/```json/g, '')
            //     .replace(/```/g, '')
            //     .trim(); 

            // console.log("mockJsonRes", mockJsonRes);
            const jsonFeedbackResp = JSON.parse(jsonText);
            console.log("jsonText", jsonText, jsonFeedbackResp);

            const { data, error } = await supabase
                                        .from("userAnswer")
                                        .insert([
                                            {
                                                mockIdRef: interviewData?.mockId,
                                                question: interviewQuestions?.[activeQuestionIndex]?.question,
                                                correctAns: interviewQuestions?.[activeQuestionIndex]?.answer,
                                                userAns: finalUserAnswer,
                                                feedback: jsonFeedbackResp.feedback,
                                                rating: jsonFeedbackResp.rating,
                                                userEmail: user?.primaryEmailAddress?.emailAddress,
                                                createdAt: moment().format("DD-MM-YYYY"),
                                            },
                                        ]);

            if (error) {
                console.error("Insert failed:", error);
            } else {
                console.log("Inserted successfully");
            }
            
            setLoading(false);
        } catch (error) {
            console.error("Error fetching feedback:", error);
        }
    }

    return (
        <div className='flex items-center justify-center flex-col'>
            <div className='flex flex-cols justify-center items-center rounded-lg p-5 my-20 mt-20'>
                <img src={'/webcam.jpg'} width={200} height={200} className='absolute' alt='webcam' />
                <Webcam
                    mirrored
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10
                    }}
                />
            </div>
            <Button variant="outline" disabled={loading} className="my-10" onClick={toggleRecord}>
                {isRecording ?
                    <h2 className='flex justify-center items-center text-red-600'>
                        <Mic /> Stop Recording...
                    </h2>
                    :
                    'Record Answer'}
            </Button>
        </div>
    );
}

export default RecordAnswerSection;
