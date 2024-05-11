import axios from "axios";
import React, { useEffect, useState } from "react";
import "../AddTool/addTool.module.css";
import { courseUrl } from "../../Urls/urls";
import { format, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";
import { Oval } from "react-loader-spinner";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { useFetch } from "../../Hooks/UseFetch";

const UpdateCourse = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading: courseIsLoading } = useFetch(
    courseUrl + `course/${id}`
  );

  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState("");
  const [duration, setduration] = useState("");
  const [qualification, setQualification] = useState("");
  const [moreInfo, setMoreInfo] = useState("");
  const [date, setDate] = useState("");
  const [datetoString, setDateTostring] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      setTitle(data?.courses?.title);
      setPrice(data?.courses?.price);
      setDiscount(data?.courses?.discount);
      setduration(data?.courses?.duration);
      setQualification(data?.courses?.qualification);
      setMoreInfo(data?.courses?.more_info);

      if (data?.courses?.date) {
        const formatedDate = format(data.courses.date, "MMMM do yyyy, hh:mm");
        setDateTostring(formatedDate);
      }
      setCurrentImage(data?.courses?.picture);
    }
  }, [data]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setCurrentImage(imageUrl);
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

    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("price", price);
      formData.append("discount", discount);
      formData.append("duration", duration);
      formData.append("qualification", qualification);
      formData.append("more_info", moreInfo);

      if (selectedFile) {
        formData.append("picture", selectedFile);
      }

      if (date) {
        console.log(date);
        formData.append("date", date);
      }

      const token = localStorage.getItem("accessToken");

      if (!token) {
        navigate("/login");
        return;
      }

      setIsLoading(true);

      await axios.put(courseUrl + `course/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsLoading(false);
      toast.success("Course Added succesfully");
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error?.request?.status === 401) {
        navigate("/login");
        console.log("error for");
        return;
      }

      toast.error("an error occured please try again");
    }
  };

  const deleteCourse = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      navigate("/login");
      return;
    }

    setIsLoading(true);
    try {
      await axios.delete(
        courseUrl + `course/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      if (error?.request?.status === 401) {
        navigate("/login");
        console.log("error for");
        return;
      }

      toast.error("an error occured please try again");
    }
  };

  return (
    <div className="pt-[80px] pb-10 px-4 bg-gradient-to-r to-[#611055] from-[#104212] text-white">
      {courseIsLoading ? (
        <div className="flex flex-col gap-3 justify-center items-center h-[100vh] -translate-y-10">
          <Oval
            visible={true}
            height="28"
            width="28"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
          <h4 className="text-xl font-semibold">Loading...</h4>
        </div>
      ) : (
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
                <h4 className="mb-1 text-lg font-semibold">{datetoString}</h4>
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

              <div className="flex flex-col lg:flex-row gap-2">
                <h4 className="mb-1 text-lg font-semibold ">Image</h4>
                <input
                  type="file"
                  placeholder="tool name"
                  className="w-fit text-white p-0"
                  onChange={handleFileChange}
                />
                <div className="w-24">
                  <img
                    src={currentImage}
                    className="object-cover w-full h-full rounded-md"
                  />
                </div>
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
                  "Update Course"
                )}
              </button>
              <div className="flex justify-end">
                <button
                  onClick={deleteCourse}
                  className={twMerge(
                    "bg-red-700  py-1 px-2 rounded-md capitalize text-lg flex justify-center",
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
                    "Delete Course"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateCourse;
