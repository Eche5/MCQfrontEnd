import { useNavigate, useParams } from "react-router-dom";
import { useResult } from "../Context/DashBoardContext";
import Loader from "./Loader";

function Results() {
  const navigate = useNavigate();

  const { results, isLoading } = useResult();

  const params = useParams();

  const id = params.id;

  const noTest = results?.userResults?.length < 1;

  return (
    <>
      {!isLoading && !noTest && (
        <div className="results">
          <button onClick={() => navigate(`/${id}`)}>🔙</button>
          <h2>Previous Results</h2>
          {!noTest && (
            <ul>
              {results?.userResults?.map((result) => (
                <li key={result._id}>{result.score}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {!isLoading && noTest && (
        <p className=" text-2xl font-black">No test taken for this course</p>
      )}

      {isLoading && <Loader />}
    </>
  );
}

export default Results;
