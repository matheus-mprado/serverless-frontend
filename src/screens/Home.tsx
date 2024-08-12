import { constants } from "../constants";

export default function Home() {
  const handleLogin = () => {
    window.location.href = `https://${constants.domain}/login?response_type=${constants.responseType}&client_id=${constants.clientId}&redirect_uri=${constants.redirectUri}`;
  };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
