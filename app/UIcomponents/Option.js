import React from 'react';

var Option = React.createClass({
	render: function() {
		var classes = "option " + this.props.optionTitle;
		var leftClasses = "arrowBox left " + this.props.optionTitle;
		var rightClasses = "arrowBox right " + this.props.optionTitle;
		return (
			<div className={classes}>
				<div className={leftClasses} onClick={this.props.leftArrow}></div>
				<h5 className="optionTitle">{this.props.optionTitle}</h5>
				<div className={rightClasses} onClick={this.props.rightArrow}></div>
			</div>
		)
	}
});

export default Option;