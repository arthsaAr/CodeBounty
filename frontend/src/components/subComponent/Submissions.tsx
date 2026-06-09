import Submission from "../hunter/dashboard/Submissions";

type SubmissionsProps = {
  clickedID?: number | null;
  submitClicked: number;
}

const Submissions = ({ clickedID, submitClicked }: SubmissionsProps) => {
  return (
    <div className="w-full h-full mt-2 rounded-xl p-6 border border-[#1f2937] bg-[#0d1117] overflow-hidden">
        <h1 className='text-white font-semibold text-lg'>Submissions({submitClicked})</h1>

        <div className='mt-2 w-fullcursor-pointer'>
            <Submission
                requestPage="bountyDetails"
                clickedID={clickedID}
                submitClicked={submitClicked}
            />
        </div>
    </div>
  )
}

export default Submissions