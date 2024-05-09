import "./App.css";
import { ApplicantCard } from "./components/Card";
import { useEffect, useState } from "react";
import { Modal } from './components/Modal';
import { ModalContent } from "./components/ModalContent";

function App() {
  const [applicantData, setApplicantData] = useState([]);
  const [modalIsOpen, setModalIsopen] = useState(false);
  const [activeCard, setActiveCard] = useState('');
  useEffect(() => {
    (async () => {
      const resp = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=10"
      );
      const data = await resp.json();
      setApplicantData(data);
    })();
  }, []);
  const handleModalOpen=(id) => {
    const card = applicantData.find(data => data.id===id);
    setActiveCard(card);
    setModalIsopen(true);
  }
  const handleModalClosed = () => {
    setModalIsopen(false)
  }
  const handleApply = (id, skillData) => {
    setApplicantData(prev => {
      const newData = [...prev];
      const card = newData.find(el => el.id === id);
      card.skills = skillData;
      return newData;
    })
  }
  return (
    <div className="App">
      <Modal open={modalIsOpen} onClose={handleModalClosed}>
        <ModalContent card={activeCard} onCancel={handleModalClosed} onApplyChanges={handleApply}/>
      </Modal>
      <header className="App-header">
        <h1>Applicant Profile</h1>
      </header>
      <main>
        <ul className="cards">
          {applicantData.map((data) => {
            return <ApplicantCard applicantData={data} key={data.id} onEditProfile={handleModalOpen}/>;
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
