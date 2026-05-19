import { Button } from "@lite-app-vitals/ui/components/button";
import { createRoot } from "react-dom/client";

function App() {
  return <Button>Click Me</Button>;
}

const root = document.querySelector("#app");
if (!root) {
  throw new Error("Root element not found");
}
createRoot(root).render(<App />);
