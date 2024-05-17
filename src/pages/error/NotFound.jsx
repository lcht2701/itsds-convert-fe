import { Button } from "@/components/ui/button";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="grid gap-4">
        <img
          src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
          alt="not-found"
        />
        <Button onClick={() => navigate(-1)}>Go Back</Button>
      </div>
    </div>
  );
};

export default NotFound;
