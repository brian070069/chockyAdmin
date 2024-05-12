import React, { useState } from "react";
import { useFetch } from "../../Hooks/UseFetch";
import { toolsUrl } from "../../Urls/urls";
import axios from "axios";
import { toast } from "sonner";
import { Oval } from "react-loader-spinner";
import { twMerge } from "tailwind-merge";

const AllCategories = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    data,
    isLoading: isfetching,
    hasError,
  } = useFetch(toolsUrl + "category/", [isLoading]);

  const deleteCategory = async (id) => {
    try {
      setIsLoading(true);
      await axios.delete(toolsUrl + `category/${id}`);
      toast.success("Category Deleted");
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      toast.error("An error occured Please try again");
    }
  };

  return (
    <div className="pt-[80px] min-h-[100vh] pb-10 px-4 bg-gradient-to-r to-[#611055] from-[#104212] text-white">
      <div className="w-[700px] mx-auto flex flex-col gap-2">
        <h4 className="text-center text-xl py-2 tracking-wide">
          All Categories
        </h4>
        {data.map((category) => {
          return (
            <div key={category?.id} className="px-2 py-2 bg-black rounded-md">
              <div className="flex flex-row justify-between items-center ">
                <div className="capitalize">{category?.name}</div>
                <div>
                  <button
                    type="button"
                    onClick={() => deleteCategory(category?.id)}
                    className={twMerge(
                      "bg-red-500 px-2 rounded-md py-1 h-8",
                      isLoading && "cursor-not-allowed",
                      isLoading && "bg-gray-600"
                    )}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div>
                        <Oval
                          visible={true}
                          height="20"
                          width="20"
                          color="#4fa94d"
                          ariaLabel="oval-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      </div>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllCategories;
