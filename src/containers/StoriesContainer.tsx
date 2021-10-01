import React, { useEffect } from "react";
import { useAppDispatch, useTypedSelector } from "../app/store";
import { getStories } from "../ducks/storyDuck";
import Grid from "@material-ui/core/Grid";
import SingleNewsCard from "../components/SingleNewsCard";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import SuspenseFallback from "../components/Loader";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
      display: "flex",
      minHeight: "100vh",
			margin: theme.spacing(4),
		},
	})
);

const StoriesContainer: React.FC = () => {
	const dispatch = useAppDispatch();
	const stories = useTypedSelector(state => state.stories.stories);
	const classes = useStyles();
  const isLoading = useTypedSelector(state => state.stories.status)

	useEffect(() => {
    if(stories.length === 0) {
      dispatch(getStories());
    }
	}, [dispatch, stories]);
	return (
		<Grid className={classes.root}>
			<Grid container direction="row" justifyContent="space-between" spacing={4}>
				{stories &&
					stories.map(story => (
						<Grid item xl={3} md={4} sm={6} xs={12} key={story.id}>
							<SingleNewsCard story={story} />
						</Grid>
					))}
          {
            isLoading === "Loading" && (
              <SuspenseFallback />
            )
          }
			</Grid>
		</Grid>
	);
};

export default StoriesContainer;
