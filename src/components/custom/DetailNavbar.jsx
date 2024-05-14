import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { ChevronLeft } from "lucide-react";

const DetailNavbar = ({ name }) => {
  const navigate = useNavigate(); // Initialize the navigate function

  const navigateBack = () => {
    navigate(-1); // Navigate to the previous page
  };
  return (
    <div className="flex items-center gap-4">
      <Button
        type="button"
        variant="outline"
        size="icon"
        className="h-7 w-7"
        onClick={navigateBack}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Back</span>
      </Button>
      <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
        {name}
      </h1>
      <div className="ml-auto items-center gap-2 flex">
        <Button
          type="button"
          onClick={navigateBack}
          variant="outline"
          size="sm"
        >
          Discard
        </Button>
        <Button type="submit" size="sm">
          Save
        </Button>
      </div>
    </div>
  );
};

export default DetailNavbar;
