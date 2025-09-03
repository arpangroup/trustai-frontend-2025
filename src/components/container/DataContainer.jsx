import React, { useEffect, useState } from "react";
import './DataContainer.css';
import NoData from "../NoData";

const isEmptyData = (data) => {
  if (Array.isArray(data)) return data.length === 0;
  if (typeof data === 'object' && data !== null) return Object.keys(data).length === 0;
  if (typeof data === 'string') return data.trim().length === 0;
  return !data;
};

const DataContainer = ({
  fetchData,            // async function to fetch data
  renderData,           // render prop to render data
  noDataMessage = "No data available.",
  dependencies = [],    // optional dependencies for useEffect
  wrapperClass = "",    // optional styling class
  loadingComponent = null, // optional skeleton or spinner
}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await fetchData();
        setData(result ?? null);  // 💡 null fallback
      } catch (err) {
        console.error("DataFetcher error:", err);
        setError("Something went wrong while loading data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, dependencies);

  return (
    <div className={wrapperClass}>
      {/* 🔁 Dynamic or fallback loading */}
      {loading && (loadingComponent || <p className="default-loading">Loading...</p>)}
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* {!loading && !error && data.length === 0 && ( */}
      {!loading && !error && isEmptyData(data) &&  (
        <NoData message={noDataMessage} />
      )}
      
      {/* {!loading && !error && data.length > 0 && renderData(data)} */}
      {!loading && !error && !isEmptyData(data) && renderData(data)}
    </div>
  );
};

export default DataContainer;
