import { useEffect, useState } from "react";
import { constants } from "../constants";
import { getObjects, putObject } from "../services/api";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [objects, setObjects] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleLogout = () => {
    window.location.href = `https://${constants.domain}/logout?client_id=${constants.clientId}&redirect_uri=${constants.redirectUri}&logout_uri=${constants.redirectUriLogout}&response_type=token
`;
    localStorage.removeItem("accessToken");
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    // if (!file) {
    //   alert("Please select a file first!");
    //   return;
    // }

    const formData = new FormData();
    formData.append("files", file);

    try {
      await putObject(formData);
      await handleGetObjects();
    } catch (error) {
      // alert("Error uploading file: " + error.message);
    }
  };

  async function handleGetObjects() {
    setIsLoading(true);
    try {
      const result = await getObjects();
      setObjects(result);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleGetObjects();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {/* {JSON.stringify(objects)} */}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        objects?.length > 0 && (
          <div>
            {objects.map((item) => {
              if (!item.thumb) {
                return;
              }
              return <img src={item.thumb} style={{ height: "10rem" }} />;
            })}
          </div>
        )
      )}
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload File</button>
      <button onClick={handleGetObjects}>Refresh</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
