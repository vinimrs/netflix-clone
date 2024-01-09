import React, { useRef, useState } from 'react';
import { GoMute, GoUnmute } from 'react-icons/go';
import { IoReload } from 'react-icons/io5';
import YouTube from 'react-youtube';
import * as S from './style';
import { useWindowDimensions } from '@hooks';

const iconsProps = {
	size: '24px',
	color: '#fff',
};

const defaultDelayToPlay = 3000;
const delayToAnimation = 7000;

const VideoPlayer: React.FC<{
	videoKey: string;
	onChangeState?: (state: boolean) => void;
	playerClassname?: string;
	delayToPlay?: number;
}> = ({ videoKey, onChangeState, playerClassname, delayToPlay }) => {
	const { width } = useWindowDimensions();
	const [playerStatus, setPlayerStatus] = useState<
		'unstarted' | 'playing' | 'stopped'
	>('unstarted');
	const [muted, setMuted] = useState<boolean>(width < 768 ? true : false);
	const videoRef = useRef<YouTube>(null);

	const handleVideoReady = event => {
		setTimeout(
			() => {
				setPlayerStatus('playing');
				event.target.playVideo();
			},
			delayToPlay !== undefined && delayToPlay >= 0
				? delayToPlay
				: defaultDelayToPlay,
		);

		if (onChangeState)
			setTimeout(() => {
				onChangeState(false);
			}, delayToAnimation);
	};

	const handleVideoEnd = event => {
		event.target.stopVideo();
		setPlayerStatus('stopped');
		if (onChangeState) onChangeState(true);
	};

	const muteVideo = () => {
		if (videoRef.current) videoRef?.current?.internalPlayer.mute();
		setMuted(true);
	};

	const unmuteVideo = () => {
		if (videoRef.current) videoRef?.current?.internalPlayer.unMute();
		setMuted(false);
	};

	const restartVideo = () => {
		if (onChangeState) onChangeState(false);
		setPlayerStatus('playing');
		if (videoRef.current) videoRef?.current?.internalPlayer.playVideo();
	};

	return (
		<S.VideoPlayerWrapper>
			<YouTube
				ref={videoRef}
				iframeClassName={playerClassname ? playerClassname : 'video'}
				videoId={videoKey}
				style={{
					display: playerStatus === 'playing' ? 'block' : 'none',
				}}
				opts={{
					playerVars: {
						mute: width < 768 ? 1 : 0,
						controls: 0,
						modestbranding: 1,
						showinfo: 0,
						rel: 0,
						cc_load_policy: 1,
					},
				}}
				onReady={handleVideoReady}
				onEnd={handleVideoEnd}
			/>
			<S.ButtonContainer>
				{playerStatus !== 'unstarted' && (
					<S.VideoButton
						onClick={
							playerStatus === 'playing'
								? muted
									? unmuteVideo
									: muteVideo
								: restartVideo
						}
					>
						{playerStatus === 'playing' ? (
							muted ? (
								<GoMute {...iconsProps} />
							) : (
								<GoUnmute {...iconsProps} />
							)
						) : (
							<IoReload {...iconsProps} />
						)}
					</S.VideoButton>
				)}
			</S.ButtonContainer>
		</S.VideoPlayerWrapper>
	);
};

export default VideoPlayer;

