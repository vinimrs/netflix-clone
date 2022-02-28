import { useNavigate } from "react-router";
import * as S from './style';
import { useUsuario } from "../../common/context/Usuario";
import FirstHeader from "../FirstHeader";

function SelectProfile() {
	const { profiles, setProfileBySlug } = useUsuario();
	const history = useNavigate();

	return (
		<div>
			<FirstHeader />
			<S.ProfileWrapper>
				<h1 style={{ color: "var(--white)" }}>Quem está assistindo?</h1>
				<S.ProfileContainer>
					{profiles.map((prof) => (
						<div
							key={prof.slug}
							onClick={() => {
								setProfileBySlug(prof.slug);

								history("/browse");
							}}
						>
							<S.ProfileImage src={prof.image} alt={prof.slug} />
							<h2>{prof.name}</h2>
						</div>
					))}
				</S.ProfileContainer>
			</S.ProfileWrapper>
		</div>
	);
}

export default SelectProfile;
