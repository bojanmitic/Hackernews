import React, { useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Routes from "./Routes";
import { useAppDispatch, useTypedSelector } from "./store";
import { getStories } from "../ducks/storyDuck";

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
	const dispatch = useAppDispatch();
	const stories = useTypedSelector(state => state.stories.stories);

	const classes = useStyles();
	useEffect(() => {
		if (stories.length === 0) {
			dispatch(getStories());
		}
	}, [dispatch, stories]);
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
