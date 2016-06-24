import React from 'react';

class TankBody extends React.Component {

  constructor(props) {
    super(props);
    this.radius = props.radius || 2.5;
    this.material = props.material || 'color: red;'
  }

  render () {
    return (
      <a-sphere
      position='0 0 0'
      rotation={this.props.rotation}
      material={this.material}
      socket-controls={`simulationAttribute: tankRotation; characterId: ${this.props.characterId}`}
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
    )
  }
}

module.exports = TankBody;
