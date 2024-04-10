import './App.css';
import { Header } from './components/Header';
import { Instructions } from './components/Instructions';
import { Output } from './components/Output';
import { Input } from './components/Input';
import { Provider } from 'react-redux';
import { storage } from './storage/storage';
import { useModal } from "./components/modal/useModal";
import { Explanation } from "./components/Explanation";

function App() {
  const { modal, openModal } = useModal({
    children: (
      <>
        <h1 className="text-3xl font-bold mx-2">Explanation</h1>
        <Explanation />
      </>
    ),
    modalBoxClassName: 'explain-modal'
  });

  return (
    <div className="App h-screen">
      <Header toggleExplain={openModal} />
      <Instructions />
      <Provider store={storage}>
        <Output />
        <Input />
      </Provider>
      {modal}
    </div>
  );
}

export default App;
