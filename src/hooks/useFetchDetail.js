import axios from "axios";
import { useEffect, useState } from "react";

const useFetchDetail = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setLoading(false);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    loading,
  };
};

export default useFetchDetail;
