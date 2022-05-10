import { IWindowDims } from '@types';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { windowDimsAtom } from '../atoms';

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
	const [dims, setDims] = useRecoilState<IWindowDims>(windowDimsAtom);

	useEffect(() => {
		function handleResize() {
			setDims(getWindowDimensions());
		}

		setDims(getWindowDimensions());
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [setDims]);

	return { width: dims.width, height: dims.height };
};
