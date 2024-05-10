import { ApplicantCard } from "./ApplicantCard";
export const CardsList = (props) => {
  const { applicantData, openModal } = props;
  
  return (
    <ul className="cards">
      {applicantData.map((data) => {
        return (
          <ApplicantCard
            applicantData={data}
            key={data.id}
            onEditProfile={openModal}
          />
        );
      })}
    </ul>
  );
};
