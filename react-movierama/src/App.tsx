import { useState } from "react";
import Header from "./components/Header";

function App() {
  const [query, setQuery] = useState("");

  return (
    <div className="App">
      <Header query={query} setQuery={setQuery} />
    </div>
  );
}

export default App;
