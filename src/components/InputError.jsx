import { BsShieldExclamation } from "react-icons/bs";

const InLineInputError = ({ touched, errors }) => {
  return (
    <div className=" input__error">
      <section className="">
        {touched && errors ? (
          <section className="row">
            <i>
              <BsShieldExclamation />
            </i>
            <p className="errorMessage">{errors}</p>
          </section>
        ) : (
          ""
        )}
      </section>
    </div>
  );
};

export default InLineInputError;
