import React from 'react';

var Header = React.createClass({
	render: function() {
		return (
			<div className="appHeader">
				<div className="logoTitle">
					<h2 className="h2">avatar builder</h2>
				</div>
				<div className="headerOptionGroup">
					<div className="headerOption save">
						<input type="button" className="headerBtn" id="connect-calendar" value="connect" onClick={this.props.connect} />
					</div>
					<div className="headerOption misc">
						<input type="button" className="headerBtn" id="animate-avatar" value="conquer" onClick={this.props.anim} />
					</div>
					<div className="headerOption reset">
						<input type="button" className="headerBtn" id="reset-avatar" value="reset" onClick={this.props.reset} />
					</div>
					<div className="headerOption done">
						<input type="button" className="headerBtn" id="load-avatar" value="load" onClick={this.props.load} />
					</div>
					<div className="headerOption done">
						<input type="button" className="headerBtn" id="save-progress" value="save" onClick={this.props.save} />
					</div>
				</div>
			</div>
		)
	}
});

export default Header;