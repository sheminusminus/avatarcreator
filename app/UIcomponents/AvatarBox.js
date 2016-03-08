import React from 'react';
import SVG from './SVG';

var AvatarBox = React.createClass({
	getInitialState: function() {
		return {
			fBodyImgs: [],
			mBodyImgs: [],
			hairImgs: [],
			bangsImgs: [],
			eyesImgs: [],
			irisImgs: [],
			noseImgs: [],
			mouthImgs: []	
		};
	},
	componentWillMount: function() {
		this.setState({
			fBodyImgs: ['', '', ''],
			mBodyImgs: ['', '', ''],
			hairImgs: ['', '', '', '', '', ''],
			bangsImgs: ['', '', '', ''],
			eyesImgs: ['', '', ''],
			irisImgs: ['', '', ''],
			noseImgs: ['', '', ''],
			mouthImgs: ['', '', '']	
		});
	},	
	render: function() {
		var bodyImg = '';
		var hairImg = '';
		var bangsImg = '';
		var eyesImg = '';
		var irisImg = '';
		var noseImg = '';
		var mouthImg = '';
		if (this.state.style == 0) {
			bodyImg = this.state.fBodyImgs[this.props.size];
		}
		else if (this.state.style == 1) {
			bodyImg = this.state.mBodyImgs[this.props.size];
		}
		hairImg = this.state.hairImgs[this.props.hairstyle];
		bangsImg = this.state.bangsImgs[this.props.bangs];
		eyesImg = this.state.eyesImgs[this.props.eyes];
		irisImg = this.state.irisImgs[this.props.irises];
		noseImg = this.state.noseImgs[this.props.nose];
		mouthImg = this.state.mouthImgs[this.props.mouth];
		return (
			<div className="avatarBox">
				<SVG size={this.props.size} skin={this.props.skin} shape={this.props.shape} hairstyle={this.props.hairstyle} color={this.props.color} bangs={this.props.bangs} eyes={this.props.eyes} brows={this.props.brows} irises={this.props.irises} nose={this.props.nose} mouth={this.props.mouth} />
			</div>
		)
	}
});

export default AvatarBox;