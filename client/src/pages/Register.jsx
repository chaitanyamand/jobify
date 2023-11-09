import { Form, redirect, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  try {
    await customFetch.post("/auth/register", data);
    toast.success("Registration Successful");
    return redirect("/login");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Register = () => {
  return (
    <Wrapper>
      <Form method="post" className="form">
        <Logo />
        <FormRow type="text" name="name" defaultValue=""></FormRow>
        <FormRow
          type="text"
          name="lastName"
          labelText="Last Name"
          defaultValue=""
        ></FormRow>
        <FormRow type="text" name="location" defaultValue=""></FormRow>
        <FormRow type="email" name="email" defaultValue=""></FormRow>
        <FormRow
          type="password"
          name="password1"
          labelText="Password"
          defaultValue=""
        ></FormRow>
        <FormRow
          type="password"
          name="password2"
          labelText="Re-Enter Password"
          defaultValue=""
        ></FormRow>
        <SubmitBtn />
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </Form>
    </Wrapper>
  );
};

export default Register;
