import React from 'react';

class TankBody extends React.Component {

  constructor(props) {
    super(props);
    this.position = props.position || '0 0 0';
    this.rotation = props.rotation || '0 0 0';
    this.socket = props.socket;
    this.radius = props.radius || 2.5;
    this.material = props.material || 'color: red;'
  }
  // TODO: Why is kinematic body shape not setting??
  render () {
    return (
      <a-sphere id='tankBody'
      radius='2.49'
      material='opacity: 0;'
      position={this.position}
      rotation={this.rotation}
      kinematic-body
      socket-controls={`characterId: ${this.props.characterId}; enabled: ${!!this.props.characterId}`}>
        <a-sphere
        id={this.props.bodyId}
        position='0 0 0'
        rotation='0 0 0'
        material={this.material}
        radius={this.radius}>
          <a-torus
          position='0 0 0'
          rotation='90 0 0'
          material={this.material}
          radius={this.radius}
          radius-tubular={0.1}/>

          <a-sphere // Windows
          position={`0 0.6 ${0.4 - this.radius}`}
          radius='0.5'
          scale='2.5 1 1.5'
          material='color:black; opacity:0.4;'/>
          <a-sphere
          position={`${-(this.radius - 0.5)} 0.6 -1`}
          radius='0.4'
          material='color:black; opacity:0.4;'/>
          <a-sphere
          position={`${this.radius - 0.5} 0.6 -1`}
          radius='0.4'
          material='color:black; opacity:0.4;'/>

          {this.props.children}

        </a-sphere>
      </a-sphere>
    )
  }
}

module.exports = TankBody;
