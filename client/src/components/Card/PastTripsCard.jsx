import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import PastTrip from "../PastTrip/PastTrip";

import "../Card/Card.css";

const useStyles = makeStyles({
  root: {
    maxWidth: 1500,
    marginLeft: 200,
    marginTop: 40,
    backgroundColor: "#255D42",
    height: 600,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 70,
  },
  pos: {
    marginBottom: 12,
  },
});

const styles = {
  ButtonsStyle: {
    background: "#02361C",
    color: "white",
    justifyContent: "center",
    marginTop: 400,
  },
};

export default function SimpleCard() {
  const classes = useStyles();

  return (
    
    <Card className={classes.root}>
      <CardContent>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h2"
          component="h2"
        >
          Past Trips
        </Typography>
      </CardContent>
      <PastTrip />
      <Button size="large" href="/" style={styles.ButtonsStyle}>
        Back
      </Button>
    </Card>
  );
}
