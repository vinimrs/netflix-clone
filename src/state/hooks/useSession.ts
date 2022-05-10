import { ISession } from '@types';
import { useRecoilState } from 'recoil';
import { sessionAtom } from '../atoms';

export const useSession = () => {
	const [session, setSession] = useRecoilState<ISession>(sessionAtom);

	return { session, setSession };
};
