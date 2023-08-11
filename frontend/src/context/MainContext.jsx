import { createContext, useState } from "react";

const MainContext = createContext();

export function ContextProvider({ children }) {
  const [postsUpdated, setPostsUpdated] = useState(false);
  const [allPostsData, setAllPostsData] = useState();

  return (
    <MainContext.Provider
      value={{ postsUpdated, setPostsUpdated, allPostsData, setAllPostsData }}
    >
      {children}
    </MainContext.Provider>
  );
}

export default MainContext;
