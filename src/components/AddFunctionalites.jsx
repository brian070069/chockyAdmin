import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import { toolsUrl } from "../Urls/urls";
import { toast } from "sonner";
import { Oval } from "react-loader-spinner";

const AddFunctionalitiesModal = ({ isOpen, onOpenChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [functionality, setFunctionality] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setSelectedFile(file);
  };

  const AddFunctionality = async () => {
    if (functionality.length <= 0 || description.length <= 0 || !selectedFile) {
      toast.error("Please fill in all fields");
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("description", description);
    formData.append("name", functionality);

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/bmp",
      "image/webp",
      "image/tiff",
      "image/svg+xml",
      "image/jpg",
    ];

    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error("Image type not allowed");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${toolsUrl}functionality/`, formData);
      setIsLoading(false);
      setFunctionality("");
      setDescription("");
      setSelectedFile(null);
      toast.success("Functionality Added succesfully");
    } catch (error) {
      setIsLoading(false);
      console.error(error);
      if (error.request.status === 500) {
        return;
      }

      toast.error("An error occurred, please try again");
    }
  };

  return (
    <div
      className={twMerge(
        "fixed bg-black/50 left-0 right-0 top-0 bottom-0 z-50 transition-all duration-300",
        !isOpen && "hidden"
      )}
    >
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="absolute bg-black text-white top-[50%] translate-y-[-70%] mx-3"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-lg">
                Add functionality
              </ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-1 text-white/80">
                  <h4>Functionality</h4>
                  <Input
                    placeholder="Add functionality"
                    className="bg-[#23313d] rounded-md border-none focus:outline-none text-white "
                    value={functionality}
                    onChange={(e) => setFunctionality(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1 text-white/80">
                  <h4>Description</h4>
                  <Input
                    placeholder="description "
                    className="bg-[#23313d] rounded-md border-none focus:outline-none text-white "
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="flex flex-col gap-1 text-white/80">
                  <h4>functionality Image</h4>
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="bg-[#23313d] rounded-md border-none focus:outline-none text-white "
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className={"text-red-500"} onPress={onClose}>
                  Close
                </Button>

                <Button
                  color="primary"
                  className={twMerge(
                    "bg-blue-500 rounded-md",
                    isLoading && "bg-gray-600",
                    isLoading && "cursor-not-allowed"
                  )}
                  onClick={AddFunctionality}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Oval
                      visible={true}
                      height="20"
                      width="20"
                      color="#4fa94d"
                      ariaLabel="oval-loading"
                      wrapperStyle={{}}
                      wrapperClass=""
                    />
                  ) : (
                    "Add"
                  )}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AddFunctionalitiesModal;
