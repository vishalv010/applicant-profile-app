import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { getFilteredData } from "../utility";

export const ModalContent = (props) => {
  const { card, onCancel, onApplyChanges } = props;
  const [skillData, setSkillData] = useState(card.skills || []);
  const [selectedCriteria, setSelectedCriteria] = useState('');
  const [searchText, setSearchText] = useState('');
  const addSkill = () => {
    setSkillData((prev) => {
      const newArr = [...prev];
      newArr.push({
        id: `row-${newArr.length + 1}`,
        skill: "",
        rating: "",
        type: "input",
        buttonText: 'Apply'
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
      data.buttonText = 'Update';
      return newRows;
    });
  };
  const onRatingChange = (event, id) => {
    setSkillData((prev) => {
      const newRows = [...prev];
      const data = newRows.find((el) => el.id === id);
      data.rating = event.target.value;
      data.buttonText = 'Update';
      return newRows;
    });
  };
  const actionHandler = (id, buttonText) => {
    if (buttonText === "Update" || buttonText==='Apply') {
      setSkillData((prev) => {
        const newRows = [...prev];
        const data = newRows.find((el) => el.id === id);
        data.type = "text";
        data.buttonText='Edit'
        return newRows;
      });
    }
    if (buttonText === "Edit") {
      setSkillData((prev) => {
        const newRows = [...prev];
        const data = newRows.find((el) => el.id === id);
        data.type = "input";
        data.buttonText='Apply';
        return newRows;
      });
    }
  };
  const onDropdownValueChange = (event) => {
    setSelectedCriteria(event.target.value);
  }
  const searchTextChangeHandler = (event) => {
    setSearchText(event.target.value);
  }
  const handleApplyClick = () => {
    onApplyChanges(card.id, skillData);
    onCancel();
  }
  const isSearchInputDisabled = skillData.some(data => data.type==='input') || !selectedCriteria;
  const isDropdownDisabled = skillData.some(data => data.type==='input');
  const filteredData = getFilteredData(skillData,selectedCriteria,searchText)
  return (
    <>
      <DialogTitle id="alert-dialog-title">Applicant Profile</DialogTitle>
      <DialogContent sx={{ display: "flex", padding: "2rem" }}>
        <img
          src={card.url}
          alt="card"
          style={{ width: "230px", height: "auto" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ marginBottom: "2rem" }}>
            <label htmlFor="searchText" style={{ margin: "1rem" }}>
              Search Text
            </label>
            <input
              id="searchText"
              type="text"
              name="email"
              style={{ padding: "6px", fontSize: "1rem" }}
              disabled={isSearchInputDisabled}
              onChange={searchTextChangeHandler}
            />
            <label htmlFor="skill-rating" style={{ margin: "1rem" }}>
              Skill/Rating
            </label>
            <select
              id="skill-rating"
              name="criteria"
              style={{ padding: "6px", fontSize: "1rem" }}
              disabled={isDropdownDisabled}
              onChange={onDropdownValueChange}
            >
              <option value="">Select</option>
              <option value="skill">Skill</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          <div style={{ margin: "1rem" }}>
            <table
              style={{
                fontFamily: "arial, sans-serif",
                borderCollapse: "collapse",
                width: "100%",
                marginBottom: "1rem",
              }}
            >
              <tr>
                <th>Skill</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
              {filteredData.length>0 ? filteredData.map((row) => {
                return (
                  <tr key={row.id}>
                    <td>
                      {row.type === "input" ? (
                        <input
                          type="text"
                          style={{ fontSize: "1rem" }}
                          value={row.skill}
                          onChange={(event) => onSkillChange(event, row.id)}
                        />
                      ) : (
                        <p>{row.skill}</p>
                      )}
                    </td>
                    <td>
                      {" "}
                      {row.type === "input" ? (
                        <input
                          type="number"
                          min="1"
                          max="10"
                          value={row.rating}
                          style={{ fontSize: "1rem" }}
                          onChange={(event) => onRatingChange(event, row.id)}
                        />
                      ) : (
                        <p>{row.rating}</p>
                      )}
                    </td>
                    <td>
                      <Button
                        variant="outlined"
                        style={{ marginRight: "4px" }}
                        onClick={() => actionHandler(row.id,row.buttonText)}
                      >
                        {row.buttonText}
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => deleteRow(row.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                );
              }): <tr>
                    <td colSpan='3' style={{textAlign: 'center'}}>No Records Found</td>
                </tr>}
            </table>
            <Button
              variant="contained"
              sx={{ display: "block", margin: "auto" }}
              onClick={addSkill}
            >
              Add Skill
            </Button>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button disabled={isDropdownDisabled} onClick={handleApplyClick}>Apply</Button>
        <Button onClick={onCancel}>Cancel</Button>
      </DialogActions>
    </>
  );
};
