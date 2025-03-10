import { useState } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import JobResults from "./components/JobResults";
import BLSOccupationData from "./components/index";
import Dropdown from "./components/Dropdown";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    "Job Title": "",
    "Job Location": "",
    "Search Query": "Average Hourly Earnings",
  });

  const [jobResults, setJobResults] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [field]: value,
    }));
  };

  const handleButtonClick = () => {
    setJobResults(true);
  };

  return (
    <div className="container mt-2">
      <Input
        field="Job Title"
        value={inputs["Job Title"]}
        onChange={handleInputChange}
      />
      <Input
        field="Job Location"
        value={inputs["Job Location"]}
        onChange={handleInputChange}
      />
      <Dropdown
        field="Search Query"
        value={inputs["Search Query"]}
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick}>SEARCH</Button>
      {jobResults && (
        <JobResults
          title={inputs["Job Title"]}
          location={inputs["Job Location"]}
          query={inputs["Search Query"]}
        />
      )}
    </div>
  );
}

export default App;
