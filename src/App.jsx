import PasswordGenerator from "./components/PasswordGenerator";
import image from "./images/bgpassword.png";

function App() {
  return (
    <div className="z-20" style={{ backgroundImage: `url(${image})` }}>
      <PasswordGenerator />
    </div>
  );
}

export default App;
