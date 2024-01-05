/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMovieDataInfo, IProfile } from '@types';

export const toSlug = (str: string) => {
	const slugify = str
		.toLowerCase()
		.trim()
		.replace(/[^\w\s-]/g, '')
		.replace(/[\s_-]+/g, '-')
		.replace(/^-+|-+$/g, '');
	return slugify;
};

export const shuffle = (array: any[]) => {
	let currentIndex = array.length,
		randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
};

export const convertImage = (bin: ArrayBuffer) => {
	const buff = Buffer.from(bin);
	return buff.toString('base64');
};

export const toHoursAndMinutes = (totalMinutes: number) => {
	const minutes = totalMinutes % 60;
	const hours = Math.floor(totalMinutes / 60);

	return `${hours < 1 ? '' : `${hours}h`}${minutes < 1 ? '' : `${minutes}min`}`;
};

export const belongsToTheAccount = (profiles: IProfile[], profile: IProfile) =>
	profiles.some(prof => {
		if (prof.slug === profile.slug && prof.preference !== undefined) {
			const isEqualPreferences = prof.preference.every((pref, index) => {
				return profile.preference !== undefined
					? pref === profile.preference[index]
					: false;
			});
			const isEqualImage =
				profile.image !== undefined && prof.image !== undefined
					? profile.image._id === prof.image._id
					: null;
			return isEqualPreferences && isEqualImage;
		}
	});

export const limitedText = (text: string, type: string, width: number) => {
	const limits = {
		title: width < 1440 ? 10 : 40,
		description: width < 1440 ? 100 : 240,
	};

	if (text === undefined) return '';

	return text.length > limits[type]
		? text.substring(0, limits[type]) + '...'
		: text;
};

export const isAnMovieDataInfo = (obj: any): obj is IMovieDataInfo => {
	return (
		'backdrop_path' in obj &&
		obj.backdrop_path !== null &&
		'overview' in obj &&
		obj.overview !== null &&
		'title' in obj &&
		obj.title !== null &&
		'vote_average' in obj &&
		obj.vote_average !== null &&
		'genre_ids' in obj &&
		obj.genre_ids !== null
	);
};

export const clearAllTimeouts = () => {
	let id = window.setTimeout(function () {
		return;
	}, 0);

	while (id--) {
		window.clearTimeout(id); // will do nothing if no timeout with id is present
	}
};
