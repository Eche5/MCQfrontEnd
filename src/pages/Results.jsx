import { useResult } from "../Context/DashBoardContext";

function Results() {
  const { results } = useResult();
  const noTest = results?.userResults?.length < 1;
  return (
    <div className="results">
      <h2>Previous Results</h2>
      {!noTest && (
        <ul>
          {results?.userResults?.map((result) => (
            <li key={result._id}>{result.score}</li>
          ))}
        </ul>
      )}
      {noTest && <p>No test taken for this course</p>}
    </div>
  );
}

export default Results;
