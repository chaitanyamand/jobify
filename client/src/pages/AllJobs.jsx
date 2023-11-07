import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import customFetch from "../utils/customFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";

export const loader = async ({ request }) => {
  const params = Object.fromEntries([
    ...new URL(request.url).searchParams.entries(),
  ]);
  try {
    const { data } = await customFetch.get("/jobs", { params });
    return { data, searchValues: { ...params } };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

export const AllJobsContext = createContext();

const AllJobs = () => {
  const { data, searchValues } = useLoaderData();
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer></SearchContainer>
      <JobsContainer></JobsContainer>
    </AllJobsContext.Provider>
  );
};

export default AllJobs;
