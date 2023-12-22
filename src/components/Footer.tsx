import React from 'react';

const Footer: React.FC = () => {
	return (
		<footer style={{ margin: '50px 0', color: '#f5f5f5', textAlign: 'center' }}>
			Feito com{' '}
			<span role="img" aria-label="coração">
				💚
			</span>{' '}
			pela vocedeveloper
			<br />
			Dados usados da Api TheMovieDB.com
			<br />
			Direitos de imagem para Netflix
		</footer>
	);
};

export default Footer;
