import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {DataContext} from "../../Components/DataProvider/DataProvider";

function ProtectedRoutes({ children, msg, redirect }) {
  const navigate = useNavigate();
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    if (!user) {
      navigate("/Auth", { state: { msg, redirect } });
    }
  }, [user, navigate, msg, redirect]);

  return children;
}

export default ProtectedRoutes;
