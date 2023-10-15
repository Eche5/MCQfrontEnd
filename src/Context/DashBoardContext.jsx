import { createContext, useContext, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { Outlet } from "react-router-dom";
const DashboardContext = createContext();
const DashboardProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const fetchResults = async (id, course) => {
    const RESULT_URL = `/${id}/${course}`;
    setIsLoading(true);
    const response = await axiosPrivate.get(RESULT_URL, {
      withCredentials: true,
    });
    const data = response.data;

    if (response.status === 200) {
      setResults(data);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  };

  return (
    <DashboardContext.Provider value={{ results, fetchResults, isLoading }}>
      <Outlet />
    </DashboardContext.Provider>
  );
};

const useResult = () => {
  const context = useContext(DashboardContext);
  return context;
};
export { useResult, DashboardProvider };
