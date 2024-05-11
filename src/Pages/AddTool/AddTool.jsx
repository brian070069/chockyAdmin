import axios from "axios";
import React, { useEffect, useState } from "react";
import "./addTool.module.css";
import { toolsUrl } from "../../Urls/urls";
import { twMerge } from "tailwind-merge";
import { Oval } from "react-loader-spinner";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const AddTool = () => {
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allkits, setAllKits] = useState([]);
  const [allFun, setAllFunc] = useState([]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [toolName, setToolName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedCategory, setCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [functionalities, setFunctionalities] = useState("");
  const [kits, setKits] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(toolsUrl + "category/");
      setAllCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getBrands = async () => {
    try {
      const response = await axios.get(toolsUrl + "brand/");
      setAllBrands(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFunctionalities = async () => {
    try {
      const response = await axios.get(toolsUrl + "functionality/");
      setAllFunc(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getKits = async () => {
    try {
      const response = await axios.get(toolsUrl + "kits/");
      setAllKits(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadTools = async (e) => {
    e.preventDefault();

    if (!toolName) {
      toast.error("Tool Name is empty");
      return;
    }
    if (!price) {
      toast.error("Price is empty");
      return;
    }
    if (!description) {
      toast.error("Description is empty");
      return;
    }
    if (!selectedFile) {
      toast.error("Image is empty");
      return;
    }
    if (!selectedCategory) {
      toast.error("Selected Category is empty");
      return;
    }
    if (!selectedBrand) {
      toast.error("Selected Brand is empty");
      return;
    }
    if (!functionalities) {
      toast.error("Functionalities are empty");
      return;
    }
    if (!kits) {
      toast.error("Kits are empty");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("name", toolName);
      formData.append("price", price);
      formData.append("image", selectedFile);
      formData.append("description", description);
      formData.append("category", selectedCategory);
      formData.append("brand", selectedBrand);
      formData.append("functionalities", functionalities);
      formData.append("kits", kits);

      setIsLoading(true);
      await axios.post(toolsUrl + "tool/", formData);
      toast.success("Tool Added succesfully");
      navigate("/");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      toast.error("an error occured please try again");
    }
  };

  useEffect(() => {
    getBrands();
    getCategories();
    getFunctionalities();
    getKits();
  }, []);

  return (
    <div className="pt-[80px] pb-10 px-4 bg-gradient-to-r to-[#611055] from-[#104212] text-white">
      <div className="max-w-[650px] mx-auto">
        <div className="flex justify-center mb-3">
          <h4 className="text-xl font-semibold tracking-wide">Add New Tool</h4>
        </div>
        <div>
          <form className="flex flex-col gap-4">
            <div>
              <h4 className="mb-1 text-lg font-semibold">Tool Name</h4>
              <input
                type="text"
                placeholder="tool name"
                value={toolName}
                className="p-3"
                onChange={(e) => setToolName(e.target.value)}
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
              <h4 className="mb-1 text-lg font-semibold">Description</h4>
              <textarea
                name=""
                id=""
                rows="6"
                className="resize-none overflow-hidden p-3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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

            {/* choose category */}
            <div className="flex flex-col">
              <label htmlFor="cars" className="font-semibold text-xl">
                Choose Category:
              </label>
              <select
                id="categories"
                name="categories"
                className="border border-black text-white rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                value={selectedCategory}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose a Category</option>
                {allCategories.map((category) => {
                  return (
                    <option key={category?.id} value={category?.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* choose brand */}
            <div className="flex flex-col">
              <label htmlFor="cars" className="font-semibold text-xl">
                Choose Brand:
              </label>
              <select
                id="brands"
                name="brands"
                className="border border-black  text-white rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
              >
                <option value="">Choose a Brand</option>
                {allBrands.map((brand) => {
                  return (
                    <option key={brand?.id} value={brand?.id}>
                      {brand.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* choose functionality */}
            <div className="flex flex-col">
              <label htmlFor="cars" className="font-semibold text-xl">
                Choose Functionality:
              </label>
              <select
                id="func"
                name="func"
                className="border border-black  text-white rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                value={functionalities}
                onChange={(e) => setFunctionalities(e.target.value)}
              >
                <option value="">Choose Functionality</option>
                {allFun.map((func) => {
                  return (
                    <option key={func?.id} value={func?.id}>
                      {func.name}
                    </option>
                  );
                })}
              </select>
            </div>

            {/* kits */}
            <div className="flex flex-col">
              <label htmlFor="cars" className="font-semibold text-xl">
                Choose kit :
              </label>
              <select
                id="kit"
                name="kit"
                className="border border-black  text-white rounded-md px-3 py-2 focus:outline-none focus:border-blue-500"
                value={kits}
                onChange={(e) => setKits(e.target.value)}
              >
                <option value="">Choose Kit</option>
                {allkits.map((kit) => {
                  return (
                    <option key={kit?.id} value={kit?.id}>
                      {kit.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <button
              onClick={uploadTools}
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
                "Add Tool"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTool;
