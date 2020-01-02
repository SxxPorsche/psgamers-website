import React from 'react';
// import placeholder from '../../assets/placeholder.png';

interface ImageProps {
  src: string;
  backgroundColor?: string;
  loading?: boolean;
}

class SkeletonImage extends React.Component<ImageProps> {
  imageLoaded = () => {
    this.setState({ loading: false });
  };

  render() {
    return (
      <div>
        <img
          width="100%"
          height="100%"
          style={{ backgroundColor: this.props.backgroundColor }}
          src={this.props.src}
        />
        <div hidden>
          <img src={this.props.src} onLoad={this.imageLoaded.bind(this)} />
        </div>
      </div>
    );
  }
}

export default SkeletonImage;
