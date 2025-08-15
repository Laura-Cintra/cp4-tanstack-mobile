import QueryClientProvider from "./src/QueryClientProvider";
import App from "./src/App";

export default function Main() {
  return (
    <QueryClientProvider>
      <App />
    </QueryClientProvider>
  );
}