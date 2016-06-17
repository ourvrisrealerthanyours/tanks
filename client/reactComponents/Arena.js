import React from 'react';

class Arena extends React.Component {

  constructor(props) {
    super(props);
    this.width = props.width || 200;
    this.length = props.length || 200;
    this.groundMaterial = props.groundMaterial || 'color: grey;';
    this.wallMaterial = props.wallMaterial || 'color: brown;';
    this.wallHeight = props.wallHeight || 8;
  }

  render () {
    return (
      <a-entity position='0 0 0' rotation='0 0 0'>
        
        <a-plane static-body rotation='-90 0 0'
        height={this.length} width={this.width}  
        material={this.groundMaterial} />

        <a-box position={`${-this.width/2} ${this.wallHeight/2} 0`}
        material={this.wallMaterial}
        depth={this.length} width={0.5} height={this.wallHeight} />
        <a-box position={`${this.width/2} ${this.wallHeight/2} 0`}
        material={this.wallMaterial}
        depth={this.length} width={0.5} height={this.wallHeight} />
        <a-box position={`0 ${this.wallHeight/2} ${-this.length/2}`}
        material={this.wallMaterial}
        depth={0.5} width={this.width} height={this.wallHeight} />
        <a-box position={`0 ${this.wallHeight/2} ${this.length/2}`}
        material={this.wallMaterial}
        depth={0.5} width={this.width} height={this.wallHeight} />

        {this.props.children}

      </a-entity>
    )
  }
}

module.exports = Arena;
