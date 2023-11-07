import Wrapper from "../assets/wrappers/BigSidebar";
import NavLinks from "./NavLinks";
import Logo from "./Logo";
import { DashBoardContext } from "../pages/DashboardLayout";
import { useContext } from "react";
const BigSideBar = () => {
  const { showSideBar } = useContext(DashBoardContext);

  return (
    <Wrapper>
      <div
        className={
          showSideBar ? "sidebar-container" : "sidebar-container show-sidebar "
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  );
};
export default BigSideBar;
