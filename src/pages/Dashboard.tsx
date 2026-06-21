import AddNewInterview from "../components/AddNewInterview";
import InterviewList from "../components/InterviewList";
import DashboardLayout from "../layouts/DashboardLayout";

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className='p-10'>
        <h2 className='font-bold text-2xl'>Dashboard</h2>
        <h2 className='text-gray-500'>Create and Start your AI mock interview</h2>
        <div className='grid grid-cols-1 md:grid-cols-3 my-5'>
          <AddNewInterview />
        </div>
        <InterviewList />
    </div>
    </DashboardLayout>
  )
}
