import React from "react";
import Grid from "@material-ui/core/Grid";
import { ResponsiveBar } from "@nivo/bar";
import { useTypedSelector } from "../app/store";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Loader from "../components/Loader";

const useStyles = makeStyles(() =>
	createStyles({
		root: {
			display: "flex",
			flexDirection: "column",
			minHeight: "100vh",
			flexGrow: 1,
		},
	})
);

const BarChartContainer = () => {
	const classes = useStyles();
	const stories = useTypedSelector(state => state.stories.stories);
	const isLoading = useTypedSelector(state => state.stories.isLoading);
	const chartData =
		stories &&
		stories.map(story => {
			return { score: story.score || 0, title: story.title };
		});
	return (
		<Grid className={classes.root}>
			{isLoading ? (
				<Loader />
			) : (
				<Grid style={{ width: "100%", height: "800px" }}>
					<ResponsiveBar
						data={chartData}
						keys={["score"]}
						indexBy="title"
						margin={{ top: 20, right: 10, bottom: 400, left: 40 }}
						padding={0.3}
						colors={["#5AB5F2"]}
						enableLabel={false}
						tooltip={ttProps => (
							<div>
								<div>Title: {ttProps.indexValue} </div>
								<div>Score: {ttProps.value}</div>
							</div>
						)}
						theme={{
							tooltip: {
								container: {
									backgroundColor: "#2d3142",
									color: "white",
								},
							},
						}}
						axisBottom={{
							tickSize: 5,
							tickRotation: 90,
						}}
					/>
				</Grid>
			)}
		</Grid>
	);
};

export default BarChartContainer;
