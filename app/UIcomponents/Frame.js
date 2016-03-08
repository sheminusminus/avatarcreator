import React from 'react';

var Frame = React.createClass({
	render: function() {
		return (
			<div className="connectFrame" id="authorize-div">
				<iframe src="connect.html" width="400" height="300"></iframe>
			</div>
		)
	}
});

export default Frame;