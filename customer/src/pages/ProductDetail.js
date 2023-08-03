import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { APIPUBLIC } from "../redux/config/config";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/actions";
const ProductDetail = () => {
  //

  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  // const [color, setColor] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await APIPUBLIC.get("api/product/" + productId);
        console.log("res", res);
        setProduct(res.data?.data);
      } catch {}
    };
    getProduct();
  }, [productId]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    dispatch(
      addCart({
        productId: product._id,
        userId: user?.userData?._id,
        quantity,
        color: "Black",
        price: quantity * product?.price,
      })
    );
  };

  return (
    <div className="bg-gray-100">
      <Header />
      <div className="p-10 md:flex md:justify-center">
        <div className="w-full md:w-1/2 md:p-5">
          <img
            src={product?.images?.thumb}
            alt={product.productName}
            className="object-cover w-full h-90vh md:h-40vh"
          />
        </div>
        <div className="w-full md:w-1/2 md:p-5">
          <h1 className="mb-2 text-4xl  text-[#333333] font-medium">
            {product.productName}
          </h1>
          <p className="p-4 mb-4  text-3xl text-[#d61c1f] font-bold">
            {product.price}
          </p>

          <p className="mb-4 font-base text-[#666666] font-normal">
            {product.description}
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
            {product?.feature}
          </div>
          <div className="flex items-center mt-10 mb-4 font-bold">
            <span className="font-base text-[#666666] font-normal mr-4">
              Số lượng
            </span>
            <HorizontalRuleIcon
              onClick={() => handleQuantity("dec")}
              className="cursor-pointer"
            />
            <span className="flex items-center justify-center w-8 h-8 mx-2 border border-secondary">
              {quantity}
            </span>
            <AddIcon
              onClick={() => handleQuantity("inc")}
              className="cursor-pointer"
            />
          </div>
          <button
            onClick={handleClick}
            className="px-6 py-3 font-medium text-red-500 bg-white border-2 border-red-500 hover:bg-gray-100"
          >
            THÊM VÀO GIỎ
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
