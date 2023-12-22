import { useRecoilState } from 'recoil';
import { loadingAtom } from '../atoms';
import { useState } from 'react';

export const useLoading = () => {
	const [loading, setLoading] = useRecoilState<boolean>(loadingAtom);

	return { loading, setLoading };
};

