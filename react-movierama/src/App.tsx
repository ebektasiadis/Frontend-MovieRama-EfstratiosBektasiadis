import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  return (
    <div className="App">
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
    </div>
  );
}

export default App;
