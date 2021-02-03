import react from 'react';
import VideoItem from './VideoItem';

// destructured videos out from props
const VideoList = ({ videos }) => {
    const renderedList = videos.map((video) => {
        return <VideoItem video={video} />;
    });

    return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default VideoList;