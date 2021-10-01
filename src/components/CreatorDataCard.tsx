import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme, createStyles } from "@material-ui/core";
import { ICreatorData } from "../containers/CreatorContainer";


interface ICreatorDataCard {
	creator: ICreatorData;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      flexDirection: "column",
	  alignItems: "center",
	  justifyContent: "center",
      minHeight: "100vh",
      spacing: theme.spacing(2),
    },
  })
);

const CreatorDataCard: React.FC<ICreatorDataCard> = ({ creator }) => {
    const classes = useStyles();
	return (
		<Box className={classes.container}>
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h5">{creator.id}</Typography>
					<Typography color="textSecondary">Karma: {creator.karma}</Typography>
					<Typography color="textSecondary">
						Created at: {new Date(creator.created).toLocaleDateString()}
					</Typography>
					<Typography>
						Submitted interactions: {creator.submitted.length}
					</Typography>
				</CardContent>
			</Card>
		</Box>
	);
};

export default CreatorDataCard;
