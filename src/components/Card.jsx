import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export const ApplicantCard = (props) => {
  const { applicantData, onEditProfile } = props;
  return (
    <Card sx={{ maxWidth: 345, boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={applicantData.url}
          alt="green iguana"
        />
      </CardActionArea>
      <CardActions sx={{ justifyContent: "center" }}>
        <Button
          size="small"
          color="primary"
          onClick={() => onEditProfile(applicantData.id)}
        >
          Edit Profile
        </Button>
      </CardActions>
      {applicantData?.skills?.length > 0 &&<CardContent>
        {
          applicantData.skills.map((data) => {
            return (
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                key={data.id}
              >
                {data.skill}
              </Typography>
            );
          })}
      </CardContent>}
    </Card>
  );
};
