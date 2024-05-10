import Typography from "@mui/material/Typography";

export const SkillsList = ({ applicantData }) => {
  return applicantData.skills.map((data) => {
    return (
      <Typography gutterBottom variant="h5" component="div" key={data.id}>
        {data.skill}
      </Typography>
    );
  });
};
