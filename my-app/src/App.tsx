import ControlPanel from './components/UI/ControlPanel/ControlPanel';
import Track from './components/UI/Track/Track';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <ControlPanel />
      <Track />
      <Track />
      <Track />
    </div>
  );
}

export default App;
