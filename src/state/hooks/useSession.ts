import { ISession } from '@types';
import { useRecoilState, useRecoilStateLoadable } from 'recoil';
import { sessionAtom } from '../atoms';

export const useSession = () => {
	const [session, setSession] = useRecoilStateLoadable<ISession>(sessionAtom);
	return { session, setSession };
};
