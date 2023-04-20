import { useState } from "react";
import "./App.css";
import CustomLayout from "./layouts/CustomLayout";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-8">
      <CustomLayout />
    </div>
  );
}

export default App;
