import React from 'react';
import { WALL_OPACITY } from '../../simulation/constants';

class Arena extends React.Component {

  constructor(props) {
    super(props);
    this.width = props.width || 200;
    this.length = props.length || 200;
    this.groundMaterial = props.groundMaterial || 'src: assets/ground.jpg;';
    this.wallHeight = props.wallHeight || 8;
  }

  render () {
    return (
      <a-entity position='0 0 0' rotation='0 0 0'>

        <a-plane static-body rotation='-90 0 0'
        height={this.length}
        width={this.width}
        color='white'
        opacity={`${WALL_OPACITY}`}
        src='#ground' />
        {/*material={this.groundMaterial} />*/}

        {/* Outside Walls */}
        <a-entity position={`${-this.width/2} ${this.wallHeight/2} 0`}
        mixin='wall'
        geometry={`depth: ${this.length}`}/>
        <a-entity position={`${this.width/2} ${this.wallHeight/2} 0`}
        mixin='wall'
        geometry={`depth: ${this.length}`}/>
        <a-entity position={`0 ${this.wallHeight/2} ${-this.length/2}`} rotation='0 90 0'
        mixin='wall'
        geometry={`depth: ${this.width}`}/>
        <a-entity position={`0 ${this.wallHeight/2} ${this.length/2}`} rotation='0 90 0'
        mixin='wall'
        geometry={`depth: ${this.width}`}/>

        {/* Obstruction Walls (Don't exist yet) */}

        {this.props.children}

      </a-entity>
    )
  }
}

module.exports = Arena;
