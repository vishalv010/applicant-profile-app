import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { ACTION_BUTTON_CONTENT, TABLE_CONTENT_TYPE, getFilteredData } from "../utility";
import { FilterForm } from "./FilterForm";
import { SkillsTable } from "./SkilsTable";

export const ModalContent = (props) => {
  const { card, onCancel, onApplyChanges } = props;
  const [skillData, setSkillData] = useState(card.skills || []);
  const [selectedCriteria, setSelectedCriteria] = useState("");
  const [searchText, setSearchText] = useState("");
  const addSkill = () => {
    setSkillData((prev) => {
      const newArr = [...prev];
      newArr.push({
        id: `row-${newArr.length + 1}`,
        skill: "",
        rating: "",
        type: TABLE_CONTENT_TYPE.INPUT,
        buttonText: ACTION_BUTTON_CONTENT.APPLY,
      });
      return newArr;
    });
  };
  const deleteRow = (id) => {
    setSkillData((prev) => {
      const newRows = [...prev];
      const updatedRows = newRows.filter((row) => row.id !== id);
      return updatedRows;
    });
  };
  const onSkillChange = (event, id) => {
    setSkillData((prev) => {
      const newRows = [...prev];
      const data = newRows.find((el) => el.id === id);
      data.skill = event.target.value;
      data.buttonText = ACTION_BUTTON_CONTENT.UPDATE;
      return newRows;
    });
  };
  const onRatingChange = (event, id) => {
    setSkillData((prev) => {
      const newRows = [...prev];
      const data = newRows.find((el) => el.id === id);
      data.rating = event.target.value;
      data.buttonText = ACTION_BUTTON_CONTENT.UPDATE;
      return newRows;
    });
  };
  const actionHandler = (id, buttonText) => {
    if (buttonText === ACTION_BUTTON_CONTENT.UPDATE || buttonText === ACTION_BUTTON_CONTENT.APPLY) {
      setSkillData((prev) => {
        const newRows = [...prev];
        const data = newRows.find((el) => el.id === id);
        data.type = TABLE_CONTENT_TYPE.TEXT;
        data.buttonText = ACTION_BUTTON_CONTENT.EDIT;
        return newRows;
      });
    }
    if (buttonText === ACTION_BUTTON_CONTENT.EDIT) {
      setSkillData((prev) => {
        const newRows = [...prev];
        const data = newRows.find((el) => el.id === id);
        data.type = TABLE_CONTENT_TYPE.INPUT;
        data.buttonText = ACTION_BUTTON_CONTENT.APPLY;
        return newRows;
      });
    }
  };
  const onDropdownValueChange = (event) => {
    setSelectedCriteria(event.target.value);
  };
  const searchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  };
  const handleApplyClick = () => {
    onApplyChanges(card.id, skillData);
    onCancel();
  };
  const isSearchInputDisabled =
    skillData.some((data) => data.type === TABLE_CONTENT_TYPE.INPUT) || !selectedCriteria;

  const isDropdownDisabled = skillData.some((data) => data.type === TABLE_CONTENT_TYPE.INPUT);
  const filteredData = getFilteredData(skillData, selectedCriteria, searchText);

  return (
    <>
      <DialogTitle id="alert-dialog-title" style={{padding: '2rem'}}>Applicant Profile</DialogTitle>
      <DialogContent sx={{ display: "flex" }}>
        <img
          src={card.url}
          alt={card.id}
          style={{ width: "230px", height: "auto" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <FilterForm
            isDropdownDisabled={isDropdownDisabled}
            isSearchInputDisabled={isSearchInputDisabled}
            onSearchTextChange={searchTextChangeHandler}
            onDropdownValueChange={onDropdownValueChange}
          />
          <SkillsTable
            filteredData={filteredData}
            onSkillChange={onSkillChange}
            onRatingChange={onRatingChange}
            actionHandler={actionHandler}
            deleteRow={deleteRow}
            addSkill={addSkill}
          />
        </div>
      </DialogContent>
      <DialogActions>
        <Button disabled={isDropdownDisabled} onClick={handleApplyClick}>
          Apply
        </Button>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </>
  );
};
