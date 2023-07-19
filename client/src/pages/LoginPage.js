import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/actions/loginActions";
import Spinner from "../utils/Spinner";
import { Link, useNavigate } from "react-router-dom";
import CAMELIA from "./logo.png";
import ECLLIPSE from "./ellipse.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
  }, [store.errors]);

  const login = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(userLogin({ email: email, password: password }, navigate));
  };
  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  }, [store.errors]);

  return (
    <div className="relative w-full min-h-screen p-10 bg-lite dark:bg-dark isolate">
      <img
        src={ECLLIPSE}
        alt="bg"
        className="hidden lg:block pointer-events-none absolute bottom-0 left-0 right-0 z-[-1]"
      />
      <Link to="/" className="inline-block mb-5 lg:mb-16">
        <img srcSet={CAMELIA} alt="camelia" className="h-12" />
      </Link>

      <div className="w-full max-w-[556px] bg-white dark:bg-darkSecondary rounded-xl px-5 py-8 lg:px-16 lg:py-12 mx-auto ">
        <h1 className="mb-1 text-lg font-semibold text-center lg:mb-3 lg:text-xl lg: text-text1 dark:text-white">
          Welcome Back
        </h1>
        <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
          Don't have an account?{" "}
          <Link to="/sign-up" className="font-medium underline text-primary">
            Sign up
          </Link>
        </p>
        <form
          onSubmit={login}
          className="flex flex-col items-center justify-center w-full space-y-6 duration-1000 bg-white"
        >
          <div className="flex flex-col w-full h-full mb-4 lg:mb-5 gap-y-2 lg:gap-x-3">
            <label className="self-start inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text3">
              Email *
            </label>
            <div className="flex items-center w-full bg-white rounded-lg ">
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
                type="email"
                required
                className="w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          <div className="flex flex-col w-full h-full mb-4 lg:mb-5 gap-y-2 lg:gap-x-3">
            <label
              htmlFor="password"
              className="self-start inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text3"
            >
              Password *
            </label>

            <div className="flex items-center w-full bg-white rounded-lg">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
                name="password"
                type={showPassword ? "text" : "password"}
                className="relative w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-primary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
                placeholder="Enter your password"
              />
              <div className="absolute ml-[384px] mt-2">
                {showPassword ? (
                  <VisibilityIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    onClick={() => setShowPassword(!showPassword)}
                    className="cursor-pointer"
                  />
                )}
              </div>
            </div>
            <div className="flex flex-col mt-2 gap-y-2 lg:gap-x-3">
              <div className="text-right">
                <span className="inline-block text-sm font-medium text-primary">
                  Forgot password
                </span>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="flex items-center justify-center p-4 text-base font-semibold rounded-xl min-h-[56px] bg-primary text-white  w-full"
          >
            Sign in
          </button>

          {loading && (
            <Spinner
              message="Logging In"
              height={30}
              width={150}
              color="#ffffff"
              messageColor="#fff"
            />
          )}
          {error.message ? (
            <p className="text-red-500">{error.message}</p>
          ) : null}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;

{
  /* <div className="relative w-full h-screen p-10 bg-lite isolate">
      <img
        src="https://theme.hstatic.net/1000365849/1000614631/14/logo.png?v=142"
        alt="bg"
        className=" w-[74px] h-[74px]"
      />

      <div className="flex items-center justify-center bg-lite">
        <div>
          <form
            onSubmit={login}
            className="flex flex-col items-center justify-center space-y-6 duration-1000 bg-white shadow-2xl h-96 w-96 rounded-3xl"
          >
            <h1 className="mt-2 text-3xl font-semibold text-text2">
              Đăng Nhập
            </h1>

            <div className="space-y-1">
              <label className="block text-sm font-semibold text-gray-800">
                Username
              </label>
              <div className="bg-white rounded-lg w-[16rem] flex  items-center">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  value={username}
                  name="username"
                  type="text"
                  required
                  className="block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg placeholder:text-sm focus:border-[#157572] focus:ring-[#04605E] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-800"
              >
                Password
              </label>

              <div className="bg-white rounded-lg w-[16rem] flex  items-center">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  required
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="relative block w-full px-4 py-2 mt-2 text-black bg-white border rounded-lg placeholder:text-sm focus:border-[#157572] focus:ring-[#04605E] focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Enter your password"
                />
                <div className="absolute ml-[224px] mt-2">
                  {showPassword ? (
                    <VisibilityIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setShowPassword(!showPassword)}
                      className="cursor-pointer"
                    />
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="flex items-center justify-center w-32 py-1 mb-2 text-base text-white duration-150 rounded-lg hover:scale-105 bg-primary "
            >
              Login
            </button>
            {loading && (
              <Spinner
                message="Logging In"
                height={30}
                width={150}
                color="#ffffff"
                messageColor="#fff"
              />
            )}
            {error.message ? (
              <p className="text-red-500">{error.message}</p>
            ) : null}
          </form>
        </div>
      </div>
    </div> */
}
