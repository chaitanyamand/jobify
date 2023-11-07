import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import Wrapper from "../assets/wrappers/ThemeToggle";
import { DashBoardContext } from "../pages/DashboardLayout";
import { useContext } from "react";
const ThemeToggle = () => {
  const { isDarkTheme, toggleDarkTheme } = useContext(DashBoardContext);
  return (
    <Wrapper onClick={toggleDarkTheme}>
      {isDarkTheme ? <BsFillSunFill /> : <BsFillMoonFill />}
    </Wrapper>
  );
};

export default ThemeToggle;
