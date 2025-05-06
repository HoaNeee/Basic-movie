import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const language = useSelector((state) => state.movies.language);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url, {
        params: {
          language: language,
        },
      });
      setLoading(false);
      setData(response.data.results);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
    return () => null;
  }, [url, language]);

  return {
    data,
    loading,
  };
};

export default useFetch;
