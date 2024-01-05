'use client';
import { IWindowDims } from '@types';
import { useEffect, useState } from 'react';

function getWindowDimensions() {
	if (window !== undefined) {
		const { innerWidth: width, innerHeight: height } = window;
		return {
			width,
			height,
		};
	}
}

export const useWindowDimensions = () => {
	const [dims, setDims] = useState<IWindowDims>(getWindowDimensions()!);

	useEffect(() => {
		function handleResize() {
			setDims(getWindowDimensions()!);
		}

		setDims(getWindowDimensions()!);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [setDims]);

	return { width: dims.width, height: dims.height };
};
