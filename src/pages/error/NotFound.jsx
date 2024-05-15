import { Button } from "@/components/ui/button";
import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="flex justify-center items-center min-h-screen">
    <div className="grid gap-4">
      <img
        src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
        alt="not-found"
      />
      <Link to="/login" className="text-center">
        <Button>Go Home</Button>
      </Link>
    </div>
  </div>
);

export default NotFound;
