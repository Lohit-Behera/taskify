import { ThemeProvider } from "@/components/theme-provider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <h1 className="text-3xl font-bold text-center text-primary">
        Hello World
      </h1>
    </ThemeProvider>
  );
}

export default App;
