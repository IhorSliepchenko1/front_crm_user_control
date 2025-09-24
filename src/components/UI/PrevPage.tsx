import { Button } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrevPage = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(-1)} variant="default">
      <ArrowLeft size={14} />
    </Button>
  );
};

export default PrevPage;
