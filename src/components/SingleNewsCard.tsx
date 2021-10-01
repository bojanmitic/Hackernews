import React from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { IStory } from "../ducks/storyDuck";

interface ISingleNewsCardProps {
	story: IStory;
}

const SingleNewsCard: React.FC<ISingleNewsCardProps> = ({ story }) => {
	return (
		<Box sx={{ minWidth: 275 }}>
			<Card variant="outlined">
				<CardContent>
					<Typography variant="h5">{story.title}</Typography>
					<Typography color="textSecondary">
						Author: <Link to={`/creator/${story.by}`}>{story.by}</Link>
					</Typography>
					<Typography color="textSecondary">Score: {story.score}</Typography>
					<Typography color="textSecondary">
						Created at: {new Date(story.time).toLocaleDateString()}
					</Typography>
					<CardActions>
						<a href={story.url} target="_blank" rel="noreferrer">
							Read more
						</a>
					</CardActions>
				</CardContent>
			</Card>
		</Box>
	);
};

export default SingleNewsCard;
