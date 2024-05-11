import axios from "axios";
import React, { useState } from "react";
import "../AddTool/addTool.module.css";
import { courseUrl, toolsUrl } from "../../Urls/urls";
import { twMerge } from "tailwind-merge";
import { Oval } from "react-loader-spinner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddCourse = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [studyMethod, setStudyMethod] = useState("");
  const [duration, setduration] = useState("");
  const [qualification, setQualification] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [date, setDate] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const uploadCourse = async (e) => {
    e.preventDefault();

    if (!title) {
      toast.error("Course title is empty");
      return;
    }
    if (!price) {
      toast.error("Price is empty");
      return;
    }
    if (!discount) {
      toast.error("Discount is empty");
      return;
    }
    if (!duration) {
      toast.error("Please add duration");
      return;
    }
    if (!moreInfo) {
      toast.error("Please add moreInfo");
      return;
    }
    if (!date) {
      toast.error("Please add date");
      return;
    }
    if (!selectedFile) {
      toast.error("Image is empty");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("price", price);
      formData.append("discount", discount);
      // formData.append("study_method", studyMethod);
      formData.append("duration", duration);
      formData.append("qualification", qualification);
      formData.append("more_info", moreInfo);
      formData.append("picture", selectedFile);
      formData.append("date", date);

      setIsLoading(true);

      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login");
        return;
      }

      await axios.post(courseUrl + "course", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Course Added succesfully");
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      if (error.request.status === 401) {
        console.log("error for");
        return;
      }

      toast.error("an error occured please try again");
    }
  };

  return (
    <div className="pt-[80px] pb-10 px-4 bg-gradient-to-r to-[#611055] from-[#104212] text-white">
      <div className="max-w-[650px] mx-auto">
        <div className="flex justify-center mb-3">
          <h4 className="text-xl font-semibold tracking-wide">
            Add New Course
          </h4>
        </div>
        <div>
          <form className="flex flex-col gap-4">
            <div>
              <h4 className="mb-1 text-lg font-semibold">Course Name</h4>
              <input
                type="text"
                placeholder="Course name"
                value={title}
                className="p-3"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <h4 className="mb-1 text-lg font-semibold">Price</h4>
              <input
                type="text"
                placeholder="price"
                className="p-3"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <h4 className="mb-1 text-lg font-semibold">Discount</h4>
              <input
                type="text"
                placeholder="Discount"
                className="p-3"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div>
              <h4 className="mb-1 text-lg font-semibold">Duration</h4>
              <input
                type="text"
                placeholder="Duration"
                className="p-3"
                value={duration}
                onChange={(e) => setduration(e.target.value)}
              />
            </div>
            <div>
              <h4 className="mb-1 text-lg font-semibold">Qualification</h4>
              <input
                type="text"
                placeholder="qualification"
                className="p-3"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
              />
            </div>
            <div>
              <h4 className="mb-1 text-lg font-semibold">Date</h4>
              <input
                type="datetime-local"
                placeholder="date"
                className="p-3"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <h4 className="mb-1 text-lg font-semibold">More Info</h4>
              <textarea
                name=""
                id=""
                rows="6"
                className="resize-none overflow-hidden p-3"
                value={moreInfo}
                onChange={(e) => setMoreInfo(e.target.value)}
              ></textarea>
            </div>

            <div>
              <h4 className="mb-1 text-lg font-semibold ">Image</h4>
              <input
                type="file"
                placeholder="tool name"
                className="w-fit text-white p-0"
                onChange={handleFileChange}
              />
            </div>

            <button
              onClick={uploadCourse}
              className={twMerge(
                "bg-purple-700  py-3 rounded-md capitalize text-lg flex justify-center",
                isLoading && "bg-gray-700",
                isLoading && "cursor-not-allowed"
              )}
              disabled={isLoading}
            >
              {isLoading ? (
                <Oval
                  visible={true}
                  height="25"
                  width="25"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Add Course"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCourse;
