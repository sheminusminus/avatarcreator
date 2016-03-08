import React from 'react';

var PushPad = React.createClass({
	render: function() {
		var classes = "pad " + this.props.side;
		if (this.props.isActive == "true") {
		classes += " active";
		}
		return (
			<div className={classes}>
			</div>
		)
	}
});

var PushToggle = React.createClass({
	toggleActive: function(evt) {
		var pads = document.querySelectorAll('.' + this.props.category);
		for (var i = 0; i < pads.length; i++) {
			pads[i].classList.toggle('active');
		}
	},
	render: function() {
		return (
			<div className="pushToggle" onClick={this.toggleActive} category="build" >
				<PushPad isActive="true" side="build left" />
				<PushPad isActive="false" side="build right" />
			</div>
		)
	}
});

export default PushToggle;