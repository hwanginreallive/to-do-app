import React, { useMemo } from "react";
import ToDo from "./pages/ToDo";

const Context = React.createContext({
  name: "Default",
});

function App() {
  const contextValue = useMemo(
    () => ({
      name: "Ant Design",
    }),
    []
  );

  return (
    <Context.Provider value={contextValue}>
      <div>
        <ToDo />
      </div>
    </Context.Provider>
  );
}

export default App;
