import Logo from "../assets/logo.png";
import { BallTriangle } from "react-loader-spinner";

const LazyLoading = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[100vh] w-[100vw] gap-5">
      <div className="flex justify-center">
        <BallTriangle
          height={50}
          width={50}
          radius={5}
          color="#4fa94d"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
      <div className="w-90 px-7 md:w-72">
        <img src={Logo} alt="logo" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default LazyLoading;
