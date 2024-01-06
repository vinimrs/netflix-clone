import React from 'react';

const Footer: React.FC = () => {
	return (
		<footer style={{ margin: '50px 0', color: '#f5f5f5', textAlign: 'center' }}>
			Feito com{' '}
			<span role="img" aria-label="coração">
				💚
			</span>{' '}
			por{' '}
			<a
				href="https://www.linkedin.com/in/vinimrs"
				target="_blank"
				rel="noreferrer"
			>
				Vinícius Romualdo
			</a>
			<br />
			Dados usados da Api TheMovieDB.com
			<br />
			Direitos de imagem para Netflix
		</footer>
	);
};

export default Footer;

