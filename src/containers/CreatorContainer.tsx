import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Box from "@material-ui/core/Box";
import CreatorDataCard from "../components/CreatorDataCard";
import Loader from "../components/Loader";

export interface ICreatorData {
	created: number | Date;
	id: string;
	karma: number;
	submitted: number[];
}

const CreatorContainer = () => {
	const { creatorId } = useParams();

	const [creatorData, setCreatorData] = useState<ICreatorData>();
	const [loadingData, setLoadingData] = useState(false);

	useEffect(() => {
		const getCreatorData = async () => {
			const url = `https://hacker-news.firebaseio.com/v0/user/${creatorId}.json`;
			try {
				setLoadingData(true);
				const response = await fetch(url);
				if (response.ok === false) {
					throw new Error("Response error: " + response.text);
				}
				const json = await response.json();
				setCreatorData(json);
				setLoadingData(false);
			} catch (error) {
				setLoadingData(false);
				console.error(error);
			}
		};
		getCreatorData();
	}, [creatorId]);

	return (
		<Box >
			{creatorData && <CreatorDataCard creator={creatorData} />}
      {loadingData && <Loader />}
		</Box>
	);
};

export default CreatorContainer;
