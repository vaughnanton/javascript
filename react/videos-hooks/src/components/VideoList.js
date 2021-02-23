import React from 'react';
import VideoItem from './VideoItem';

// destructured videos out from props
// so insted of props.video you can just do video 
const VideoList = ({ videos, onVideoSelect }) => {
    const renderedList = videos.map((video) => {
        return (
            <VideoItem 
                key={video.id.videoId} 
                onVideoSelect={onVideoSelect} 
                video={video} 
            />
        );
    });

    return <div className="ui relaxed divided list">{renderedList}</div>;
};

export default VideoList;