import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../utils/Spinner";
import CAMELIA from "./logo.png";
import ECLLIPSE from "./ellipse.png";
import { ADD_USER, SET_ERRORS } from "../redux/actionTypes";
import { addUser } from "../redux/actions";

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [adress, setAdress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});

  useEffect(() => {
    if (store.errors) {
      setError(store.errors);
    }
  }, [store.errors]);

  const signup = (e) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      addUser({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        adress: adress,
      })
    );
  };
  useEffect(() => {
    if (store.errors) {
      setLoading(false);
      setEmail("");
      setPassword("");
      setAdress("");
      setEmail("");
      setError("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setPhoneNumber("");
    }
  }, [store.errors]);
  useEffect(() => {
    if (store.errors || store.customer.userAdded) {
      setLoading(false);
      if (store.customer.userAdded) {
        setAdress("");
        setEmail("");
        setError("");
        setFirstName("");
        setLastName("");
        setPassword("");
        setPhoneNumber("");

        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_USER, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.customer.userAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);
  return (
    <div className="relative w-full min-h-screen p-10 bg-lite dark:bg-dark isolate">
      <img
        src={ECLLIPSE}
        alt="bg"
        className="hidden lg:block pointer-events-none absolute bottom-0 left-0 right-0 z-[-1]"
      />
      <Link to="/" className="inline-block mb-5 lg:mb-10">
        <img src={CAMELIA} alt="camelia" className="h-12" />
      </Link>

      <div className="w-full max-w-[556px] bg-white dark:bg-darkSecondary rounded-xl px-5 py-8 lg:px-16 lg:py-12 mx-auto shadow-2xl ">
        <h1 className="mb-1 text-lg font-semibold text-center lg:mb-3 lg:text-xl lg: text-text1 dark:text-white">
          Sign Up
        </h1>
        <p className="mb-6 text-xs font-normal text-center lg:text-sm text-text3 lg:mb-8">
          Already have an account?{" "}
          <Link to="/login" className="font-medium underline text-secondary">
            Login
          </Link>
        </p>

        <form
          onSubmit={signup}
          className="flex flex-col items-center justify-center w-full space-y-6 duration-1000 bg-white"
        >
          <div className="flex flex-col w-full h-full mb-4 lg:mb-5 gap-y-2 lg:gap-x-3">
            <label className="self-start inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text3">
              Họ *
            </label>
            <div className="flex items-center w-full bg-white rounded-lg ">
              <input
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                name="ten"
                type="text"
                required
                className="w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
                placeholder="Vũ Thị Hồng"
              />
            </div>
          </div>
          <div className="flex flex-col w-full h-full mb-4 lg:mb-5 gap-y-2 lg:gap-x-3">
            <label className="self-start inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text3">
              Tên *
            </label>
            <div className="flex items-center w-full bg-white rounded-lg ">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                name="ten"
                type="text"
                required
                className="w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
                placeholder="Oanh"
              />
            </div>
          </div>
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
                className="w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
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
                className="relative w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
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
          </div>
          <div className="flex flex-col w-full h-full mb-4 lg:mb-5 gap-y-2 lg:gap-x-3">
            <label className="self-start inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text3">
              Số điện thoại *
            </label>
            <div className="flex items-center w-full bg-white rounded-lg ">
              <input
                onChange={(e) => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                name="sodienthoai"
                type="number"
                required
                className="w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
                placeholder="0961319366"
              />
            </div>
          </div>
          <div className="flex flex-col w-full h-full mb-4 lg:mb-5 gap-y-2 lg:gap-x-3">
            <label className="self-start inline-block text-sm font-medium cursor-pointer text-text2 dark:text-text3">
              Địa chỉ *
            </label>
            <div className="flex items-center w-full bg-white rounded-lg ">
              <input
                onChange={(e) => setAdress(e.target.value)}
                value={adress}
                name="adress"
                type="text"
                required
                className="w-full px-6 py-4 text-sm font-medium bg-transparent border focus:border-[#157572] focus:ring-secondary focus:outline-none focus:ring focus:ring-opacity-40  rounded-xl placeholder:text-text4 dark:placeholder:text-text2 dark:text-white border-strock text-text1 dark:border-darkStroke"
                placeholder="97 Man Thiện"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center p-4 text-base font-semibold rounded-xl min-h-[56px] bg-secondary text-white w-full"
          >
            Create my account
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

export default SignUpPage;
