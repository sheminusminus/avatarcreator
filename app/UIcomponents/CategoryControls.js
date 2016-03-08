import React from 'react';
import Option from './Option';

var CategoryControls = React.createClass({
	getInitialState: function() {
		return {
			optionsList: []	
		};	
	},
	componentWillMount: function() {
		this.setState({
			optionsList: this.props.options
		});
	},
	makeOptions: function() {
		var optionsEls = [];
		if (this.state.optionsList.length) {
			for (var i = 0; i < this.state.optionsList.length; i++) {
				var key = this.props.categoryTitle + i;
				optionsEls.push(
					<Option index={i} key={key} optionTitle={this.state.optionsList[i]} bodyPart={this.props.categoryTitle} rightArrow={this.props.rightArrow} leftArrow={this.props.leftArrow} />
				);
			}
		}
		return optionsEls;
	},
	render: function() {
		var controlClasses = "categoryControls";
		var classes = "categoryOptions";
		if (this.props.activeControl == this.props.categoryTitle) {
			controlClasses += " open";
			classes += " active";
		}
		var opts = this.makeOptions();
		var handlerLeft = "this.props.swapL" + this.props.categoryTitle;
		var handlerRight = "this.props.swapR" + this.props.categoryTitle;
		return (
			<div className={controlClasses} onClick={this.props.categoryToggle}>
				<h4 className="categoryTitle">{this.props.categoryTitle}</h4>
				<div className={classes}>
					{opts}
				</div>
			</div>
		)
	}
});

export default CategoryControls;