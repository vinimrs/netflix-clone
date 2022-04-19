import React from 'react'
import { useNavigate } from 'react-router'
import { useUsuario } from '../../common/context/Usuario'
import FirstHeader from '../../components/FirstHeader'
import * as S from './style'

const SelectProfile: React.FC = () => {
    const { profiles, setProfileBySlug } = useUsuario()
    const history = useNavigate()

    return (
        <>
            <FirstHeader />
            <S.ProfileWrapper>
                <h1 style={{ color: 'var(--white)' }}>Quem está assistindo?</h1>
                <S.ProfileContainer data-testid="profile-container">
                    {profiles.map(prof => (
                        <div
                            key={prof.slug}
                            data-testid="profile"
                            onClick={() => {
                                setProfileBySlug(prof.slug)
                                history('/browse')
                            }}
                            role="img"
                        >
                            <S.ProfileImage src={prof.image} alt={prof.slug} />
                            <h2>{prof.name}</h2>
                        </div>
                    ))}
                </S.ProfileContainer>
            </S.ProfileWrapper>
        </>
    )
}

export default SelectProfile
