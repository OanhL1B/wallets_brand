const Footer = () => {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col flex-1 p-4">
        <h1 className="text-3xl font-bold">CAMELIA</h1>
        <p className="my-4">
          Camelia puts its heart and soul into every product, giving people
          minimalism from the smallest things
        </p>
        <div className="flex">
          <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-500 rounded-full">
            {/* <FacebookIcon style={{ color: "white" }} /> */}
          </div>
          <div className="flex items-center justify-center w-10 h-10 mr-4 bg-pink-500 rounded-full">
            {/* <InstagramIcon style={{ color: "white" }} /> */}
          </div>
          <div className="flex items-center justify-center w-10 h-10 mr-4 bg-blue-400 rounded-full">
            {/* <TwitterIcon style={{ color: "white" }} /> */}
          </div>
          <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full">
            {/* <PinterestIcon style={{ color: "white" }} /> */}
          </div>
        </div>
      </div>
      <div className="flex-1 hidden p-4 md:block">
        <h3 className="mb-6 text-xl font-bold">Useful Links</h3>
        <ul className="flex flex-wrap list-none">
          <li className="w-1/2 mb-2">Home</li>
          <li className="w-1/2 mb-2">Cart</li>
          <li className="w-1/2 mb-2">Backpacks</li>
          <li className="w-1/2 mb-2">WALLETS</li>
          <li className="w-1/2 mb-2">TOTE & ACCESSORIES</li>
          <li className="w-1/2 mb-2">My Account</li>
        </ul>
      </div>
      <div className="flex-1 p-4 md:bg-pink-50">
        <h3 className="mb-6 text-xl font-bold">Contact</h3>
        <div className="flex mb-4">
          {/* <RoomIcon style={{ marginRight: "10px" }} /> */}
          <p>97 Man Thiện Hiệp Phú TP Thủ Đức TPHCM</p>
        </div>
        <div className="flex mb-4">
          {/* <PhoneIcon style={{ marginRight: "10px" }} /> */}
          <p>0961319365</p>
        </div>
        <div className="flex">
          {/* <MailOutlineIcon style={{ marginRight: "10px" }} /> */}
          <p>vuthihongoanh1903@gamil.com</p>
        </div>
        {/* <img className="w-1/2" src="https://i.ibb.co/Qfvn4z6/payment.png" alt="Payment" /> */}
      </div>
    </div>
  );
};

export default Footer;
