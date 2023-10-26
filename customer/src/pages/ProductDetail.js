import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { APIPUBLIC } from "../redux/config/config";
import { useDispatch, useSelector } from "react-redux";
import { addCart, getCartUser, getProductsByCategory } from "../redux/actions";
import Title from "../components/Title";
import IconCategory from "../components/IconCategory";
import Products from "../components/Products";
import { ADD_CART, SET_ERRORS } from "../redux/actionTypes";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const store = useSelector((state) => state);
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  console.log("product", product);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [category, setCategory] = useState();
  const product_categorys = useSelector((state) => state.customer.allProduct);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getProduct();
  }, [productId]);

  useEffect(() => {
    if (category) {
      dispatch(getProductsByCategory(category));
    }
  }, [productId]);

  const getProduct = async () => {
    try {
      const res = await APIPUBLIC.get("api/product/" + productId);

      setProduct(res.data?.data);
      setCategory(res.data?.data.category);
      dispatch(getProductsByCategory(category));

      if (res.data.data.thumb) {
        setSelectedImage(res.data.data.thumb);
      }

      dispatch(getProductsByCategory(res.data.data.category));
    } catch {}
  };

  const handleClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    await dispatch(
      addCart({
        productId: product._id,
        userId: user?.userData?._id,
        quantity,
      })
    );
    dispatch(getCartUser(user?.userData?._id));
  };

  useEffect(() => {
    if (store.errors || store.customer.cartAdded) {
      if (store.customer.cartAdded) {
        dispatch({ type: SET_ERRORS, payload: {} });
        dispatch({ type: ADD_CART, payload: false });
      }
    }
  }, [store.errors, store.customer.cartAdded]);

  useEffect(() => {
    dispatch({ type: SET_ERRORS, payload: {} });
  }, []);

  const { images, thumb } = product;
  const imageArray = images || [];

  if (thumb && !imageArray.includes(thumb)) {
    imageArray.push(thumb);
  }

  return (
    <div className="bg-gray-100">
      <Header />
      <Title />
      <IconCategory />
      <div className="flex justify-center p-10">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-full max-w-xs md:max-w-2xl">
            {selectedImage && (
              <img src={selectedImage} alt="Main" className="w-[80%] h-auto" />
            )}{" "}
          </div>
          <div className="flex space-x-4">
            {product?.images &&
              imageArray.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index}`}
                  onClick={() => setSelectedImage(image)}
                  className={`object-cover w-16 h-16 border border-gray-300 cursor-pointer md:w-24 md:h-24 hover:border-blue-500 ${
                    selectedImage === image ? "border-blue-500" : ""
                  }`}
                />
              ))}
          </div>
        </div>

        <div className="w-full md:w-1/2 md:p-5">
          <h1 className="mb-2 text-4xl  text-[#333333] font-medium">
            {product.productName}
          </h1>
          <p className="p-4 mb-4  text-3xl text-[#d61c1f] font-bold">
            {product.price}đ
          </p>

          <p className="mb-4 font-base text-[#666666] font-normal">
            {product?.description?.slice(3, product?.description?.length - 4)}
          </p>
          <h1 className="font-normal text-[#666666] text-base">
            THÔNG TIN SẢN PHẨM:
          </h1>
          <div className=" font-base text-[#666666] font-normal">
            Chất liệu : {product?.material}
          </div>
          <div className=" font-base text-[#666666] font-normal">
            Kích thước: {product?.size}
          </div>
          <div className="font-base text-[#666666] font-normal">
            {product?.design}
          </div>
          <div className="font-base text-[#666666] font-normal">
            số lượng còn: {product?.quantity}
          </div>

          <div className="flex mt-4 gap-x-8">
            <input
              className="w-[100px] text-center"
              type="number"
              name=""
              min={1}
              max={10}
              id=""
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
            />
            {store.errors.message && (
              <p className="text-red-500"> {store.errors.message}</p>
            )}

            <button
              onClick={handleClick}
              className="px-6 py-3 font-medium text-red-500 bg-white border-2 border-red-500 hover:bg-gray-100"
            >
              THÊM VÀO GIỎ
            </button>
          </div>
        </div>
      </div>
      <div className="border-t-2 border-b-2">
        <h1 className="mt-3 text-xl font-semibold text-center">
          {" "}
          Những sản phẩm liên quan
        </h1>
        <Products product={product_categorys}></Products>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
