import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import img from "../assets/images/not-found.svg";
const Error = () => {
  const err = useRouteError();
  if (err.status == 404) {
    return (
      <Wrapper>
        <div>
          <img src={img} alt="not found" />
          <h3>Ohh! page not found</h3>
          <p>we can not seem to find the page you are looking for</p>
          <Link to="/dashboard">back home</Link>
          <br />
        </div>
      </Wrapper>
    );
  }
  console.log(err);
  return (
    <Wrapper>
      <h3>something went wrong</h3>
    </Wrapper>
  );
};

export default Error;
