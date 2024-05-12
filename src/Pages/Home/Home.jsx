import React from "react";
import AddCategoryModal from "../../components/AddCategoryModal";
import Cad from "../../components/Card";
import { useDisclosure } from "@nextui-org/modal";
import AddBrandModal from "../../components/AddBrandModal";
import AddFunctionalitiesModal from "../../components/AddFunctionalites";
import AddKitsModal from "../../components/AddKits";
import { courseUrl, toolsUrl } from "../../Urls/urls";
import { Link } from "react-router-dom";
import { useFetch } from "../../Hooks/UseFetch";
import { Oval } from "react-loader-spinner";

const Home = () => {
  const { data, isLoading } = useFetch(toolsUrl + "tool/");
  const { data: AllCourses, isLoading: loadingCourses } = useFetch(
    courseUrl + "course"
  );
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: brandIsOpen,
    onOpen: brandOnOpen,
    onOpenChange: brandOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: functionalitiesIsOpen,
    onOpen: functionalitiesOnOpen,
    onOpenChange: functionalitiesOnOpenChange,
  } = useDisclosure();
  const {
    isOpen: KitIsOpen,
    onOpen: KitOnOpen,
    onOpenChange: KitOnOpenChange,
  } = useDisclosure();

  return (
    <div className="mx-2 lg:mx-6">
      <AddCategoryModal
        isOpen={isOpen}
        onOpen={onOpen}
        onOpenChange={onOpenChange}
      />
      <AddBrandModal
        isOpen={brandIsOpen}
        onOpen={brandOnOpen}
        onOpenChange={brandOnOpenChange}
      />
      <AddFunctionalitiesModal
        isOpen={functionalitiesIsOpen}
        onOpen={functionalitiesOnOpen}
        onOpenChange={functionalitiesOnOpenChange}
      />
      <AddKitsModal
        isOpen={KitIsOpen}
        onOpen={KitOnOpen}
        onOpenChange={KitOnOpenChange}
      />
      <div className="mt-[70px] grid grid-cols-2 md:grid-cols-3  xl:grid-cols-4 gap-3  justify-center">
        <Cad
          title={"add Category"}
          func={onOpen}
          className="bg-gradient-to-r to-[#ffb457] from-[#0e3d39]"
        />
        <Cad
          title={"add Functionalites"}
          func={functionalitiesOnOpen}
          className="bg-gradient-to-r to-[#a3ff57] from-[#290f2e]"
        />
        <Cad
          title={"add Kits"}
          func={KitOnOpen}
          className="bg-gradient-to-r to-[#ff577b] from-[#2d701f]"
        />
        <Cad
          title={"add Tool"}
          route={"/addtool"}
          className="bg-gradient-to-r to-[#ff5757] from-[#253479]"
        />
        <Cad
          title={"add Course"}
          className="bg-gradient-to-r to-[#57ffdb] from-[#803226]"
          route={"/addcourse"}
        />
        <Cad
          title={"add Brand"}
          func={brandOnOpen}
          className="bg-gradient-to-r to-[#cf57ff] from-[#642a22]"
        />
        <Cad
          title={"All Categories"}
          route={"/categories"}
          className="bg-gradient-to-r to-[#13294f] from-[#185c22]"
        />
        <Cad
          title={"All Brands"}
          route={"/brands"}
          className="bg-gradient-to-r to-[#2b0421] from-[#642a22]"
        />
      </div>

      <div className="my-5 py-2 flex flex-col gap-3 lg:flex-row">
        <div className="flex-1   bg-gradient-to-r to-[#ff577b] from-[#2d701f] text-white rounded-sm">
          <div>
            <h4 className="text-center text-xl">All Tools</h4>
          </div>
          <div>
            {isLoading ? (
              <div className="flex flex-col items-center justify-center gap-1 py-3">
                <Oval
                  visible={true}
                  height="30"
                  width="30"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
                <h4 className="text-center  text-lg italic">
                  Fetching Tools...
                </h4>
              </div>
            ) : (
              data.map((tool) => {
                return (
                  <Link
                    to={`/tools/${tool?.id}`}
                    key={tool?.id}
                    className="flex flex-row  justify-between px-3 my-2 mx-2 rounded-md py-4 bg-[#161b27] hover:-translate-x-2 duration-300 "
                  >
                    <h4 className="capitalize text-lg">{tool?.name}</h4>
                    <h4 className="text-lg">{tool?.price}</h4>
                  </Link>
                );
              })
            )}
          </div>
        </div>

        <div className="flex-1   bg-gradient-to-r to-[#ffb457] from-[#0e3d39] text-white rounded-lg">
          <div>
            <h4 className="text-center text-xl">All Courses</h4>
          </div>
          <div>
            {loadingCourses ? (
              <div className="flex flex-col items-center justify-center gap-1 py-3">
                <Oval
                  visible={true}
                  height="30"
                  width="30"
                  color="#4fa94d"
                  ariaLabel="oval-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
                <h4 className="text-center  text-lg italic">
                  Fetching Courses...
                </h4>
              </div>
            ) : (
              AllCourses.map((course) => {
                return (
                  <Link
                    to={`/course/${course?.course_id}`}
                    key={course?.course_id}
                    className="flex flex-row  justify-between px-3 my-2 mx-2 rounded-md py-4 bg-[#161b27] hover:-translate-x-2 duration-300 "
                  >
                    <h4 className="capitalize text-lg">{course?.title}</h4>
                    <h4 className="text-lg">{course?.price}</h4>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
