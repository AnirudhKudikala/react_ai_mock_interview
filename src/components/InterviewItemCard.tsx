import { Button } from '../components/ui/button'
import { Link } from 'react-router'
import type { Interview } from '../types/interview';

interface InterviewItemCardProps {
  interview: Interview;
}

function InterviewItemCard({interview}: InterviewItemCardProps) {
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-primary'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.jobExperience}</h2>
        <h2 className='text-xs text-gray-500'>Created At: {interview?.createdAt}</h2>
        <div className='flex justify-end mt-2 gap-5'>
            <Link to={`/interview/${interview?.mockId}/feedback`}>
                <Button size="sm" style={{backgroundColor: "#4845D2", color: "white"}} className="w-full">Feedback</Button>
            </Link>
            {/* <Link to={`/interview/${interview?.mockId}`}>
                <Button size="sm" variant='outline' className="w-full">Start</Button>
            </Link> */}
        </div>
    </div>
  )
}

export default InterviewItemCard