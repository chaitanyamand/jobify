import { Outlet, useLoaderData, redirect, useNavigate } from "react-router-dom";
import Wrapper from "../assets/wrappers/Dashboard";
import { BigSideBar, Navbar, SmallSideBar } from "../components";
import { createContext, useState } from "react";
import { checkDefaultTheme } from "../App";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const DashBoardContext = createContext();
export const loader = async () => {
  try {
    const { data } = await customFetch.get("/users/current-user");
    return data;
  } catch (error) {
    return redirect("/");
  }
};
const DashboardLayout = () => {
  const { user } = useLoaderData();
  const navigate = useNavigate();

  const [showSideBar, setShowSideBar] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(checkDefaultTheme);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    document.body.classList.toggle("dark-theme", newDarkTheme);
    localStorage.setItem("darkTheme", newDarkTheme);
  };

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const logoutUser = async () => {
    navigate("/");
    await customFetch.get("/auth/logout");
    toast("Logging out");
  };

  return (
    <DashBoardContext.Provider
      value={{
        user,
        showSideBar,
        isDarkTheme,
        toggleDarkTheme,
        toggleSideBar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <Navbar />
            <div className="dashboard-page">
              <Outlet context={{ user }} />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashBoardContext.Provider>
  );
};

export default DashboardLayout;
