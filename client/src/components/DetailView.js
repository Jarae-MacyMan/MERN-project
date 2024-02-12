// DetailView.js
import { useParams, Link } from "react-router-dom";

const DetailView = ({ people }) => {
  const { personId } = useParams();

  // Check if 'people' is an array and 'personId' is a valid index
  if (!Array.isArray(people) || !people[personId]) {
    return <div>Person not found or invalid data</div>;
  }

  const person = people[personId];

  return (
    <div>
      <h1>{person.name}</h1>
      {/* Display more details about the person here */}
      <Link to="/">
        <button className="mt-4 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700">
          Go back to homepage
        </button>
      </Link>
    </div>
  );
};

export default DetailView;
