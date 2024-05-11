import { GoogleLogin } from "@react-oauth/google";
import LogoIcon from "../../assets/logo.png";
import Image from "../../assets/image1.jpg";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { registrationValidationSchema } from "./RegistrationValidation";
import InLineInputError from "../../components/InputError";
import axios from "axios";
import { authUrl, socialUrl } from "../../Urls/urls";
import { AuthenticationContext } from "../../Context/AuthenticationContext";

function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const { setIsAuthenticated } = useContext(AuthenticationContext);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit, touched, errors } = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
    },
    validationSchema: registrationValidationSchema,
    onSubmit: async (value) => {
      setIsLoading(true);
  
      try {
        const response = await axios.post(`${authUrl}register/`, {
          email: value.email,
          username: value.userName,
          password: value.password,
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
      const responseData = await axios.post(
         socialUrl,
        {
          auth_token: response.credential,
        }
      );

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
                  <p>UserName</p>
                </div>
                <div>
                  <input
                    type="text"
                    name="userName"
                    value={values.userName}
                    onChange={handleChange}
                    placeholder="Enter username"
                  />
                  <InLineInputError
                    touched={touched.userName}
                    errors={errors.userName}
                  />
                </div>
              </div>
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
                  <span>Already have an account?</span>
                  <Link to={"/login"}>login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;