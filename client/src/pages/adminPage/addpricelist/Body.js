import { ADD_PRICELIST, SET_ERRORS } from "../../../redux/actionTypes";
import { addPriceList } from "../../../redux/actions/adminActions";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import React, { useEffect, useState } from "react";
import Spinner from "../../../utils/Spinner";
import CategoryIcon from "@mui/icons-material/Category";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    pricelistName: "",
    applyDate: "",
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);
    dispatch(addPriceList(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.pricelistAdded) {
      setLoading(false);
      if (store.admin.pricelistAdded) {
        setValue({
          pricelistName: "",
          applyDate: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_PRICELIST, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.pricelistAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="space-y-5">
        <h1 className="p-2 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block ">
          Create a PriceList
          <CategoryIcon />
        </h1>
        <div className="flex flex-col bg-white rounded-xl">
          <form
            className="w-full min-h-[300px] py-7 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-2 gap-x-10">
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>PriceList Name *:</h1>
                <input
                  placeholder="PriceList Name"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.pricelistName}
                  onChange={(e) =>
                    setValue({ ...value, pricelistName: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Apply Date *:</h1>
                <input
                  placeholder="Apply Date"
                  className={classes.InputStyle}
                  type="date"
                  value={value.applyDate}
                  onChange={(e) =>
                    setValue({ ...value, applyDate: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => {
                  setValue({
                    pricelistName: "",
                    applyDate: "",
                  });
                  setError({});
                }}
                className={classes.adminFormClearButton}
                type="button"
              >
                Clear
              </button>
            </div>
            <div className={classes.loadingAndError}>
              {loading && (
                <Spinner
                  message="Đang thêm khoa..."
                  height={30}
                  width={150}
                  color="#157572"
                  messageColor="#157572"
                />
              )}
              {error.pricelistError ? (
                <p className="text-red-500">{error.pricelistError}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Body;
