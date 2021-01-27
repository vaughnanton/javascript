import React from 'react';

class ImageCard extends React.Component {
    constructor(props) {
        super(props);
        this .state = { spans : 0 };
        this.imageRef = React.createRef();
    }
    // get the image heights
    componentDidMount() {
        this.imageRef.current.addEventListener('load', this.setSpans);
    }
    // to set the grid-row-end property of css
    // arrow function to bind this
    setSpans = () => {
        const height = this.imageRef.current.clientHeight;

        const spans = Math.ceil(height / 10 + 1);

        this.setState({ spans: spans })
    }

    render() {
        const { description, urls } = this.props.image;
        return (
            <div style={{ gridRowEnd: `span ${this.state.spans}`}}>
                <img
                    alt={description} 
                    src={urls.regular}
                    ref={this.imageRef}
                />
            </div>
        )
    }
}

export default ImageCard