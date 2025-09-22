import { Button } from "@mantine/core";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PrevPage = () => {
  const navigate = useNavigate();
  return (
    <Button
      onClick={() => navigate(-1)}
      leftSection={<ArrowLeft size={14} />}
      variant="default"
    >
      Назад
    </Button>
  );
};

export default PrevPage;
