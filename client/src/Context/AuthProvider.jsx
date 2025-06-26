import { useState, useContext, createContext, useEffect } from "react";
import Cookies from "js-cookie";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  
  const [profileData, setProfileData] = useState({});
 

  useEffect(() => {
    const cookieData = Cookies.get("auth");
    if (cookieData) {
      try {
        const parsedData = JSON.parse(cookieData);
        setAuth({
          user: parsedData.user,
          token: parsedData.token,
        });
      } catch (err) {
        console.error("Failed to parse auth cookie", err);
      }
    }
  }, []);

  return (
    <AuthContext.Provider
      value={[
        auth,
        setAuth,
        profileData,
        setProfileData,
       
      ]}
    >
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
