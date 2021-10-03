import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTypedSelector } from "../app/store";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { Theme, Typography } from "@material-ui/core";
import SingleNewsCard from "../components/SingleNewsCard";
import Loader from "../components/Loader";
import Search from "../components/Search";
import Fuse from "fuse.js";
import { IStory } from "../ducks/storyDuck";
import { getComparator, stableSort } from "../utils/sorting";

const menuItems = [
	{
		id: "0",
		order: "asc",
		orderBy: "",
		value: "None",
	},
	{
		id: "1",
		order: "desc",
		orderBy: "score",
		value: "From highest to lowest score",
	},
	{
		id: "2",
		order: "asc",
		orderBy: "score",
		value: "From lowest to highest score",
	},
	{
		id: "3",
		order: "asc",
		orderBy: "by",
		value: "By creator from A-Z",
	},
	{
		id: "4",
		order: "desc",
		orderBy: "by",
		value: "By creator from Z-A",
	},
];

export type Order = "asc" | "desc";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: "flex",
			flexDirection: "column",
			minHeight: "100vh",
			flexGrow: 1,
			margin: theme.spacing(4),
		},
    title: {
      margin: "0 auto",
      marginBottom: "20px",
    },
    filters: {
      marginBottom: "20px"
    },
		searchInput: {
			marginRight: "30px",
		},
		selectSort: {
			minWidth: "250px",
		},
    button: {
      marginBottom: "20px"
    }
	})
);

const StoriesContainer: React.FC = () => {
	const stories = useTypedSelector(state => state.stories.stories);
	const classes = useStyles();
	const isLoading = useTypedSelector(state => state.stories.isLoading);
	const [filter, setFilter] = useState("");
	const [filtered, setFiltered] = useState<IStory[]>(stories);
	const [sortValue, setSortValue] = useState<string | unknown>(
		menuItems[0].value
	);
	const [sortValueObj, setSortValueObj] = useState<any>();
	const [sorted, setSorted] = useState<any>();

	const formattedFuseResult = (fuseResult: Fuse.FuseResult<IStory>[]) => {
		const items = fuseResult.map(value => value.item);
		return items;
	};

	useEffect(() => {
		const options = {
			threshold: 0.2,
			keys: ["by", "score", "title"],
		};
		const fuse = new Fuse(stories, options);

		if (filter) {
			const filteredResults = fuse.search(filter);
			setFiltered(formattedFuseResult(filteredResults));
		} else {
			setFiltered(stories);
		}
	}, [filter, stories]);

	useEffect(() => {
		const objForSort = menuItems.filter(item => item.value === sortValue)[0];
		if (sortValue) {
			setSortValueObj(objForSort);
		}
	}, [sortValue]);

	useEffect(() => {
		if (sortValueObj) {
			setSorted(
				stableSort(
					filtered,
					getComparator(sortValueObj.order, sortValueObj.orderBy)
				)
			);
		}
	}, [filtered, sortValueObj]);

	return (
		<Grid className={classes.root}>
      <Typography className={classes.title} variant="h2">Hacker news</Typography>
			<Grid className={classes.filters} container direction="row">
				<Grid className={classes.searchInput} item xs={8} sm={6} md={4} xl={2}>
					<Search
						onHandleSearch={e => {
							setFilter(e.target.value as string);
						}}
						value={filter}
						disabled={isLoading}
					/>
				</Grid>
				<Grid item xs={8} sm={6} md={4} xl={2}>
					<Select
						className={classes.selectSort}
						labelId="select-filled-label"
						id="select-filled"
						value={sortValue}
						onChange={(e: React.ChangeEvent<{ value: unknown }>) =>
							setSortValue(e.target.value)
						}
						disabled={isLoading}
					>
						{menuItems.map(item => (
							<MenuItem key={item.id} value={item.value}>
								{item.value}
							</MenuItem>
						))}
					</Select>
				</Grid>
				<Button
					color="primary"
					variant="contained"
					component={Link}
					to="/barChart"
          className={classes.button}
				>
					Bar chart
				</Button>
			</Grid>
			<Grid container direction="row" spacing={4}>
				{sorted &&
					sorted.map((story: IStory) => (
						<Grid item xl={3} md={4} sm={6} xs={12} key={story.id}>
							<SingleNewsCard story={story} />
						</Grid>
					))}
				{isLoading && <Loader />}
			</Grid>
		</Grid>
	);
};

export default StoriesContainer;
