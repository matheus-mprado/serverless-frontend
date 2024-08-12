import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function LoginCallback() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  console.log(JSON.stringify(params));

  const getToken = async (code: string) => {
    localStorage.setItem("accessToken", code);

    navigate("/");
  };

  useEffect(() => {
    const query = new URLSearchParams(location.hash).toString();
    const idTokenSplit = query.split("=")[1].slice(0, -13);
    const accessTokenSplit = query.split("=")[2].slice(0, -11);
    alert(query);
    alert(accessTokenSplit);
    if (accessTokenSplit) {
      getToken(idTokenSplit);
    }
  }, [location, navigate]);

  return <div>Loading...</div>;
}
