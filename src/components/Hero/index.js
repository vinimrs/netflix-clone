import React from "react";
import * as S from './style.js';
import { ReactComponent as Plus } from "../../assets/plus.svg";
import { ReactComponent as Play } from "../../assets/play.svg";

function Hero({ data }) {

    function toHoursAndMinutes(totalMinutes) {
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);
      
        return `${hours < 1 ? '' : `${hours}h`}${minutes < 1 ? '' : `${minutes}min`}`;
    }
      
	console.log(data);
    return (
		<S.HeroWrapper $src={data.backdrop_path ? `https://image.tmdb.org/t/p/original${data.backdrop_path}` : ''}>
        
            <S.InfoFilm>
				<S.FilmTitle>{data.title ? data.title : data.name}</S.FilmTitle>
				<S.Details>
					{data.vote_average && <S.DetailsText score>{data.vote_average} pontos</S.DetailsText>}
					{(data.release_date || data.last_air_date) && <S.DetailsText>{data.release_date ? data.release_date.substring(0,4) : data.last_air_date.substring(0,4)}</S.DetailsText>}
					{(data.runtime || data.last_air_date) && <S.DetailsText>{data.runtime ? toHoursAndMinutes(data.runtime) : `${data.number_of_seasons} temporada${data.number_of_seasons > 1 ? 's' : ''}`}</S.DetailsText>}
				</S.Details>
				<S.FilmText>
					{data.overview.length > 300 ? data.overview.substring(0, 300) + '...' : data.overview}
				</S.FilmText>
				<S.ButtonsWrapper>
					<a  href={`/watch/${data.id}`}>
                        <S.HeroButton primary>
                                <Play />
                            <S.ButtonText>
                                Assistir
                            </S.ButtonText>
                        </S.HeroButton>
                    </a>
					<a href={`/list/add/${data.id}`}>
                        <S.HeroButton>
                                <Plus />
                            <S.ButtonText>
                                Minha Lista
                            </S.ButtonText>
                        </S.HeroButton>
                    
                    </a>
				</S.ButtonsWrapper>
				{data.genres && <S.FilmText>| {data.genres.map(genre => {return `${genre.name} | `})}</S.FilmText>}
			</S.InfoFilm>
		</S.HeroWrapper>
	);
}

export default Hero;
