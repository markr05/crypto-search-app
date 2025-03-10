interface Props {
  title: string;
  location: string;
  query: string;
}

const JobResults = ({ title, location, query }: Props) => {
  return (
    <div className="card">
      <img src="..." className="card-img-top" alt="..." />
      <div className="card-body">
        <p className="card-text">{query} of a </p>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">in {location}</p>
        <a href="#" className="btn btn-primary">
          More Information
        </a>
      </div>
    </div>
  );
};

export default JobResults;
