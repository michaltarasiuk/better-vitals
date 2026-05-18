import { createRoot } from "react-dom/client";

const App = () => null;

const root = document.querySelector("#app");
if (!root) {
  throw new Error("Root element not found");
}
createRoot(root).render(<App />);
