/* eslint-disable no-return-await */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface IStory {
	by: string;
	descendants: string;
	id: number;
	kids: number[];
	score: number | null;
	time: number | null;
	title: string;
	type: string;
	url: string;
}

interface IInitialState {
	stories: IStory[];
	status: string;
}

export const getStories = createAsyncThunk("stories/getStories", async () => {
	return fetch("https://hacker-news.firebaseio.com/v0/beststories.json")
		.then(res => res.json())
		.then(storyIds => {
			return Promise.all(
				storyIds.map((id: number) =>
					fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(
						res => res.json()
					)
				)
			);
		});
});

const initialState: IInitialState = {
	stories: [],
	status: "",
};

const storiesSlice = createSlice({
	name: "stories",
	initialState,
	reducers: {},
	extraReducers: {
		[getStories.pending.type]: (state, _) => {
			state.status = "Loading";
		},
		[getStories.fulfilled.type]: (state, { payload }) => {
			state.stories = payload;
			state.status = "success";
		},
		[getStories.rejected.type]: (state, _) => {
			state.status = "failed";
		},
	},
});

export default storiesSlice.reducer;
