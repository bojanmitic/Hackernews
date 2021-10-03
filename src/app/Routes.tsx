import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NotFound from "../containers/NotFound";
import Loader from "../components/Loader";

const StoriesContainer = lazy(() => import("../containers/StoriesContainer"));
const CreatorContainer = lazy(() => import("../containers/CreatorContainer"))
const BarChartContainer = lazy(() => import("../containers/BarChartContainer"));

const Router: React.FC = () => (
	<Suspense fallback={<Loader />}>
		<Routes>
			<Route path="/" element={<StoriesContainer />} />
            <Route path="/creator/:creatorId" element={<CreatorContainer />} />
			<Route path="/barChart" element={<BarChartContainer />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	</Suspense>
);

export default Router;
