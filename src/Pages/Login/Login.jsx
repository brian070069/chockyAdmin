import { GoogleLogin } from "@react-oauth/google";
import LogoIcon from "../../assets/logo.png";
import Image from "../../assets/image1.jpg";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import InLineInputError from "../../components/InputError";
import axios from "axios";
import { LoginValidationSchema } from "./LoginValidation";

import { authUrl, socialUrl } from "../../Urls/urls";
import { AuthenticationContext } from "../../Context/AuthenticationContext";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated } = useContext(AuthenticationContext);

  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: LoginValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${authUrl}login/`, {
          email: values.email,
          password: values.password,
        });

        const data = response.data;
      
        localStorage.setItem("accessToken", data.access_token);
        localStorage.setItem("email", data.user.email);
        setIsAuthenticated(true);
        navigate("/");
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    },
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSuccess = async (response) => {
    setIsLoading(true);
    try {
      const responseData = await axios.post(socialUrl, {
        auth_token: response.credential,
      });
      console.log(responseData.data.access_token)
      localStorage.setItem("accessToken", responseData.data.access_token);
      setIsAuthenticated(true);
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="row authenticationTop__container">
      <div className="authenticationleftSide__container">
        <img src={Image} alt="image" />
      </div>
      <div className=" column register__container">
        <div className="row authenticationLogo__container">
          <div>
            <img src={LogoIcon} alt="img" />
          </div>
        </div>
        <div className="column">
          <div className="authentication__upper">
            <div className="column authentication__header">
              <h4>Sign In to your Account</h4>
            </div>
            <div className="column goolge_loginButton_container">
              <GoogleLogin
                onSuccess={handleSuccess}
                text="signup_with"
                width="300"
                shape="rectangular"
                logo_alignment="left"
              />

              <div className="row authentication__separator">
                <span></span>
                <span>Or continue with</span>
                <span></span>
              </div>
            </div>
          </div>
          <div className="authentication__lower">
            <form className="column">
              <div className="column authenticationInput__container">
                <div className="row authenticationInput__header">
                  <span>*</span>
                  <p>email</p>
                </div>
                <div>
                  <input
                    type="text"
                    name="email"
                    value={values.email}
                    className="w-full h-12 rounded-lg border border-gray-300 leading-10 px-4 text-base text-gray-700 focus:outline-none transition duration-300 ease-in-out"
                    onChange={handleChange}
                    placeholder="Please enter your email"
                  />
                  <InLineInputError
                    touched={touched.email}
                    errors={errors.email}
                  />
                </div>
              </div>
              <div className="column authenticationInput__container">
                <div className="row authenticationInput__header">
                  <span>*</span>
                  <p>Password</p>
                </div>
                <div className="passwordInput">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full h-12 rounded-lg border border-gray-300 leading-10 px-4 text-base text-gray-700 focus:outline-none transition duration-300 ease-in-out"
                    value={values.password}
                    onChange={handleChange}
                  />
                  <span onClick={toggleShowPassword}>
                    {showPassword ? (
                      <AiOutlineEye size={23} />
                    ) : (
                      <AiOutlineEyeInvisible size={23} />
                    )}
                  </span>
                  <InLineInputError
                    touched={touched.password}
                    errors={errors.password}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="authentication__btn"
              >
                {isLoading ? "submitting..." : "Sign In"}
              </button>
              <div className="authentication__footer">
                <p className="row">
                  <span>Chockyplasterings@2024</span>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
