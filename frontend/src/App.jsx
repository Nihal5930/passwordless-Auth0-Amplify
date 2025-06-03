// ===========================
// 📁 amplify-auth0-frontend/src/App.js
// ===========================
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const {
    loginWithRedirect,
    logout,
    isAuthenticated,
    user,
    getAccessTokenSilently,
  } = useAuth0();

  const callProtectedAPI = async () => {
    const token = await getAccessTokenSilently();
    const res = await fetch("https://your-fastapi-backend.com/protected", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <button onClick={() => loginWithRedirect()}>Log in</button>
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
          <p>Email: {user.email}</p>
          <button onClick={callProtectedAPI}>Call Protected API</button>
          <button onClick={() => logout({ returnTo: window.location.origin })}>
            Log out
          </button>
        </div>
      )}
    </div>
  );
}
export default App;