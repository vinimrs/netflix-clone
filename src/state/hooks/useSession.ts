import { ISession } from '@types';
import { useRecoilStateLoadable } from 'recoil';
import { sessionAtom } from '../atoms';

export const useSession = () => {
	const [session, setSession] = useRecoilStateLoadable<ISession>(sessionAtom);
	return { session, setSession };
};
