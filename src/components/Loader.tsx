import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flex: 1,
			alignItems: "center",
			justifyContent: "center",
			minHeight: "100vh",
			padding: theme.spacing(1),
		},
	})
);

const Loader: React.FC = () => {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<CircularProgress color="secondary" />
		</div>
	);
};

export default Loader;
