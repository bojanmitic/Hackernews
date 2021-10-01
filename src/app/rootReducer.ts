import { combineReducers } from "@reduxjs/toolkit";
import storiesSlice from "../ducks/storyDuck";

const rootReducer = combineReducers({
	stories: storiesSlice,
});

export default rootReducer;
