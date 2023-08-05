import React, { useEffect, useMemo, useState } from "react";
import ReactModal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts,
  updateProduct,
} from "../../../redux/actions/adminActions";
import { Link } from "react-router-dom";
import * as classes from "../../../utils/styles";
import Swal from "sweetalert2";
import { SET_ERRORS, UPDATE_PRODUCT } from "../../../redux/actionTypes";
import { MenuItem, Select } from "@mui/material";
import ReactSelect from "react-select";
import ReactQuill from "react-quill";
import ImageUpload from "../../../components/ImageUpload";
import { toast } from "react-toastify";
import ProductDetail from "./ProductDetail";
const modalStyles = {
  content: {
    top: "45%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
    border: "none",
    overflow: "auto",
  },
};

const Body = () => {
  const store = useSelector((state) => state);
  const products = useSelector((state) => state.admin.allProduct);
  const categories = useSelector((state) => state.admin.allCategory);
  products.sort(
    (a, b) => a.productName.charCodeAt(0) - b.productName.charCodeAt(0)
  );
  const [selectedProduct, setSelectedProduct] = useState("");
  console.log("selectedProduct", selectedProduct);
  const [error, setError] = useState({});

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  useEffect(() => {
    if (Object.keys(store.errors).length !== 0) {
      setError(store.errors);
    }
  }, [store.errors]);

  // Begin-edit

  const modules = useMemo(
    () => ({
      toolbar: [
        ["bold", "italic", "underline", "strike"],
        ["blockquote"],
        [{ header: 1 }, { header: 2 }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ],
    }),
    []
  );
  const Colors = [
    { colorName: "green", colorCode: "#FF5733" },
    { colorName: "black", colorCode: "#33FF57" },
    { colorName: "green", colorCode: "#5733FF" },
  ];

  const mhtqOptions = Colors?.map((sub) => ({
    value: sub.colorCode,
    label: sub.colorCode,
  }));

  const handleUploadSuccess = (url) => {
    setValue(() => ({
      ...value,
      thumb: url,
    }));
  };
  const handleUploadImagesSuccess = (url) => {
    setValue((prevValue) => ({
      ...prevValue,
      images: [...prevValue.images, url],
    }));
  };

  const handleUploadError = () => {
    toast.error("Error Upload!");
  };
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState(null);
  const [description, setDescription] = useState("");

  const [value, setValue] = useState({
    productName: "",
    category: "",
    material: "",
    size: "",
    design: "",
    color: [],
    images: [],
    thumb: "",
    productId: "",
  });

  const handleEditClick = (pod) => {
    setModalMode("edit");
    setSelectedProduct(pod);
    setIsModalOpen(true);
    setValue({
      productName: "",
      category: "",
      material: "",
      size: "",
      design: "",
      color: [],
      images: [],
      thumb: "",
      productId: pod._id,
    });
    setSelectedOptions(
      (pod.color || []).map((value, index) => ({
        value: value,
        label: pod[index],
      }))
    );
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedValue = {};
    if (value.productId !== "") {
      updatedValue.productId = value.productId;
    } else {
      updatedValue.productId = selectedProduct.productId;
    }
    if (value.productName !== "") {
      updatedValue.productName = value.productName;
    } else {
      updatedValue.productName = selectedProduct.productName;
    }
    if (value.category !== "") {
      updatedValue.category = value.category;
    } else {
      updatedValue.category = selectedProduct.category;
    }
    if (value.material !== "") {
      updatedValue.material = value.material;
    } else {
      updatedValue.material = selectedProduct.material;
    }
    if (value.size !== "") {
      updatedValue.size = value.size;
    } else {
      updatedValue.size = selectedProduct.size;
    }
    if (value.design !== "") {
      updatedValue.design = value.design;
    } else {
      updatedValue.design = selectedProduct.design;
    }
    if (value.color !== "") {
      updatedValue.color = value.color;
    } else {
      updatedValue.color = selectedProduct.color;
    }
    if (value.images !== "") {
      updatedValue.images = value.images;
    } else {
      updatedValue.images = selectedProduct.images;
    }
    if (value.thumb !== "") {
      updatedValue.thumb = value.thumb;
    } else {
      updatedValue.thumb = selectedProduct.thumb;
    }

    dispatch(updateProduct({ ...selectedProduct, ...updatedValue }));
    dispatch({ type: UPDATE_PRODUCT, payload: false });
  };

  useEffect(() => {
    if (store.admin.updatedProduct) {
      setError({});
      closeModal();
      dispatch(getProducts());
    }
  }, [dispatch, store.errors, store.admin.updatedProduct]);

  const handleModalError = () => {
    setError({});
    closeModal();
  };
  // End edit

  // begin view
  // const [modalMode, setModalMode] = useState(null);
  const handleOpenViewModal = (product) => {
    console.log("vô đây nè");
    setSelectedProduct(product);
    setModalMode("view");
    setIsModalOpen(true);
  };
  //end view

  // Begin delete
  // const [checkedValue, setCheckedValue] = useState([]);

  // const handleInputChange = (e) => {
  //   const value = e.target.value;
  //   const isChecked = e.target.checked;
  //   setCheckedValue((prevState) =>
  //     isChecked
  //       ? [...prevState, value]
  //       : prevState.filter((item) => item !== value)
  //   );
  // };

  // const dltSubject = (e) => {
  //   Swal.fire({
  //     title: "Bạn có chắc chắn muốn xóa?",
  //     text: "Hành động này sẽ không thể hoàn tác!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Đồng ý, Xóa!",
  //   }).then(async (result) => {
  //     if (result.isConfirmed) {
  //       dispatch(deleteDepartment(checkedValue));
  //     }
  //   });
  // };

  // useEffect(() => {
  //   if (store.admin.departmentDeleted) {
  //     setCheckedValue([]);
  //     dispatch(getAllDepartment());
  //     dispatch({ type: DELETE_DEPARTMENT, payload: false });
  //   }
  // }, [store.admin.departmentDeleted]);
  console.log("selectedProduct?.description", selectedProduct?.description);
  return (
    <div className="flex-[0.8] mt-3 mx-5 item-center">
      <div className="flex mt-4">
        <Link to="/add-product" className="btn btn-primary">
          <button
            className="items-center gap-[9px]  w-[88px] h-[40px] hover:bg-[#04605E] block py-2 font-bold text-white rounded-lg px-4 
           bg-[#157572] focus:outline-none focus:shadow-outline "
          >
            ADD
          </button>
        </Link>
        {/* {departments && checkedValue?.length > 0 ? (
          <button
            onClick={dltSubject}
            className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4  hover:bg-[#FD9999] focus:#FD9999 focus:shadow-outline"
          >
            Xóa
          </button>
        ) : (
          <button
            onClick={dltSubject}
            className="items-center  gap-[9px] mr-4 w-[88px] h-[53px] block py-2 font-bold text-[#7D1711] bg-[#FDD1D1] border border: 1.11647px solid #FD9999 rounded-lg px-4"
            disabled
          >
            Xóa
          </button>
        )} */}
      </div>
      <div className="w-full my-8 mt-6">
        {products?.length !== 0 && (
          <table className="w-full table-auto ">
            <thead className="bg-[#E1EEEE] items-center">
              <tr>
                <th className="px-4 py-1">STT</th>
                <th className="px-4 py-1">Product Name</th>
                <th className="px-4 py-1">Price</th>
                <th className="px-4 py-1">Sold</th>
                <th className="px-4 py-1">Quantity</th>
                <th className="px-4 py-1">Status</th>
                <th className="px-4 py-1">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {products?.map((product, idx) => (
                <tr
                  className="justify-center item-center hover:bg-[#EEF5F5]"
                  key={idx}
                >
                  {/* <td className="px-4 py-1 border">
                    <input
                      onChange={handleInputChange}
                      checked={checkedValue.includes(dep.id)}
                      value={dep.id}
                      type="checkbox"
                      className="accent-[#157572]"
                    />
                  </td> */}
                  <td className="px-4 py-1 text-center border ">{idx + 1}</td>

                  <td className="px-4 py-1 text-center border">
                    {product.productName}
                  </td>
                  <td className="px-4 py-1 text-center border">
                    {product.price}
                  </td>
                  <td className="px-4 py-1 text-center border">
                    {product.sold}
                  </td>
                  <td className="px-4 py-1 text-center border">
                    {product.quantity}
                  </td>
                  <td className="px-4 py-1 text-center border">
                    {product.isActive === true ? "Available" : "Discontinued"}
                  </td>
                  <td
                    className="items-center justify-center px-4 py-1 mr-0 border"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <button
                      className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base mr-2"
                      onClick={() => handleOpenViewModal(product)}
                    >
                      View
                    </button>
                    {modalMode === "view" && (
                      <ProductDetail
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        product={selectedProduct}
                      />
                    )}
                    <button
                      className="px-3.5 py-1 font-bold text-white rounded hover:bg-[#04605E] bg-[#157572] focus:outline-none focus:shadow-outline text-base"
                      onClick={() => handleEditClick(product)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* modal edit */}
      {selectedProduct && modalMode === "edit" ? (
        <ReactModal
          isOpen={isModalOpen}
          onRequestClose={openModal}
          style={modalStyles}
          ariaHideApp={false}
        >
          <div className="flex flex-col mx-5 mt-10 rounded-xl">
            <form
              className="w-[1450px] min-h-[600px] py-5 px-7 text-center bg-[#fff] border rounded-md  shadow-md mx-auto"
              onSubmit={handleFormSubmit}
            >
              <div className="grid grid-cols-3 gap-x-10">
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Product Name :</h1>
                  <input
                    placeholder={selectedProduct?.productName}
                    className={classes.InputStyle}
                    type="text"
                    value={value.productName}
                    onChange={(e) =>
                      setValue({
                        ...value,
                        productName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Category *:</h1>
                  <Select
                    required
                    displayEmpty
                    placeholder={value.category || selectedProduct?.category}
                    sx={{ height: 36 }}
                    inputProps={{ "aria-label": "Without label" }}
                    value={value.category || selectedProduct?.category}
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
                  <h1 className={classes.LabelStyle}>Material *:</h1>

                  <input
                    placeholder="material"
                    required
                    className={classes.InputStyle}
                    type="text"
                    value={value.material || selectedProduct.material}
                    onChange={(e) =>
                      setValue({ ...value, material: e.target.value })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Size *:</h1>

                  <input
                    placeholder="Size"
                    required
                    className={classes.InputStyle}
                    type="text"
                    value={value.size || selectedProduct.size}
                    onChange={(e) =>
                      setValue({ ...value, size: e.target.value })
                    }
                  />
                </div>
                <div className={classes.WrapInputLabel}>
                  <h1 className={classes.LabelStyle}>Design *:</h1>

                  <input
                    placeholder="Design"
                    required
                    className={classes.InputStyle}
                    type="text"
                    value={value.design || selectedProduct.design}
                    onChange={(e) =>
                      setValue({ ...value, design: e.target.value })
                    }
                  />
                </div>

                <div>
                  <div className={classes.WrapInputLabel}>
                    <h1 className={classes.LabelStyle}>Color *:</h1>
                    <ReactSelect
                      isMulti
                      displayEmpty
                      name="values"
                      options={mhtqOptions}
                      value={selectedOptions}
                      onChange={(selectedOptions) => {
                        setSelectedOptions(selectedOptions);
                        const selectedValues = selectedOptions.map(
                          (option) => option.value
                        );
                        setValue((prevValue) => ({
                          ...prevValue,
                          color: [...selectedValues],
                        }));
                      }}
                      classNamePrefix="select"
                      components={{
                        Option: ColorOption,
                      }}
                      formatOptionLabel={(option) => (
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <ColorOption label={option.value} />
                        </div>
                      )}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h1 className={classes.LabelStyle}>Description *:</h1>
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={
                    description ||
                    selectedProduct?.description.slice(
                      3,
                      selectedProduct?.description.length - 4
                    )
                  }
                  onChange={setDescription}
                />
              </div>
              <div class="flex items-center mt-10 gap-x-6">
                <div class="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 aspect-w-1 aspect-h-1">
                  <img
                    src={value?.thumb || selectedProduct.thumb}
                    alt=""
                    class="object-cover w-full h-full"
                  />
                </div>
                <div class="flex flex-col gap-y-5">
                  <h1 class="pb-2 text-sm font-medium text-left">thumbnail:</h1>

                  <ImageUpload
                    onUploadSuccess={handleUploadSuccess}
                    onUploadError={handleUploadError}
                  />
                </div>
                <div class="flex items-center  gap-x-6 ml-5">
                  <div class="flex  gap-x-3">
                    {(value.images.length > 0
                      ? value.images
                      : selectedProduct.images
                    ).map((imageUrl, index) => (
                      <div
                        key={index}
                        class="w-[180px] h-[180px] bg-[#DDDEEE] bg-opacity-50 aspect-w-1 aspect-h-1"
                      >
                        <img
                          src={imageUrl}
                          alt=""
                          class="object-cover w-full h-full"
                        />
                      </div>
                    ))}
                  </div>
                  <div class="flex flex-col gap-y-5">
                    <h1 class="pb-2 text-sm font-medium text-left">Images:</h1>

                    <ImageUpload
                      onUploadSuccess={handleUploadImagesSuccess}
                      onUploadError={handleUploadError}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center mt-5 space-x-6">
                <button className={classes.adminFormSubmitButton} type="submit">
                  Lưu
                </button>

                <button
                  className={classes.adminFormClearButton}
                  type="button"
                  onClick={() => handleModalError()}
                >
                  Thoát
                </button>
              </div>
              <div className="mt-5">
                {error?.message ? (
                  <p className="text-red-500">{error?.message}</p>
                ) : null}
              </div>
            </form>
          </div>
        </ReactModal>
      ) : null}
    </div>
  );
};
export default Body;

const ColorOption = ({ innerProps, label }) => (
  <div
    {...innerProps}
    style={{
      backgroundColor: label,
      width: "20px",
      height: "20px",
      marginRight: "5px",
    }}
  />
);
