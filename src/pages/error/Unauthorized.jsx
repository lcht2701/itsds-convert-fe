import { Button } from "@/components/ui/button";
import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div>
      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </div>
  );
};

export default Unauthorized;
