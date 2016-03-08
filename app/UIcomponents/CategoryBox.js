import React from 'react';
import CategoryControls from './CategoryControls';

var CategoryBox = React.createClass({
	getInitialState: function() {
		return {
			activeCategory: ''	
		};
	},
	componentWillMount: function() {
		this.setState({
			activeCategory: 'Body'
		});
	},
	categoryToggle: function(evt) {
		console.log(evt.target);
		var controls = document.querySelectorAll('.categoryControls');
		for (var i = 0; i < controls.length; i++) {
			controls[i].classList.remove('open');
		}
		if (evt.target.classList.contains('categoryControls')) {
			evt.target.classList.add('open');
		}
		else if (evt.target.parentNode.classList.contains('categoryControls')) {
			evt.target.parentNode.classList.add('open');
		}
		var opts = document.querySelectorAll('.categoryOptions');
		for (var i = 0; i < opts.length; i++) {
			opts[i].classList.remove('active');
			if (opts[i].parentNode == evt.target || opts[i].parentNode == evt.target.parentNode) {
				opts[i].classList.add('active');
			}
		}
	},
	render: function() {
		var active = this.state.activeCategory;
		return (
			<div className="categoryBox">
				<CategoryControls categoryTitle="Body" leftArrow={this.props.leftArrow} rightArrow={this.props.rightArrow} categoryToggle={this.categoryToggle} activeControl={active} options={["style", "size", "skin"]} />
				<CategoryControls categoryTitle="Face" leftArrow={this.props.leftArrow} rightArrow={this.props.rightArrow} categoryToggle={this.categoryToggle} activeControl={active} options={["shape", "eyes", "brows", "irises", "nose", "mouth"]} />
				<CategoryControls categoryTitle="Hair" leftArrow={this.props.leftArrow} rightArrow={this.props.rightArrow} categoryToggle={this.categoryToggle} activeControl={active} options={["color", "hairstyle", "bangs", "facial"]} />
				<CategoryControls categoryTitle="Clothing" leftArrow={this.props.leftArrow} rightArrow={this.props.rightArrow} categoryToggle={this.categoryToggle} activeControl={active} options={["top", "bottoms", "shoes", "professional"]} />
			</div>
		)
	}
});

export default CategoryBox;