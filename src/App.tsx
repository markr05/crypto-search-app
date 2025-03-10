import { useState, useRef } from "react";
import Input from "./components/Input";
import Button from "./components/Button";
import JobResults from "./components/JobResults";
import BLSOccupationData from "./components/index";
import Dropdown from "./components/Dropdown";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";

function App() {
  const [jobResults, setJobResults] = useState(false);
  const [currentValues, setCurrentValues] = useState<{ [key: string]: string }>(
    {
      "Job Title": "",
      "Job Location": "",
      "Search Query": "Average Hourly Earnings",
    }
  );

  const [values, setValues] = useState<{ [key: string]: string }>({
    "Job Title": "",
    "Job Location": "",
    "Search Query": "Average Hourly Earnings",
  });

  const handleInputChange = (field: string, value: string) => {
    setCurrentValues((prevInputs) => ({
      ...prevInputs,
      [field]: value,
    }));
  };

  const handleButtonClick = () => {
    setValues({
      "Job Title": currentValues["Job Title"],
      "Job Location": currentValues["Job Location"],
      "Search Query": currentValues["Search Query"],
    });
    setJobResults(true);
  };

  return (
    <div className="container mt-2">
      <BLSOccupationData />
      <Input
        field="Job Title"
        value={currentValues["Job Title"]}
        onChange={handleInputChange}
      />
      <Input
        field="Job Location"
        value={currentValues["Job Location"]}
        onChange={handleInputChange}
      />
      <Dropdown
        field="Search Query"
        value={currentValues["Search Query"]}
        onChange={handleInputChange}
      />
      <Button onClick={handleButtonClick}>SEARCH</Button>
      {jobResults && (
        <JobResults
          title={values["Job Title"]}
          location={values["Job Location"]}
          query={values["Search Query"]}
        />
      )}
    </div>
  );
}

export default App;
