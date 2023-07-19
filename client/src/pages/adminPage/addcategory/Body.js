import { ADD_CATEGORY, SET_ERRORS } from "../../../redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import React, { useEffect, useState } from "react";
import Spinner from "../../../utils/Spinner";
import { addCategory } from "../../../redux/actions/adminActions";
import CategoryIcon from "@mui/icons-material/Category";

const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [value, setValue] = useState({
    categoryName: "",
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
    dispatch(addCategory(value));
  };

  useEffect(() => {
    if (store.errors || store.admin.categoryAdded) {
      setLoading(false);
      if (store.admin.categoryAdded) {
        setValue({
          categoryName: "",
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_CATEGORY, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.categoryAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  return (
    <div className="mx-5 mt-3 item-center">
      <div className="space-y-3">
        <h1 className="p-2 px-14 bg-text4 bg-opacity-5 rounded-xl font-bold text-[25px] inline-block ">
          Create a Category
          <CategoryIcon />
        </h1>
        <div className="flex flex-col bg-white rounded-xl">
          <form
            className="w-full min-h-[300px] py-9 px-7 text-center bg-white border rounded-md  shadow-2xl mx-auto"
            onSubmit={handleSubmit}
          >
            <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Category Name*:</h1>
              <input
                placeholder="Category Name"
                required
                className={classes.InputStyle}
                type="text"
                value={value.categoryName}
                onChange={(e) =>
                  setValue({ ...value, categoryName: e.target.value })
                }
              />
            </div>
            <div className="flex items-center justify-center mt-10 space-x-6">
              <button className={classes.adminFormSubmitButton} type="submit">
                Submit
              </button>
              <button
                onClick={() => {
                  setValue({
                    categoryName: "",
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
                  message="Đang thêm category..."
                  height={30}
                  width={150}
                  color="#157572"
                  messageColor="#157572"
                />
              )}
              {error.message ? (
                <p className="text-red-500">{error.message}</p>
              ) : null}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Body;
