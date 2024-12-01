import "./App.css";
import Hero from "./components/Hero";
import Demo from "./components/Demo";

const App = () => {
  return (
    <div className="app">
      <div className="gradient" />
      <Hero />
      <Demo />
    </div>
  );
};

export default App;
