import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";
import rootReducer from "./rootReducer";

declare const module: any;

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
	reducer: rootReducer,
});

if (process.env.NODE_ENV === "development" && module.hot) {
	module.hot.accept("./rootReducer", () => {
		const newRootReducer = require("./rootReducer").default;
		store.replaceReducer(newRootReducer);
	});
}

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
