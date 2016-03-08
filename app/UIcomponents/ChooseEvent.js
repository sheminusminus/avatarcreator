import React from 'react';

var ChooseEvent = React.createClass({
	getEvents: function() {
		var events = [];
		var db = localStorage;
		db.forEach(function(item, index) {
			if (item.split('?')[0] == 'Event') {
				var itemVal = db.getItem(item);
				var k = 'evt' + index;
				 events.push(
					<option key={k} value={itemVal}>{itemVal}</option> 
				 );
			}
		});	
		return events;
	},
	render: function() {
		return (
			<div className="chooseEvent">
				<h5>What are you going to own today?</h5>
				<select className="eventSelect" id="event-select">
				
				</select>
			</div>
		)
	}
});

export default ChooseEvent;