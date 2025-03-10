import { useEffect, useState } from "react";

interface Props {
  BASE_URL: "https://api.bls.gov/publicAPI/v1/timeseries/data/";
  BLS_API_KEY: "APIKEY";
  SERIES_ID: "LNS14000000";
}

const BLSOccupationData = ({ BASE_URL, BLS_API_KEY, SERIES_ID }: Props) => {
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
