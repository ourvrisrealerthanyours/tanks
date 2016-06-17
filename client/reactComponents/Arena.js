import React from 'react';
// import Wall from './Wall';

class Arena extends React.Component {

  constructor(props) {
    super(props);
    this.width = props.width || 200;
    this.length = props.length || 200;
    this.groundMaterial = props.groundMaterial || 'color: grey;';
    this.wallMaterial = props.wallMaterial || 'color: brown;';
  }

  render () {
    return (
      <a-entity position='0 0 0' rotation='0 0 0'>
        <a-plane static-body rotation='-90 0 0'
        height={this.length} width={this.width}  
        material={this.groundMaterial} />

        {this.props.children}

      </a-entity>
    )
  }
}

module.exports = Arena;
