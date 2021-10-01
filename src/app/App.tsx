import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Routes from "./Routes";

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			backgroundColor: "#E0E0E0",
			overflow: "hidden",
			width: "100%",
			minHeight: "100vh",
		},
	})
);

const App = () => {
	const classes = useStyles();
	return (
		<>
			<CssBaseline />
				<main className={classes.root}>
					<Routes />
				</main>
		</>
	);
};

export default App;
