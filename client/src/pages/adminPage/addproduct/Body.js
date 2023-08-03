import { ADD_PRODUCT, SET_ERRORS } from "../../../redux/actionTypes";
import { addProduct } from "../../../redux/actions/adminActions";
import ImageIcon from "@mui/icons-material/Image";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import * as classes from "../../../utils/styles";
import MenuItem from "@mui/material/MenuItem";
import React, { useEffect, useMemo, useState } from "react";
import Select from "@mui/material/Select";
import Spinner from "../../../utils/Spinner";
import ImageUpload from "../../../components/ImageUpload";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
const Body = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const categories = useSelector((state) => state.admin.allCategory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [description, setDescription] = useState("");
  console.log("description", description);
  const [value, setValue] = useState({
    productName: "",
    category: "",
    material: "",
    size: "",
    design: "",
    color: "",
    images: {
      thumb: "",
      ortherimg: [],
    },
  });

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
      setValue({ ...value });
    }
  }, [store.errors]);

  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      images: url,
    }));
  };

  const handleUploadError = () => {
    toast.error("Thêm ảnh không thành công!");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError({});
    setLoading(true);

    dispatch(addProduct({ ...value, description }));
  };

  useEffect(() => {
    if (store.errors || store.admin.productAdded) {
      setLoading(false);
      if (store.admin.productAdded) {
        setValue({
          productName: "",
          category: "",
          material: "",
          size: "",
          design: "",
          color: "",
          images: {
            thumb: "",
            ortherimg: [],
          },
        });
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_PRODUCT, payload: false });
      }
    } else {
      setLoading(true);
    }
  }, [store.errors, store.admin.productAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ],
    }),
    []
  );
  return (
    <div className="mx-5 mt-1 item-center">
      <div className="space-y-5">
        <div className={classes.Form1}>
          <form
            className="w-full min-h-[300px] py-8 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
            onSubmit={handleSubmit}
          >
            <div className={classes.FormItem}>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Product Name *:</h1>

                <input
                  placeholder="Product Name.."
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.productName}
                  onChange={(e) =>
                    setValue({ ...value, productName: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Category *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.category}
                  onChange={(e) =>
                    setValue({ ...value, category: e.target.value })
                  }
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>
                  {categories?.map((cate, idx) => (
                    <MenuItem key={idx} value={cate._id}>
                      {cate.categoryName}
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Status *:</h1>

                <input
                  placeholder="Status"
                  required
                  className={classes.InputStyle}
                  type="Status"
                  value={value.material}
                  onChange={(e) =>
                    setValue({ ...value, material: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Price *:</h1>

                <input
                  placeholder="Price"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.material}
                  onChange={(e) =>
                    setValue({ ...value, material: e.target.value })
                  }
                />
              </div>
              <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Quantity *:</h1>

                <input
                  placeholder="Quantity"
                  required
                  className={classes.InputStyle}
                  type="number"
                  value={value.material}
                  onChange={(e) =>
                    setValue({ ...value, material: e.target.value })
                  }
                />
              </div>
              {/* <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Material *:</h1>

                <input
                  placeholder="material"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.material}
                  onChange={(e) =>
                    setValue({ ...value, material: e.target.value })
                  }
                />
              </div> */}
              {/* <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Size *:</h1>

                <input
                  placeholder="Size"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.size}
                  onChange={(e) => setValue({ ...value, size: e.target.value })}
                />
              </div> */}

              {/* <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Design *:</h1>

                <input
                  placeholder="Design"
                  required
                  className={classes.InputStyle}
                  type="text"
                  value={value.design}
                  onChange={(e) =>
                    setValue({ ...value, design: e.target.value })
                  }
                />
              </div> */}
              {/* <div className={classes.WrapInputLabel}>
                <h1 className={classes.LabelStyle}>Color *:</h1>
                <Select
                  required
                  displayEmpty
                  sx={{ height: 36 }}
                  inputProps={{ "aria-label": "Without label" }}
                  value={value.color}
                  onChange={(e) =>
                    setValue({ ...value, color: e.target.value })
                  }
                  className={`${classes.InputStyle} hover:focus:border-none `}
                >
                  <MenuItem value="">None</MenuItem>

                  <MenuItem value="Black">Black</MenuItem>
                </Select>
              </div> */}
            </div>
            {/* <div className={classes.WrapInputLabel}>
              <h1 className={classes.LabelStyle}>Description *:</h1>

              <input
                placeholder="Description"
                required
                className={classes.InputStyle}
                type="text"
                value={value.description}
                onChange={(e) =>
                  setValue({ ...value, description: e.target.value })
                }
              />
            </div> */}
            <div>
              <h1 className={classes.LabelStyle}>Description *:</h1>
              <ReactQuill
                placeholder="Write your description......"
                modules={modules}
                theme="snow"
                value={description}
                onChange={setDescription}
              />
            </div>
            <div className="flex items-center gap-x-6">
              <div className="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 ">
                <ImageIcon
                  src={value.images.thumb}
                  style={{ width: 180, height: 180 }}
                />
              </div>
              <div className="flex flex-col gap-y-5">
                <h1 className="pb-2 text-sm font-medium text-left">
                  product Image:
                </h1>
                <ImageUpload
                  onUploadSuccess={handleUploadSuccess}
                  onUploadError={handleUploadError}
                />
              </div>
            </div>
            {/* button */}
            <div className="flex gap-x-10">
              <div className={classes.WrapButton}>
                <button className={classes.adminFormSubmitButton} type="submit">
                  Gửi
                </button>
                <button
                  onClick={() => {
                    setValue({
                      productName: "",
                      category: "",
                      material: "",
                      size: "",
                      design: "",
                      color: "",
                      description: "",
                      images: {
                        thumb: "",
                        ortherimg: [],
                      },
                    });
                    setError({});
                  }}
                  className={classes.adminFormClearButton}
                  type="button"
                >
                  Xóa
                </button>
              </div>

              <div className={classes.loadingAndError}>
                {loading && (
                  <Spinner
                    message="Adding Product...."
                    height={30}
                    width={150}
                    color="#157572"
                    messageColor="157572"
                  />
                )}
                {error.message ? (
                  <p className="text-red-500">{error.message}</p>
                ) : null}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Body;
