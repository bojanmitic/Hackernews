import React from "react";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      minHeight: "100vh",
      spacing: theme.spacing(2),
    },
  })
);

interface INotFoundProps {
  label?: string;
  isErrorBoundary?: boolean;
}

const NotFound: React.FC<INotFoundProps> = ({ label, isErrorBoundary }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.container}>
      <Typography variant="subtitle1" gutterBottom>
        {label || "Oops - This page is not available."}
      </Typography>
      {!isErrorBoundary && (
        <Button
          variant="contained"
          color="primary"
          href="#contained-buttons"
          component={RouterLink}
          to="/">
          Return to Stories
        </Button>
      )}
    </Grid>
  );
};

export default NotFound;
