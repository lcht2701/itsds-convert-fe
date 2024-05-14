import { cn } from "@/lib/utils"; // Adjust the import path based on your project structure
import { Loader2 } from "lucide-react";

// Simple utility function to handle class names based on the component's props
function getSpinnerClassName(show) {
  return `flex-col items-center justify-center ${show ? "flex" : "hidden"}`;
}

function getLoaderClassName(size) {
  const sizes = {
    small: "size-6",
    medium: "size-8",
    large: "size-12",
  };
  return `animate-spin text-primary ${sizes[size] || sizes.medium}`;
}

export function Spinner({ size = "medium", show = true, children, className }) {
  return (
    <span className={getSpinnerClassName(show)}>
      <Loader2 className={cn(getLoaderClassName(size), className)} />
      {children}
    </span>
  );
}
