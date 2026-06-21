import { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from  "../components/ui/collapsible";
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '../components/ui/button'
import { useNavigate, useParams } from 'react-router';
import { supabase } from '../utils/supabase';

function Feedback() {
    const [feedbackList, setFeedbackList] = useState([]);
    const navigate = useNavigate();
    const params = useParams();

    const averageRating = feedbackList.length > 0
                            ? (
                                feedbackList.reduce(
                                (sum, item) => sum + Number(item.rating),
                                0
                                ) / feedbackList.length
                            ).toFixed(1) : 0;

    useEffect(() => {
        getFeedback();
    }, [])

    const getFeedback = async() => {
        const { data, error } = await supabase
                                    .from("userAnswer")
                                    .select("*")
                                    .eq("mockIdRef", params.interviewId)
                                    .order("id", { ascending: true });

        if (error) {
            console.error(error);
        } else {
            console.log(data);
        }
        setFeedbackList(data);
    }

    return (
        <div className='p-10'>
            {feedbackList?.length === 0 ? <h2 className='font-bold text-xl text-gray-500'>No interview record found</h2> :
                (<>
                    <h2 className='text-3xl font-bold text-green-500'>Congratulations!</h2>
                    <h2 className='text-2xl font-bold'>Here is your interview feedback</h2>
                    <h2 className='text-primary text-lg my-3'>
                    Your overall interview rating: <strong>{averageRating}/10</strong>
                    </h2>
                    <h2 className='text-sm text-gray-500'>Find the correct answers for the interview questions</h2>
                    {feedbackList?.map((item, index) => (
                        <Collapsible key={index} className='my-8'>
                            <CollapsibleTrigger className='p-2 bg-secondary rounded-lg my-2 text-left flex justify-between gap-4 w-full'>
                                {item?.question} <ChevronsUpDown />
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-red-500 p-2 border rounded-lg'><strong>Rating: </strong>{item?.rating}</h2>
                                <h2 className='p-2 border rounded-lg bg-red-50 text-sm text-red-900'><strong>Your Answer: </strong>{item?.userAns}</h2>
                                <h2 className='p-2 border rounded-lg bg-green-50 text-sm text-green-900'><strong>Correct Answer: </strong>{item?.correctAns}</h2>
                                <h2 className='p-2 border rounded-lg bg-blue-50 text-sm text-primary'><strong>Feedback: </strong>{item?.feedback}</h2>
                            </div>
                            </CollapsibleContent>
                        </Collapsible>
                    ))}
                </>
            )}
            <Button onClick={() => navigate('/', {replace: true})}>Go Home</Button>
        </div>
    )
}

export default Feedback