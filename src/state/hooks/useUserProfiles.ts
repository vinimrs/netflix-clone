import { IProfile } from '@types';
import { useRecoilState } from 'recoil';
import { profilesAtom } from '../atoms';

export const useUserProfiles = () => {
	const [profiles, setProfiles] = useRecoilState<IProfile[]>(profilesAtom);

	return { profiles, setProfiles };
};

