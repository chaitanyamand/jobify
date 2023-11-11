import { Form, redirect, Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { Logo, FormRow, SubmitBtn } from "../components";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import axios from "axios";

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
  const fetchLocation = () => {
    const fetchBtn = document.querySelector("#fetchLoc");
    fetchBtn.disabled = true;
    fetchBtn.style.opacity = 0.5;
    fetchBtn.innerHTML = "Fetching Your Location";
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        const { data } = await axios.get(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
        );
        if (data.city && data.principalSubdivision && data.countryName) {
          document.querySelector("#location").defaultValue =
            data.city +
            ", " +
            data.principalSubdivision +
            ", " +
            data.countryName;
          fetchBtn.innerHTML = "Fetched Your Location";
        }
      },
      (error) => {
        fetchBtn.innerHTML = "Fetching Location Failed!";
        toast.error("fetching location failed");
        console.log(error);
      }
    );
  };
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
        <button
          type="button"
          id="fetchLoc"
          className="btn form-row"
          style={{ marginTop: "0" }}
          onClick={fetchLocation}
        >
          Fetch My Location
        </button>
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
