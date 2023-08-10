import { useDispatch, useSelector } from "react-redux";
import * as classes from "../utils/styles";
import React, { useEffect, useState } from "react";
import { Resetpassword } from "../redux/actions";
import { RESET_PASSWORD, SET_ERRORS } from "../redux/actionTypes";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const token = useParams();
  console.log("tolen", token);
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [error, setError] = useState({});
  console.log("error", error);
  const [value, setValue] = useState({
    password: "",
    token: token.token,
  });

  console.log("value", value);
  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    dispatch(
      Resetpassword(value.password, {
        password: value.password,
        token: value.token,
      })
    );
  };

  useEffect(() => {
    if (store.errors || store.customer.resetpassword) {
      if (store.customer.resetpassword) {
        setValue({
          password: "",
          token: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: RESET_PASSWORD, payload: false });
      }
    } else {
    }
  }, [store.errors, store.customer.resetpassword]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="mx-5 mt-3 item-center">
      <div className="space-y-3">
        <div className="flex flex-col">
          <h1 className="mt-5 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block ">
            ĐỔI MẬT KHẨU
          </h1>
        </div>
        <div className="flex flex-col bg-white rounded-xl">
          <form
            className="w-full min-h-[300px] py-9 px-7 text-center bg-white border rounded-md  shadow-2xl mx-auto"
            onSubmit={handleSubmit}
          >
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>
                Mật khẩu mới của bạn của bạn*:
              </h1>
              <input
                required
                className={classes.InputStyle}
                type="text"
                value={value.password}
                onChange={(e) =>
                  setValue({ ...value, password: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                Gởi
              </button>
              <Link to="/login">
                <button
                  onClick={() => {
                    setValue({
                      password: "",
                      token: "",
                    });
                    setError({});
                  }}
                  className={classes.adminFormClearButton}
                  type="button"
                >
                  Trang Chủ
                </button>
              </Link>
            </div>
            {error.mes ? <p className="text-red-500">{error.mes}</p> : null}
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResetPassword;
