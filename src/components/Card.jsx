import React from "react";
import { IoMdAdd } from "react-icons/io";
import { Card, CardBody } from "@nextui-org/card";
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";

const Cad = ({ title, route, func, className }) => {
  return (
    <Link to={route} className="relative" onClick={func}>
      <Card className={twMerge("  text-white/90 rounded-sm h-24", className)}>
        <CardBody className="flex flex-col gap-3 absolute left-0  top-0 right-0 bottom-0 bg-black/20">
          <div className="rounded-full border w-fit ">
            <IoMdAdd size={30} />
          </div>
          <h4 className="text-lg capitalize font-semibold tracking-wide">
            {title}
          </h4>
        </CardBody>
      </Card>
    </Link>
  );
};

export default Cad;
