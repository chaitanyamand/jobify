import Wrapper from "../assets/wrappers/LandingPage";
import main from "../assets/images/main.svg";
import { Logo } from "../components";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>
            job <span>tracking</span> app
          </h1>
          <p>
            Your go-to platform for streamlined job application management.
            Effortlessly track monitor statuses, and enhance your career
            journey. Take control of your applications with our user-friendly
            interface. Elevate your job search experience today.
          </p>
          <Link to="/register" className="btn register-link">
            Register
          </Link>
          <Link to="/login" className="btn register-link">
            Login / Demo User
          </Link>
        </div>
        <img src={main} alt="job-hunt" className="img main-img"></img>
      </div>
    </Wrapper>
  );
};

export default Landing;
