import React, { useEffect, useState } from "react";
import './DataContainer.css';
import NoData from "../NoData"; // path to your NoData component
import OrderCardSkeleton from "../cards/orderCard/skeleton/OrderCardSkeleton";
import { SkeletonTheme } from "react-loading-skeleton";

const DataContainer = ({
  fetchData,            // async function to fetch data
  renderData,           // render prop to render data
  noDataMessage = "No data available.",
  dependencies = [],    // optional dependencies for useEffect
  wrapperClass = "",    // optional styling class
  loadingComponent = null, // optional skeleton or spinner
}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await fetchData();
        setData(result || []);
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

      {!loading && !error && data.length === 0 && (
        <NoData message={noDataMessage} />
      )}
      
      {!loading && !error && data.length > 0 && renderData(data)}
    </div>
  );
};

export default DataContainer;
