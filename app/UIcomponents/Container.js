import React from 'react';
import CategoryBox from './CategoryBox';
import AvatarBox from './AvatarBox';

var Container = React.createClass({
	
	render: function() {
		
		return (
			<div className="uiContainer">
				<CategoryBox leftArrow={this.props.leftArrow} rightArrow={this.props.rightArrow} />
				<AvatarBox style={this.props.style} size={this.props.size} skin={this.props.skin} shape={this.props.shape} eyes={this.props.eyes} brows={this.props.brows} irises={this.props.irises} nose={this.props.nose} mouth={this.props.mouth} color={this.props.color} hairstyle={this.props.hairstyle} bangs={this.props.bangs} facial={this.props.facial} top={this.props.top} bottoms={this.props.bottoms} />
			</div>
		)
	}
});

export default Container;