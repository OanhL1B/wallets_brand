import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { publicRequest } from "../redux/api";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/product/" + productId);
        console.log("res", res);
        setProduct(res.data?.productData);
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
    // dispatch(addProduct({ ...product, quantity, color, size }));
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
          <h1 className="mb-2 text-4xl font-light">{product.productName}</h1>
          <p className="mb-4">{product.description}</p>
          <p className="mb-4 text-3xl font-light">${product.price}</p>
          <div className="flex items-center justify-between mb-4"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center font-bold">
            <HorizontalRuleIcon
              onClick={() => handleQuantity("dec")}
              className="cursor-pointer"
            />
            <span className="flex items-center justify-center w-8 h-8 mx-2 border border-teal-500">
              {quantity}
            </span>
            <AddIcon
              onClick={() => handleQuantity("inc")}
              className="cursor-pointer"
            />
          </div>
          <button
            onClick={handleClick}
            className="px-6 py-3 font-medium bg-white border-2 border-teal-500 hover:bg-gray-100"
          >
            ADD TO CART
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProductDetail;
