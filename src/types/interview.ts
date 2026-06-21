export interface Interview {
    id: number;
    mockId: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdAt: string;
    createdBy: string;
    jsonMockResp: string;
}

export interface Question {
    question: string;
    answer: string;
}
  
export interface FeedbackItem {
    id: number;
    createdAt: string;
    mockIdRef: string;
    question: string;
    correctAns: string;
    userAns: string;
    feedback: string;
    rating: string;
    userEmail: string | null;
}