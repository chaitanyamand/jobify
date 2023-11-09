import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (queryClient) =>
  async ({ params }) => {
    try {
      await customFetch.delete(`/jobs/${params.id}`);
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["stats"]);
      toast.success("Job Deleted Successfully");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return redirect("/dashboard/all-jobs");
  };

const DeleteJob = () => {
  return <h1>DeleteJob Page</h1>;
};

export default DeleteJob;
