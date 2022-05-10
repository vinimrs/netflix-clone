import { IProfile } from '@types';
import { useRecoilState } from 'recoil';
import { profileAtom } from '../atoms';

export const useProfile = () => {
	const [profile, setProfile] = useRecoilState<IProfile>(profileAtom);

	return { profile, setProfile };
};
