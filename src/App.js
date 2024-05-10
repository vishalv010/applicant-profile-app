import "./App.css";
import { useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import { CardsList } from "./components/CardsList";
import { API_URL } from "./utility";

function App() {
  const [applicantData, setApplicantData] = useState([]);
  const [modalIsOpen, setModalIsopen] = useState(false);
  const [activeCard, setActiveCard] = useState("");
  useEffect(() => {
    (async () => {
      const resp = await fetch(API_URL);
      const data = await resp.json();
      setApplicantData(data);
    })();
  }, []);

  const handleModalOpen = (id) => {
    const card = applicantData.find((data) => data.id === id);
    setActiveCard(card);
    setModalIsopen(true);
  };

  const handleModalClosed = () => {
    setModalIsopen(false);
  };

  const handleApply = (id, skillData) => {
    setApplicantData((prev) => {
      const newData = [...prev];
      const card = newData.find((el) => el.id === id);
      card.skills = skillData;
      return newData;
    });
  };
  
  return (
    <div className="App">
      <Modal
        open={modalIsOpen}
        onClose={handleModalClosed}
        card={activeCard}
        onApplyChanges={handleApply}
      />
      <header className="App-header">
        <h1>Applicant Profile</h1>
      </header>
      <main>
        <CardsList openModal={handleModalOpen} applicantData={applicantData} />
      </main>
    </div>
  );
}

export default App;
