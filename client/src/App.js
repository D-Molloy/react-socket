import React, { useState } from "react";
import SockClient from "./SockClient";

function App() {
  const [loadClient, setLoadClient] = useState(true);
  return (
    <>
      {/* LOAD OR UNLOAD THE CLIENT */}
      <button onClick={() => setLoadClient(prevState => !prevState)}>
        STOP CLIENT
      </button>
      {/* SOCKET IO CLIENT*/}
      {loadClient ? <SockClient /> : null}
    </>
  );
}

export default App;