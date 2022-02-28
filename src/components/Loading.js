import loading from '../assets/loading1.gif';

function Loading() {
    return ( 
        <div
					style={{
						position: "absolute",
						zIndex: "900",
						top: "0",
						left: "0",
						right: "0",
						bottom: "0",
						display: "flex",
						alignItems: "center",
						backgroundColor: "#000",
					}}
				>
					<img
						style={{
							width: "100vw",
						}}
						src={loading}
						alt="Animação de carregamento"
					/>
		</div>
     );
}

export default Loading;