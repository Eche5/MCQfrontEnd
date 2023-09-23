import { createContext, useContext, useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
const DashboardContext = createContext();
const DashboardProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const fetchResults = async (id, course) => {
    const RESULT_URL = `/${id}/${course}`;

    const response = await axiosPrivate.get(RESULT_URL, {
      withCredentials: true,
    });
    const data = response.data;

    if (response.status === 200) {
      setResults(data);
    }
  };

  return (
    <DashboardContext.Provider value={{ results, fetchResults }}>
      {children}
    </DashboardContext.Provider>
  );
};

const useResult = () => {
  const context = useContext(DashboardContext);
  return context;
};
export { useResult, DashboardProvider };
