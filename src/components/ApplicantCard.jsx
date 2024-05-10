import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import styles from "./ApplicantCard.module.css";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { SkillsList } from "./SkillsList";

export const ApplicantCard = (props) => {
  const { applicantData, onEditProfile } = props;
  return (
    <Card sx={styles.card}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={applicantData.url}
          alt={applicantData.id}
        />
      </CardActionArea>
      <CardActions sx={styles.editCard}>
        <Button
          size="small"
          color="primary"
          onClick={() => onEditProfile(applicantData.id)}
        >
          Edit Profile
        </Button>
      </CardActions>
      {applicantData?.skills?.length > 0 && (
        <CardContent>
          <SkillsList applicantData={applicantData} />
        </CardContent>
      )}
    </Card>
  );
};
