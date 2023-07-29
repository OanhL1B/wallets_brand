import { Link } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Product = ({ item }) => {
  return (
    <div className="relative flex items-center justify-center flex-1 m-5 bg-blue-100 min-w-280 h-350">
      <div className="absolute bg-white rounded-full w-200 h-200"></div>
      <img className="h-3/4 z-2" src={item.images.thumb} alt="Product" />
      <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full transition-all duration-500 bg-black opacity-0 cursor-pointer bg-opacity-20 z-3 group-hover:opacity-100">
        <div className="flex items-center justify-center w-40 h-40 m-10 transition-all duration-500 transform rounded-full bg-red group-hover:scale-110">
          <ShoppingCartIcon />
        </div>
        <div className="flex items-center justify-center w-40 h-40 m-10 transition-all duration-500 transform rounded-full bg-red group-hover:scale-110">
          <Link to={`/product/${item._id}`}>
            <SearchIcon />
          </Link>
        </div>
        <div className="flex items-center justify-center w-40 h-40 m-10 transition-all duration-500 transform bg-white rounded-full group-hover:scale-110">
          <FavoriteBorderIcon />
        </div>
      </div>
    </div>
  );
};

export default Product;
