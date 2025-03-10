import React, { useEffect, useState } from "react";

const BASE_URL = "https://api.bls.gov/publicAPI/v1/timeseries/data/";
const BLS_API_KEY = "APIKEY";
const SERIES_ID = "CEU0800000003";

const BLSOccupationData: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}${SERIES_ID}?startyear=2020&endyear=2022&registrationkey=${BLS_API_KEY}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>BLS Occupational Employment Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default BLSOccupationData;
