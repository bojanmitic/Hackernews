import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";

import Typography from "@material-ui/core/Typography";
import { IStory } from "../ducks/storyDuck";

interface ISingleNewsCardProps {
	story: IStory;
}

const SingleNewsCard: React.FC<ISingleNewsCardProps> = ({ story }) => {
	return (
		<Box style={{ height: "100%" }}>
			<Card variant="outlined" style={{ height: "100%" }}>
				<CardContent>
					<Typography variant="h5">{story.title}</Typography>
					<Typography color="textSecondary">
						Author:{" "}
						<Button
							color="primary"
							component={RouterLink}
							to={`/creator/${story.by}`}
						>
							{story.by}
						</Button>
					</Typography>
					<Typography color="textSecondary">Score: {story.score}</Typography>
					<Typography color="textSecondary">
						Created at: {new Date(story.time).toLocaleDateString()}
					</Typography>
					<CardActions>
						<Button color="primary" variant="outlined">
							<Link
								underline="none"
								href={story.url}
								target="_blank"
								rel="noreferrer"
							>
								Read more
							</Link>
						</Button>
					</CardActions>
				</CardContent>
			</Card>
		</Box>
	);
};

export default SingleNewsCard;
