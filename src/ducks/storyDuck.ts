import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface IStory {
	by: string;
	descendants: string;
	id: number;
	kids: number[];
	score: number | null;
	time: number | Date;
	title: string;
	type: string;
	url: string;
}

interface IInitialState {
	stories: IStory[];
	isLoading: boolean;
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
	isLoading: false,
};

const storiesSlice = createSlice({
	name: "stories",
	initialState,
	reducers: {},
	extraReducers: {
		[getStories.pending.type]: (state, _) => {
			state.isLoading = true;
		},
		[getStories.fulfilled.type]: (state, { payload }) => {
			state.stories = payload;
			state.isLoading = false;
		},
		[getStories.rejected.type]: (state, _) => {
			state.isLoading = false;
		},
	},
});

export default storiesSlice.reducer;
