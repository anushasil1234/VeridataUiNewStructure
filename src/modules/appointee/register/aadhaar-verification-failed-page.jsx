import { useParams, useNavigate } from "react-router-dom";

const AadhaarFailure = () => {
  const { appointeeId } = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <h2>Error Fetching Aadhaar Details</h2>
      <p>There was an issue while verifying your Aadhaar. Please try again later.</p>
      {/* <button onClick={() => navigate(`/appointeeregister/${appointeeId}`)}>Go Back</button> */}
    </div>
  );
};

export default AadhaarFailure;

