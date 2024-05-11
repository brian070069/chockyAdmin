import React from "react";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TbLogin2 } from "react-icons/tb";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { IoIosPerson } from "react-icons/io";
import LogoIcon from "../assets/logoIcon.png";
import Logo from "../assets/logo.png";
import { AuthenticationContext } from "../Context/AuthenticationContext";

const Nav = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(
    AuthenticationContext
  );
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const toogleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    dispatch({ type: ACTION.RESTORE });
  };

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    setIsAuthenticated(true);
  });

  return (
    <div>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center py-3 px-3 lg:px-10 border-b-[1px] shadow-md bg-white max-h-20">
        <div className="w-[180px] row items-center gap-2">
          <div className="">
            <button className="lg:hidden" onClick={toogleSideBar}>
              <RxHamburgerMenu size={22} />
            </button>
            <div
              className={`fixed bg-white top-0 bottom-0 z-50 left-0 right-0 h-[100vh] px-5 transition-all duration-500 sm:hidden ${
                showSideBar ? "translate-x-0" : "-translate-x-[100%]"
              }`}
            >
              <div className="flex justify-between items-center pb-3 pt-7">
                <div className="flex items-center gap-2">
                  <span>
                    <IoIosPerson size={25} />
                  </span>

                  <div className="text-xl tracking-wide font-medium ">
                    {isAuthenticated ? (
                      <button
                        onClick={() => {
                          localStorage.clear();
                          toogleSideBar();
                          setIsAuthenticated(false);
                        }}
                      >
                        LogOut
                      </button>
                    ) : (
                      <Link to={"/"}>login</Link>
                    )}
                  </div>
                </div>
                <div>
                  <button className="flex items-center" onClick={toogleSideBar}>
                    <RxCross1 size={25} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          {isSmallScreen ? (
            <Link to={"/"} className="w-full">
              <img src={LogoIcon} alt="logo" className="w-10" />
            </Link>
          ) : (
            <img
              src={Logo}
              alt="logo"
              onClick={() => navigate("/")}
              className="w-48 cursor-pointer transition-all "
            />
          )}
        </div>

        <div className="row gap-10">
          <div className=" lg:flex">
            {isAuthenticated ? (
              <button className="tracking-wide" onClick={handleLogout}>
                LogOut
              </button>
            ) : (
              <Link to={"/login"} className="row items-center gap-1">
                <span>
                  <TbLogin2 size={22} />
                </span>
                <span className="text-md">Login</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
