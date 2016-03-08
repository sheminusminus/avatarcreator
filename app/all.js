./index.js
import React from 'react';
import ReactDOM from 'react-dom';
import Main from './UIcomponents/Main';

ReactDOM.render(
	<Main />,
	document.querySelector('#app')
);./UIcomponents/AvatarBox.js
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

export default AvatarBox;./UIcomponents/CategoryBox.js
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

export default CategoryBox;./UIcomponents/CategoryControls.js
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

export default CategoryControls;./UIcomponents/ChooseEvent.js
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

export default ChooseEvent;./UIcomponents/Container.js
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

export default Container;./UIcomponents/Frame.js
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

export default Frame;./UIcomponents/Header.js
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

export default Header;./UIcomponents/Main.js
import React from 'react';
import Container from './Container';
import Header from './Header';
import Frame from './Frame';

var CLIENT_ID = '950786846976-cdvha9ia9ftkcq8q2qcr3383ugiafbh0.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar.readonly"];


var Main = React.createClass({
	getInitialState: function() {
		return {
			style: 0,
			size: 0,
			skin: 0,
			shape: 0,
			eyes: 0,
			brows: 0,
			irises: 0,
			nose: 0,
			mouth: 0,
			color: 0,
			hairstyle: 0,
			bangs: 0,
			facial: 0,
			top: 0,
			bottoms: 0,
			eventType: 0
		};	
	},
	handleLeft: function(evt) {
		evt.preventDefault();
		evt.stopPropagation();	
		var arrow = evt.target;
		if (arrow.classList.contains('size')) {
			console.log('size arrow');	
			this.changeSize(-1);	
		}
		else if (arrow.classList.contains('style')) {
			console.log('style arrow');
			this.changeStyle(-1);
		}
		else if (arrow.classList.contains('skin')) {
			console.log('skin arrow');
			this.changeSkin(-1);
		}
		else if (arrow.classList.contains('shape')) {
			console.log('shape arrow');
			this.changeShape(-1);
		}
		else if (arrow.classList.contains('eyes')) {
			console.log('eyes arrow');
			this.changeEyes(-1);
		}
		else if (arrow.classList.contains('brows')) {
			console.log('brows arrow');
			this.changeBrows(-1);
		}
		else if (arrow.classList.contains('irises')) {
			console.log('irises arrow');
			this.changeIris(-1);
		}
		else if (arrow.classList.contains('nose')) {
			console.log('nose arrow');
			this.changeNose(-1);
		}
		else if (arrow.classList.contains('mouth')) {
			console.log('mouth arrow');
			this.changeMouth(-1);
		}
		else if (arrow.classList.contains('color')) {
			console.log('color arrow');
			this.changeColor(-1);
		}
		else if (arrow.classList.contains('hairstyle')) {
			console.log('hairstyle arrow');
			this.changeHairstyle(-1);
		}
		else if (arrow.classList.contains('bangs')) {
			console.log('bangs arrow');
			this.changeBangs(-1);
		}
		else if (arrow.classList.contains('facial')) {
			console.log('facial arrow');
			this.changeFacial(-1);
		}
		else if (arrow.classList.contains('top')) {
			console.log('top arrow');
			this.changeTop(-1);
		}
		else if (arrow.classList.contains('bottoms')) {
			console.log('bottoms arrow');
			this.changeBottoms(-1);
		}
	},
	handleRight: function(evt) {
		evt.preventDefault();
		evt.stopPropagation();	
		var arrow = evt.target;
		if (arrow.classList.contains('size')) {
			console.log('size arrow');	
			this.changeSize(1);	
		}
		else if (arrow.classList.contains('style')) {
			console.log('style arrow');
			this.changeStyle(1);
		}
		else if (arrow.classList.contains('skin')) {
			console.log('skin arrow');
			this.changeSkin(1);
		}
		else if (arrow.classList.contains('shape')) {
			console.log('shape arrow');
			this.changeShape(1);
		}
		else if (arrow.classList.contains('eyes')) {
			console.log('eyes arrow');
			this.changeEyes(1);
		}
		else if (arrow.classList.contains('brows')) {
			console.log('brows arrow');
			this.changeBrows(1);
		}
		else if (arrow.classList.contains('irises')) {
			console.log('irises arrow');
			this.changeIris(1);
		}
		else if (arrow.classList.contains('nose')) {
			console.log('nose arrow');
			this.changeNose(1);
		}
		else if (arrow.classList.contains('mouth')) {
			console.log('mouth arrow');
			this.changeMouth(1);
		}
		else if (arrow.classList.contains('color')) {
			console.log('color arrow');
			this.changeColor(1);
		}
		else if (arrow.classList.contains('hairstyle')) {
			console.log('hairstyle arrow');
			this.changeHairstyle(1);
		}
		else if (arrow.classList.contains('bangs')) {
			console.log('bangs arrow');
			this.changeBangs(1);
		}
		else if (arrow.classList.contains('facial')) {
			console.log('facial arrow');
			this.changeFacial(1);
		}
		else if (arrow.classList.contains('top')) {
			console.log('top arrow');
			this.changeTop(1);
		}
		else if (arrow.classList.contains('bottoms')) {
			console.log('bottoms arrow');
			this.changeBottoms(1);
		}
	},
	changeSize: function(n) {
		console.log(this.state.size);
		var newSize = this.state.size + n;
		if (newSize < 0) {
			newSize = 2;
		}
		else if (newSize > 2) {
			newSize = 0;
		}
		this.setState({
			size: newSize
		});
		console.log(this.state.size);
	},
	changeStyle: function(n) {
		var newStyle = 0;
		if (this.state.style == 0) {
			newStyle = 1;
		}
		this.setState({
			style: newStyle
		});
	},
	changeSkin: function(n) {
		var newSkin = this.state.skin + n;
		if (newSkin < 0) {
			newSkin = 2;
		}
		else if (newSkin > 2) {
			newSkin = 0;
		}
		this.setState({
			skin: newSkin
		});
	},
	changeShape: function(n) {
		var newShape = this.state.shape + n;
		if (newShape < 0) {
			newShape = 2;
		}
		else if (newShape > 2) {
			newShape = 0;
		}
		this.setState({
			shape: newShape
		});
	},
	changeEyes: function(n) {
		var newEyes = this.state.eyes + n;
		if (newEyes < 0) {
			newEyes = 2;
		}
		else if (newEyes > 2) {
			newEyes = 0;
		}
		this.setState({
			eyes: newEyes
		});
	},
	changeBrows: function(n) {
		var newBrows = this.state.brows + n;
		if (newBrows < 0) {
			newBrows = 2;
		}
		else if (newBrows > 2) {
			newBrows = 0;
		}
		this.setState({
			brows: newBrows
		});
	},
	changeIris: function(n) {
		var newIris = this.state.irises + n;
		if (newIris < 0) {
			newIris = 2;
		}
		else if (newIris > 2) {
			newIris = 0;
		}
		this.setState({
			irises: newIris
		});
	},
	changeNose: function(n) {
		var newNose = this.state.nose + n;
		if (newNose < 0) {
			newNose = 3;
		}
		else if (newNose > 3) {
			newNose = 0;
		}
		this.setState({
			nose: newNose
		});
	},
	changeMouth: function(n) {
		var newMouth = this.state.mouth + n;
		if (newMouth < 0) {
			newMouth = 2;
		}
		else if (newMouth > 2) {
			newMouth = 0;
		}
		this.setState({
			mouth: newMouth
		});
	},
	changeColor: function(n) {
		var newColor = this.state.color + n;
		if (newColor < 0) {
			newColor = 4;
		}
		else if (newColor > 4) {
			newColor = 0;
		}
		this.setState({
			color: newColor
		});
	},
	changeHairstyle: function(n) {
		var newHair = this.state.hairstyle + n;
		if (newHair < 0) {
			newHair = 4;
		}
		else if (newHair > 4) {
			newHair = 0;
		}
		this.setState({
			hairstyle: newHair
		});
	},
	changeBangs: function(n) {
		var newBangs = this.state.bangs + n;
		if (newBangs < 0) {
			newBangs = 4;
		}
		else if (newBangs > 4) {
			newBangs = 0;
		}
		this.setState({
			bangs: newBangs
		});
	},
	changeFacial: function(n) {
		var newFacial = this.state.facial + n;
		if (newFacial < 0) {
			newFacial = 2;
		}
		else if (newFacial > 2) {
			newFacial = 0;
		}
		this.setState({
			facial: newFacial
		});
	},
	changeTop: function(n) {
		var newTop = this.state.top + n;
		if (newTop < 0) {
			newTop = 2;
		}
		else if (newTop > 2) {
			newTop = 0;
		}
		this.setState({
			top: newTop
		});
	},
	changeBottoms: function(n) {
		var newBottoms = this.state.bottoms + n;
		if (newBottoms < 0) {
			newBottoms = 2;
		}
		else if (newBottoms > 2) {
			newBottoms = 0;
		}
		this.setState({
			bottoms: newBottoms
		});
	},
/*
	playAnimation: function() {
		var apiString = '0=' + this.state.style + '&1=' + this.state.size + '&2=' + this.state.skin + '&3=' + this.state.shape + '&4=' + this.state.eyes + '&5=' + this.state.brows + '&6=' + this.state.irises + '&7=' + this.state.nose + '&8=' + this.state.mouth + '&9=' + this.state.color + '&10=' + this.state.hairstyle + '&11=' + this.state.bangs + '&12=' + this.state.facial + '&13=' + this.state.top + '&14=' + this.state.bottoms;
		window.location = 'animate.html?' + apiString;
	},
*/
	playAnimation: function() {
		var apiString = this.state.style + "!" + this.state.size + "!" + this.state.skin + "!" + this.state.shape + "!" + this.state.eyes + "!" + this.state.brows + "!" + this.state.irises + "!" + this.state.nose + "!" + this.state.mouth + "!" + this.state.color + "!" + this.state.hairstyle + "!" + this.state.bangs + "!" + this.state.facial + "!" + this.state.top + "!" + this.state.bottoms + "!" + this.state.eventType;
		window.location = 'animate.html?' + apiString;
	},
	handleReset: function() {
		if (confirm("Are you sure you want to reset everything?")) {
			this.setState({
				style: 0,
				size: 0,
				skin: 0,
				shape: 0,
				eyes: 0,
				brows: 0,
				irises: 0,
				nose: 0,
				mouth: 0,
				color: 0,
				hairstyle: 0,
				bangs: 0,
				facial: 0,
				top: 0,
				bottoms: 0
			});
		}
	},
	handleSave: function() {
		var db = localStorage;
		db.clear();
		db.setItem("style", this.state.style);
		db.setItem("size", this.state.size);
		db.setItem("skin", this.state.skin);
		db.setItem("shape", this.state.shape);
		db.setItem("eyes", this.state.eyes);
		db.setItem("brows", this.state.brows);
		db.setItem("irises", this.state.irises);
		db.setItem("nose", this.state.nose);
		db.setItem("mouth", this.state.mouth);
		db.setItem("color", this.state.color);
		db.setItem("hairstyle", this.state.hairstyle);
		db.setItem("bangs", this.state.bangs);
		db.setItem("facial", this.state.facial);
		db.setItem("top", this.state.top);
		db.setItem("bottoms", this.state.bottoms);
		console.log(db);
	},
	handleLoad: function() {
		var db = localStorage;
		if (confirm("Discard current avatar and load last saved?")) {
			var st = db.getItem("style") || 0;
			var sz = db.getItem("size") || 0;
			var sk = db.getItem("skin") || 0;
			var sh = db.getItem("shape") || 0;
			var ey = db.getItem("eyes") || 0;
			var br = db.getItem("brows") || 0;
			var ir = db.getItem("irises") || 0;
			var ns = db.getItem("nose") || 0;
			var mth = db.getItem("mouth") || 0;
			var cr = db.getItem("color") || 0;
			var hs = db.getItem("hairstyle") || 0;
			var bg = db.getItem("bangs") || 0;
			var fc = db.getItem("facial") || 0;
			var tp = db.getItem("top") || 0;
			var btm = db.getItem("bottoms") || 0;
			this.setState({
				style: st,
				size: sz,
				skin: sk,
				shape: sh,
				eyes: ey,
				brows: br,
				irises: ir,
				nose: ns,
				mouth: mth,
				color: cr,
				hairstyle: hs,
				bangs: bg,
				facial: fc,
				top: tp,
				bottoms: btm
			});
		}
	},
	handleConnect: function(evt) {
		var frame = document.querySelector('.connectFrame');
		if (!frame.classList.contains('connected')) {
			frame.classList.add('show');
			var out = frame.querySelector('#output');
			if (out.textContent) {
				frame.classList.remove('show');
			}
		}		
	},
	render: function() {
		var avatarSize = this.state.size;
		var avatarStyle = this.state.style;
		var avatarSkin = this.state.skin;
		var avatarShape = this.state.shape;
		var avatarEyes = this.state.eyes;
		var avatarBrows = this.state.brows;
		var avatarIrises = this.state.irises;
		var avatarNose = this.state.nose;
		var avatarMouth = this.state.mouth;
		var avatarColor = this.state.color;
		var avatarHairstyle = this.state.hairstyle;
		var avatarBangs = this.state.bangs;
		var avatarFacial = this.state.facial;
		var avatarTop = this.state.top;
		var avatarBottoms = this.state.bottoms;
		return (
			<div className="renderApp">
				<Header load={this.handleLoad} anim={this.playAnimation} reset={this.handleReset} save={this.handleSave} connect={this.handleConnect} />
				<Container leftArrow={this.handleLeft} rightArrow={this.handleRight} style={avatarStyle} size={avatarSize} skin={avatarSkin} shape={avatarShape} eyes={avatarEyes} brows={avatarBrows} irises={avatarIrises} nose={avatarNose} mouth={avatarMouth} color={avatarColor} hairstyle={avatarHairstyle} bangs={avatarBangs} facial={avatarFacial} top={avatarTop} bottoms={avatarBottoms} />
				<Frame />
			</div>
		)
	}
});

export default Main;./UIcomponents/Option.js
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

export default Option;./UIcomponents/PushToggle.js
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

export default PushToggle;./UIcomponents/SVG.js
import React from 'react';

var SVG = React.createClass({
	getHairPath: function() {
		var hair = [];
		var color = this.getHairColor();
		if (this.props.hairstyle == 4) {
			hair.push(
				<path fill={color} stroke={color} strokeWidth="1" stroke-miterlimit="10" d="M158.942,161.204H60.989 c0-76.895-7.926-139.23,48.977-139.23 C165.401,21.974,158.942,84.31,158.942,161.204" />
			);
		}	
		else if (this.props.hairstyle == 3) {
			hair.push(
			<path fill={color} stroke={color} strokeWidth="1" stroke-miterlimit="10" d="M156.588,62.381c0,21.344,0,121.544-47.873,121.544 c-40.926,0-45.301-100.2-45.301-121.544c0-21.342,22.783-38.938,44.125-38.938S156.588,41.039,156.588,62.381" />
			);
		}
		else if (this.props.hairstyle == 2) {
			hair.push(
				<path fill={color} stroke={color} stroke-width="0.75" stroke-miterlimit="10" d="M62.505,192.434 c-1.012,0.352,0.428-5.676-0.783-10.365c-1.912-7.416-1.98-17.482,2.803-17.279C75.441,165.256,68.253,190.436,62.505,192.434"/>, <path fill={color} stroke={color} stroke-width="0.75" stroke-miterlimit="10" d="M65.017,133.506 c-2.436-2.301,12.857-19.666,19.822-13.252C91.625,126.502,77.736,145.516,65.017,133.506"/>, <path fill={color} stroke={color} stroke-width="0.75" stroke-miterlimit="10" d="M72.634,129.08 c2.627-0.865-3.863-23.07-11.324-20.742C54.042,110.605,58.916,133.594,72.634,129.08"/>, <path fill={color} stroke={color} stroke-width="0.75" stroke-miterlimit="10" d="M63.339,147.77 c-2.006-1.902,13.354-19.207,19.104-13.914C88.042,139.014,73.812,157.715,63.339,147.77"/>, <path fill={color} stroke={color} stroke-width="0.75" stroke-miterlimit="10" d="M71.792,144.154 c2.627-0.865-3.863-23.072-11.324-20.742C53.201,125.68,58.074,148.668,71.792,144.154"/>, <path fill={color} stroke={color} stroke-width="0.75" stroke-miterlimit="10" d="M64.214,160.176 c-2.238-1.627,10.729-20.789,17.119-16.291C87.562,148.268,75.896,168.666,64.214,160.176"/>, <path fill={color} stroke={color} stroke-width="0.75" stroke-miterlimit="10" d="M74.458,156.324 c2.494-1.201-6.842-22.369-13.934-19.086C53.615,140.436,61.449,162.592,74.458,156.324"/>, <path fill={color} stroke={color} stroke-width="0.75" stroke-miterlimit="10" d="M61.888,173.855 c-2.238-1.625,10.729-20.787,17.119-16.291C85.236,161.947,73.57,182.346,61.888,173.855"/>, <path fill={color} stroke={color} stroke-width="0.75" stroke-miterlimit="10" d="M75.343,169.898 c2.492-1.199-6.844-22.369-13.936-19.086C54.498,154.012,62.332,176.166,75.343,169.898"/>, <path fill={color} stroke={color} stroke-width="0.75" stroke-miterlimit="10" d="M73.72,125.594 c-20.557,0.494-26.969-98.852,31.1-100.762C161.393,22.971,181.039,123.016,73.72,125.594"/>	
			);
		}
		else if (this.props.hairstyle == 1) {
			hair.push(
			<path fill={color} stroke={color} strokeWidth="1" stroke-miterlimit="10" d="M160.289,84.328c0-2.354-0.934-4.475-2.432-5.984 c0.062-0.232,0.121-0.469,0.166-0.709c1.938-1.512,3.195-3.926,3.195-6.656c0-2.441-1.008-4.629-2.604-6.146 c1.598-1.623,1.809-4.283,0.379-6.299c-0.238-0.334-0.512-0.629-0.803-0.887c2.369-2.717,2.6-6.916,0.32-10.131 c-1.361-1.918-3.352-3.107-5.445-3.471c-0.26-0.719-0.615-1.416-1.078-2.07c-1.314-1.855-3.217-3.029-5.232-3.438 c0.281-2.037-0.197-4.219-1.512-6.074c-2.463-3.475-6.984-4.567-10.465-2.676c-1.822-1.726-4.262-2.519-6.6-2.246 c-0.098-0.16-0.193-0.321-0.301-0.476c-2.65-3.737-7.68-4.724-11.232-2.204c-0.496,0.352-0.932,0.756-1.314,1.196 c-1.971-2.044-4.756-2.933-7.357-2.462c-2.689-3.543-7.576-4.443-11.055-1.977c-0.842,0.596-1.52,1.34-2.037,2.171 c-2.232-0.646-4.674-0.335-6.656,1.071c-1.666,1.182-2.705,2.928-3.072,4.83c-3.24-1.879-7.564-1.153-10.23,1.925 c-1.488,1.718-2.178,3.845-2.094,5.898c-2.047,0.211-4.053,1.195-5.541,2.914c-1.541,1.777-2.221,3.992-2.078,6.113 c-0.635,0.424-1.227,0.934-1.754,1.541c-1.859,2.145-2.471,4.928-1.887,7.412c-0.748,1.311-0.838,2.959-0.195,4.43 c-1.588,1.518-2.592,3.699-2.592,6.133c0,2.273,0.871,4.33,2.279,5.828c-1.408,1.5-2.279,3.557-2.279,5.83 c0,2.354,0.936,4.473,2.434,5.982c-0.203,0.734-0.316,1.51-0.316,2.312c0,2.348,0.93,4.463,2.422,5.971 c-1.732,1.607-1.998,4.367-0.525,6.443c0.729,1.029,1.76,1.707,2.867,2c-0.617,1.51-0.453,3.334,0.596,4.812 c0.078,0.111,0.164,0.215,0.248,0.318c-0.711,1.543-0.574,3.463,0.52,5.006c0.785,1.105,1.918,1.811,3.121,2.062 c-0.984,2.49-0.701,5.482,1.021,7.914c1.328,1.873,3.256,3.055,5.293,3.449c-0.674,1.533-0.529,3.416,0.549,4.934 c1.066,1.506,2.775,2.266,4.43,2.152c0.145,0.662,0.418,1.314,0.84,1.91c1.322,1.863,3.625,2.584,5.594,1.918 c0.076,0.877,0.379,1.756,0.934,2.537c1.596,2.25,4.623,2.844,6.764,1.326c0.107-0.074,0.207-0.158,0.307-0.24 c0.057,0.088,0.111,0.18,0.174,0.27c1.438,2.027,4.039,2.705,6.105,1.707c2.531,2.816,6.561,3.611,9.748,1.926 c0.096,0.174,0.199,0.348,0.318,0.516c1.594,2.25,4.623,2.844,6.764,1.326c0.797-0.564,1.357-1.346,1.664-2.213 c1.666,1.832,4.389,2.23,6.361,0.832c0.459-0.326,0.836-0.725,1.135-1.168c1.674,1.664,4.273,1.984,6.174,0.637 c1.137-0.803,1.789-2.043,1.918-3.363c0.984,0.035,1.975-0.23,2.826-0.832c1.303-0.924,1.971-2.418,1.939-3.955 c0.947,0.012,1.895-0.258,2.713-0.836c1.076-0.766,1.723-1.918,1.896-3.164c1.092,0.115,2.209-0.141,3.156-0.811 c2.02-1.434,2.523-4.232,1.232-6.436c0.115-0.074,0.232-0.139,0.346-0.219c2.697-1.912,3.764-5.293,2.967-8.445 c2.012-1.551,2.4-4.51,0.842-6.707c-0.111-0.158-0.23-0.305-0.355-0.445c0.441-0.199,0.869-0.436,1.279-0.725 c2.605-1.848,3.688-5.068,3.037-8.129c2.039-1.543,2.439-4.523,0.873-6.732c-0.34-0.477-0.744-0.875-1.189-1.197 C159.332,88.846,160.289,86.707,160.289,84.328" />
			);
		}
		else {
			hair.push(
				<path fill={color} stroke={color} strokeWidth="1" stroke-miterlimit="10" d="M157.076,83.831c-0.059-0.054-0.125-0.093-0.186-0.142 c4.168-3.998,5.92-10.249,2.561-13.342c-0.346-0.32-0.719-0.564-1.105-0.77c1.398-5.443,0.283-11.338-3.301-12.152 c-0.059-0.014-0.115-0.013-0.172-0.023c0.916-4.119,0.297-8.093-2.17-9.387c0.998-0.815,1.816-1.66,2.402-2.519 c0.602-0.888-1.4-0.921-4.137-1.169c0.049-3.443-1.236-6.482-3.992-7.503c-0.605-0.224-1.201-0.319-1.791-0.323 c-1.785-5.006-6.91-8.754-11.254-9.082c-3.256-4.323-9.449-6.332-13.732-5.225c-1.928-3.701-9.902-3.289-15.338,0.248 c-2.955-1.625-8.475,0.146-12.398,3.648c-0.018-0.014-0.031-0.029-0.051-0.041c-3.332-2.127-8.838,1.901-11.584,7.299 c-4.062-1.372-9.56,4.846-10.763,11.359c-2.616,1.135-5.047,4.677-6.157,8.69c-2.851-0.041-4.952-0.257-4.437,0.714 c0.766,1.438,2.102,2.902,3.82,4.31c0,0.009,0,0.019,0,0.027c-0.137,0.026-0.274,0.044-0.414,0.087 c-4.121,1.287-4.297,9.295-1.15,15.074c-3.743,1.574-3.896,9.077-0.982,14.676c-1.33,1.705-1.496,4.672-0.719,7.767 c-2.072,3.103-4.391,5.389-3.071,5.561c1.481,0.191,3.265,0.006,5.204-0.477c0.006,0.008,0.011,0.016,0.017,0.023 c-3.133,2.635-1.825,10.494,2.271,15.396c-0.109,0.463-0.211,0.924-0.293,1.381c-1.019,5.562-7.642,10.861-5.607,11.127 c2.738,0.354,6.498-0.578,10.389-2.301c1.092,6.824,7.113,15.117,15.413,11.77c-1.421,1.902-2.419,3.172-1.45,3.299 c3.078,0.4,7.445-0.824,11.839-2.973c2.145,0.711,4.586,0.643,7.254-0.643c0.242-0.117,0.369-0.43,0.398-0.889 c2.572,2.283,5.926,3.398,9.791,1.982c3.705,2.09,7.34,1.393,10.334-0.623c3.248,1.732,6.441,1.695,9.219,0.619 c3.363,1.328,6.543,2.004,8.939,1.693c1.025-0.135-0.15-1.549-1.697-3.631c7.02,2.186,13.402-3.342,15.318-8.895 c2.111,0.566,4.053,0.797,5.646,0.59c2.037-0.266-4.588-5.564-5.605-11.127c-0.082-0.443-0.18-0.889-0.285-1.338 c1.754-3.758,1.943-7.639-0.379-9.273c-0.021-0.016-0.047-0.025-0.072-0.041c3.627-4.193,5.305-10.097,3.098-12.826 c1.447,0.27,2.787,0.352,3.938,0.201c1.248-0.163-0.762-2.221-2.736-5.07C158.621,87.265,158.479,85.119,157.076,83.831" />
				);
		}
		return hair;
	},
	getHairColor: function() {
		if (this.props.color == 4) {
			return "#8E8683";
		}
		else if (this.props.color == 3) {
			return "#2C222A";
		}
		else if (this.props.color == 2) {
			return "#DDD0BB";
		}
		else if (this.props.color == 1) {
			return "#B8513E";
		}
		else {
			return "#5A4337";
		}
	},
	getBodyPath: function() {
		if (this.props.size == 2) {
			return "M109.747,313.426c1.922,9.85-1.086,24.332-3.362,46.976 c-2.278,22.646-7.906,46.211-9.103,53.736c-1.196,7.527-0.604,30.773-1.916,39.92c0.616,9.424-2.119,15.205-0.394,45.812 c1.731,30.691-5.673,44.906-4.614,52.914c1.061,8.008,5.365,11.578,4.271,17.803c-1.092,6.227-3.396,30.83-6.564,38.68 c-2.928,7.258-18.885,4.848-25.311,2.609c-6.428-2.242-11.348-5.814-10.257-10.703s21.267-14.76,20.604-47.541 c-0.172-8.496-9.61-40.051-12.281-50.287c-2.67-10.235-1.561-23.13-1.536-33.362c0.025-10.229-3.039-13.687-0.057-29.006 c0.502-7.02-2.763-34.818-7.147-56.166c-4.383-21.35-5.063-66.901-3.691-86.071c1.372-19.173,4-29.639,4.502-31.085 c1.616-7.94,3.35-12.069,12.834-37.506c3.729-9.997,0.224-13.91-3.88-17.243c-10.646-8.652-8.703-16.938-9.364-25.624 c-5.819,24.587-18.739,40.593-23.75,56.496c-0.794,2.333-1.604,7.854-1.643,10.374c1.418,21.752-8.742,49.227-2.837,67.623 c5.832,18.166,8.681,22.838,8.771,32.201c0.167,16.868-6.6-11.369-11.136-4.301c-1.228,1.912,0.504,9.033,1.481,12.435 c0.766,2.67,7.745,18.777,4.193,18.777c-4.359,0-10.502-19.773-12.996-26.421c-2.491-6.645-0.757-20.82-0.757-26.637 c0-5.815-2.218-32.163-3.121-39.391c-2.622-20.983,0.319-42.132,0.006-47.561c0.347-3.062,2.618-9.857,4.375-14.357 c1.663-2.493,18.291-55.785,20.391-62.314c3.909-8.977,5.651-16.832,12.993-22.138c8.328-6.019,14.385,0,34.518-8.488 c3.865-3.559,11.603-8.968,14.428-20.261c3.02-12.071,25.006-10.347,27.594,0c2.318,9.286,2.445,15.551,8.17,18.869 c14.719,8.531,25.811,2.999,32.555,5.587c11.658,4.471,14.264,19.019,16.609,26.431c2.1,6.529,18.727,59.821,20.393,62.314 c2.348,6.198,3.457,9.023,4.373,14.357c-0.314,5.429,2.633,26.575,0.006,47.561c-0.902,7.228-3.121,33.575-3.121,39.39 s1.734,19.99-0.758,26.637s-8.633,26.422-12.992,26.422c-3.553,0,3.424-16.107,4.189-18.777c0.979-3.401,2.711-10.522,1.484-12.436 c-4.535-7.068-11.305,21.17-11.139,4.302c0.092-9.365,2.943-14.037,8.771-32.203c5.908-18.396-4.254-45.869-2.836-67.622 c0.096-6.941-1.645-10.373-1.645-10.373c-5.008-15.903-17.93-31.909-23.748-56.496c0.043-1.568-0.645-3.767-0.645-3.767 c-0.572,8.475,2.527,16.825-9.061,29.391c-4.105,3.333-7.609,7.246-3.881,17.243c9.482,25.437,11.805,27.468,13.348,42.482 c0,0,1.734,6.936,3.105,26.108c1.371,19.172,0.689,64.724-3.693,86.071c-4.385,21.35-7.648,49.146-7.145,56.166 c2.914,13.819-0.188,18.777-0.162,29.006c0.023,10.232,1.133,23.129-1.537,33.362c-2.67,10.236-12.109,41.791-12.281,50.287 c-0.662,32.783,19.512,42.65,20.605,47.541c1.09,4.889-3.83,8.461-10.256,10.703c-6.428,2.238-22.385,4.648-25.312-2.609 c-3.166-7.85-5.473-32.455-6.564-38.68c-1.092-6.227,3.213-9.795,4.273-17.803c1.057-8.006-6.346-22.223-4.615-52.914 c1.725-30.608-1.01-36.39-0.395-45.812c-1.312-9.146-0.613-32.391-1.812-39.92c-1.193-7.525-6.824-31.088-9.102-53.736 c-2.277-22.644-5.285-37.128-3.361-46.976";
		}
		else if (this.props.size == 1) {
			return "M119.13,451.465c-1.172-9.281-1.076-29.463-2.148-37.102 c-1.07-7.635-6.138-31.549-8.158-54.521c-2.022-22.974-4.726-37.668-2.956-47.654c3.214-4.386,7.919-6.251,8.419-1.681 c1.768,9.985-0.934,24.681-2.959,47.655c-2.021,22.974-7.087,46.886-8.157,54.521c-1.071,7.639-1.051,29.5-2.223,38.781L100.924,451 c0.581,9.559-1.682,19.029-0.045,50.067c1.642,31.125-5.059,45.559-4.078,53.68c0.98,8.119,4.902,11.729,3.922,18.043 s-3.021,31.275-5.885,39.244c-2.646,7.369-17.161,4.963-23.01,2.707c-5.851-2.258-10.333-5.865-9.351-10.826 c0.981-4.963,19.306-15.023,18.632-48.268c-0.176-8.615-8.828-40.598-11.278-50.975c-2.451-10.374-1.471-23.456-1.471-33.831 c0-10.377-1.844-10.78-0.864-22.136c1.068-4.637,1.086-7.433,1.127-8.71c0.442-7.119-2.59-35.305-6.623-56.947 c-4.034-21.642-4.753-67.839-3.547-87.287c1.206-19.448,3.888-22.896,3.15-25.144c4.11-11.715,5.804-20.638,8.629-33.979 c2.244-10.586,5.282-27.773,1.348-31.419c-11.789-10.924-9.807-18.102-10.908-30.206c0,0-1.119,1.871-1.818,6.633 c-5.903,24.937-19.005,41.169-24.088,57.298c-0.313,1.535-1.806,6.319-1.667,10.521c1.438,22.064-8.866,49.929-2.877,68.586 c5.915,18.423,8.805,23.162,8.896,32.658c0.17,17.105-6.693-11.529-11.294-4.362c-1.244,1.939,0.512,9.163,1.502,12.61 c0.778,2.709,7.855,19.045,4.253,19.045c-4.42,0-10.652-20.056-13.181-26.797c-2.526-6.739-0.768-21.116-0.768-27.014 s-2.25-32.619-3.166-39.95c-2.659-21.282,0.324-42.73,0.006-48.237c0.85-6.713,2.677-10.057,4.437-14.561 c1.687-2.528,18.551-59.691,20.682-66.312c1.646-4.927,8.528-18.673,17.854-20.221c10.091-3.134,17.514,2.049,34.317-5.175 c3.925-3.61,4.854-17.797,5.639-19.512c1.511-3.3,5.746-5.178,10.306-5.371c4.563,0.193,8.796,2.071,10.308,5.371 c0.785,1.715,0.824,17.226,5.637,19.512c16.828,7.991,26.084,1.465,34.318,4.152c8.232,2.688,13.455,9.666,18.221,24.741 c2.133,6.621,18.996,60.672,20.684,63.198c3.926,10.857,4.438,14.563,4.438,14.563c-0.318,5.505,2.666,26.954,0.006,48.236 c-0.916,7.329-3.164,34.052-3.164,39.948c0,5.899,1.76,20.275-0.771,27.015c-2.525,6.741-8.758,26.795-13.178,26.795 c-3.604,0,3.475-16.334,4.252-19.043c0.992-3.448,2.748-10.671,1.502-12.61c-4.6-7.166-11.463,21.47-11.295,4.361 c0.094-9.496,2.982-14.234,8.896-32.658c5.99-18.657-4.316-46.521-2.877-68.584c0.133-5.162-1.666-10.521-1.666-10.521 c-5.082-16.129-18.188-32.362-24.088-57.3c-1.996-7.304-2.459-8.465-2.459-8.465c-0.439,9.465,1.152,20.731-10.631,31.658 c-3.934,3.645-0.896,20.832,1.346,31.418c2.826,13.342,3.096,18.02,7.203,29.733c0.689,1.463,4.104,11.622,5.311,31.07 c1.205,19.447,0.484,65.645-3.549,87.285c-4.033,21.645-7.064,49.83-6.623,56.947c0.041,1.422,0.353,4.651,1.22,8.778 c0.98,11.354-1.099,10.011-1.099,20.388s0.98,23.457-1.471,33.833c-2.449,10.375-11.102,42.357-11.277,50.975 c-0.674,33.242,17.65,43.305,18.633,48.266c0.98,4.961-3.502,8.57-9.352,10.826c-5.848,2.256-20.363,4.662-23.01-2.705 c-2.863-7.971-4.904-32.932-5.885-39.244c-0.979-6.314,2.943-9.924,3.922-18.043c0.979-8.121-5.721-22.557-4.078-53.682 C120.765,470.031,118.548,461.021,119.13,451.465";
		}
		else {
			return "M110.34,310.802c-1.635,10.012,0.858,24.746,2.724,47.78 c1.864,23.034,6.54,47.014,7.527,54.671c0.986,7.656,0.835,28.934,0.919,39.833c-0.535,9.586,1.748,15.468,0.237,46.588 c-1.514,31.208,4.669,45.685,3.766,53.824c-0.909,8.143-4.525,11.758-3.619,18.093c0.904,6.332,2.785,31.359,5.428,39.351 c2.44,7.388,15.829,4.973,21.226,2.713c5.396-2.264,9.528-5.882,8.626-10.858c-0.908-4.975-17.812-15.059-17.188-48.393 c0.163-8.643,8.141-40.709,10.405-51.113c2.262-10.404,1.355-23.521,1.355-33.924c0-10.403,3.166-9.499,2.263-20.884 c-0.407-7.141,0.84-43.248,4.56-64.948c3.721-21.701,4.384-68.022,3.273-87.521c-1.113-19.502-2.156-21.535-4.439-27.287 c-4.12-11.746-9.501-20.269-12.332-33.645c-2.251-10.615-2.304-33.927,1.64-37.582c10.643-10.539,8.717-21.51,8.807-27.633 c0.859,2.732,1.258,3.62,3.35,9.656c5.916,25.004,19.055,41.282,24.151,57.453c1.128,3.253,1.668,7.15,1.672,10.55 c-1.442,22.122,8.89,50.062,2.886,68.771c-5.931,18.473-8.829,23.225-8.924,32.745c-0.167,17.154,6.717-11.56,11.327-4.372 c1.249,1.944-0.511,9.186-1.506,12.645c-0.779,2.715-7.876,19.095-4.264,19.095c4.431,0,10.679-20.109,13.214-26.868 c2.535-6.758,0.771-21.173,0.771-27.09c0-5.911,2.258-32.707,3.173-40.056c2.668-21.341-0.325-42.847-0.006-48.368 c0-4.529-4.45-14.6-4.45-14.6c-2.024-5.259-18.599-56.731-20.734-63.369c-4.563-14.439-8.873-16.685-12.204-19.175 c-4.247-3.178-9.959-4.981-15.346-5.293c-7.947-0.46-17.707,0.257-23.472-4.128c-3.931-3.621-4.863-17.845-5.653-19.563 c-1.264-2.761-4.433-4.513-8.103-5.136c0,0-0.745-0.191-1.114-0.152c-0.37-0.039-1.116,0.152-1.116,0.152 c-3.668,0.623-6.839,2.375-8.104,5.136c-0.786,1.719-1.718,15.942-5.651,19.563c0,0-7.351,7.207-21.98,6.082 c-5.889-0.454-9.413,0.416-14.898,3.366c-5.588,3.006-11.28,9.63-14.705,19.146c-2.136,6.64-19.046,60.836-20.737,63.371 c-3.365,9.178-4.45,14.6-4.45,14.6c0.319,5.521-2.672,27.027-0.006,48.368c0.918,7.349,3.175,34.145,3.175,40.056 c0,5.915-1.764,20.332,0.769,27.09c2.537,6.759,8.782,26.868,13.216,26.868c3.612,0-3.484-16.38-4.263-19.095 c-0.994-3.459-2.755-10.7-1.508-12.645c4.614-7.188,11.494,21.526,11.326,4.372c-0.092-9.521-2.991-14.272-8.921-32.745 c-6.004-18.708,4.328-46.648,2.885-68.771c-0.122-6.1,1.672-10.55,1.672-10.55c5.097-16.171,16.234-29.421,28.066-67.109 c-0.091,14.397-0.091,18.489,8.801,27.633c3.944,3.655,3.894,26.967,1.645,37.582c-2.835,13.376-8.211,21.898-12.334,33.645 c-1.808,4.865-3.03,7.785-4.142,27.285c-1.113,19.499-0.452,65.822,3.27,87.523c3.722,21.7,5.147,57.808,4.74,64.946 c-0.905,11.387,2.262,10.482,2.262,20.884c0,10.404-0.905,23.521,1.356,33.924c2.262,10.406,10.243,42.473,10.404,51.111 c0.622,33.338-16.282,43.422-17.188,48.395c-0.905,4.979,3.228,8.594,8.625,10.858c5.397,2.262,18.786,4.675,21.227-2.711 c2.64-7.991,4.523-33.019,5.428-39.351c0.903-6.335-2.713-9.952-3.618-18.093c-0.905-8.14,5.277-22.616,3.761-53.824 c-1.51-31.12,0.775-37.005,0.237-46.588c0.75-12.383-0.246-32.179,0.741-39.835c0.987-7.657,5.662-31.637,7.528-54.672 c1.864-23.036,4.359-37.771,2.726-47.781";
		}
	},
	getSkinColor: function() {
		if (this.props.skin == 2) {
			return "#655043";
		}	
		else if (this.props.skin == 1) {
			return "#AF9684";
		}
		else {
			return "#FEE2CA";
		}
	},
	getFacePath: function() {
		if (this.props.shape == 2) {
			return "M149.38,71.802c0,12.191,0.541,21.639-7.677,31.921 c-6.44,8.06-21.702,18.533-31.701,18.533c-11.629,0-25.267-9.556-31.702-17.558c-8.274-10.289-7.677-20.663-7.677-32.896 c0-21.748,17.63-39.379,39.379-39.379C131.75,32.423,149.38,50.054,149.38,71.802z";
		}
		else if (this.props.shape == 1) {
			return "M150.205,71.813c0,21.704-17.594,50.353-39.3,50.353 c-21.705,0-39.299-28.649-39.299-50.353c0-21.706,17.595-39.301,39.299-39.301C132.611,32.513,150.205,50.108,150.205,71.813z";
		}
		else {
			return "M149.677,72.254c-0.002,12.305,2.684,22.936-5.611,33.312 c-3.691,4.617-9.527,7.716-16.951,11.219c-5.65,2.664-7.979,6.387-17.178,6.387c-8.252,0-9.786-3.586-13.987-5.141 c-8.609-3.186-15.33-6.289-19.695-11.717C67.905,95.93,70.2,84.6,70.196,72.254c-0.01-32.256,17.792-39.741,39.741-39.741 C131.884,32.513,149.685,39.998,149.677,72.254z";
		}
	},
	getEyesPaths: function() {
		var eyes = [];
		if (this.props.eyes == 0) {
			eyes.push(
				<path fill="#F3A5A6" d="M119.256,76.562c-0.412,0.444-0.811,0.904-1.189,1.381c-0.408,0.514-0.807,1.039-1.166,1.59 c0.453,0.348,0.928,0.67,1.41,0.977c0.492,0.309,0.992,0.604,1.506,0.877c0.203,0.111,0.412,0.217,0.621,0.32 c-0.869-1.479-1.172-2.893-1.172-4.774C119.266,76.639,119.25,76.652,119.256,76.562"/>, <path fill="#FFFFFF" d="M138.65,74.514c-0.596-0.297-1.197-0.573-1.791-0.857c-1.191-0.551-2.359-1.125-3.588-1.531 c-0.607-0.209-1.227-0.385-1.852-0.511c-0.625-0.131-1.258-0.214-1.889-0.236c-0.639-0.026-1.246,0.009-1.887,0.116 c-0.633,0.096-1.254,0.27-1.861,0.482c-0.607,0.215-1.205,0.475-1.777,0.79c-0.572,0.312-1.129,0.661-1.664,1.043 c-1.072,0.764-2.059,1.658-2.969,2.624c-0.039,0.042-0.078,0.086-0.117,0.129c-0.006,0.09,0.01,0.076,0.01,0.37 c0,1.882,0.303,3.296,1.172,4.774c0.83,0.414,1.684,0.777,2.557,1.076c0.549,0.188,1.104,0.344,1.666,0.475 c0.559,0.135,1.129,0.225,1.697,0.291c0.57,0.068,1.143,0.076,1.713,0.068c0.285-0.012,0.57-0.025,0.85-0.059 c0.271-0.02,0.576-0.082,0.85-0.123c0.555-0.115,1.105-0.264,1.641-0.459c0.535-0.199,1.061-0.422,1.564-0.695 c0.504-0.27,0.996-0.566,1.467-0.893c0.473-0.326,0.934-0.672,1.373-1.045c0.879-0.744,1.699-1.564,2.451-2.445 c0.377-0.439,0.736-0.894,1.082-1.359c0.295-0.402,0.582-0.814,0.844-1.234l-0.646-0.338L138.65,74.514z"/>
, <path fill="#020202" d="M140.498,75.197c-0.582,1.023-1.254,1.984-1.986,2.902c-0.732,0.916-1.535,1.781-2.414,2.568 c-0.439,0.395-0.902,0.762-1.381,1.111c-0.477,0.352-0.986,0.654-1.506,0.941c-0.521,0.287-1.068,0.525-1.625,0.736 c-0.561,0.205-1.141,0.35-1.725,0.467c-0.307,0.043-0.574,0.096-0.883,0.117c-0.303,0.035-0.6,0.041-0.896,0.051 c-0.596,0.002-1.189-0.031-1.775-0.115c-0.588-0.086-1.17-0.193-1.738-0.352c-0.568-0.154-1.131-0.332-1.68-0.543 c-1.1-0.418-2.156-0.934-3.168-1.525c-0.506-0.295-1.002-0.607-1.482-0.938c-0.48-0.334-0.951-0.68-1.4-1.055l-0.021-0.018 l0.014-0.023c0.643-1.182,1.42-2.283,2.279-3.324c0.859-1.039,1.805-2.016,2.861-2.877c1.055-0.858,2.217-1.613,3.492-2.163 c0.635-0.274,1.295-0.509,1.98-0.665c0.67-0.162,1.402-0.244,2.102-0.254c0.707-0.008,1.41,0.055,2.1,0.172 c0.691,0.124,1.367,0.294,2.027,0.508c0.658,0.216,1.303,0.469,1.932,0.75c0.623,0.287,1.234,0.604,1.811,0.969 c0.582,0.359,1.133,0.762,1.674,1.172l0.803,0.621l0.395,0.312c0.131,0.1,0.268,0.225,0.381,0.275 c0.264,0.131,0.582,0.217,0.896,0.277c0.316,0.063,0.641,0.098,0.969,0.112c0.324,0.014,0.652,0.003,0.973-0.048 c0.322-0.05,0.641-0.14,0.924-0.312l0.029,0.037c-0.254,0.233-0.58,0.376-0.908,0.474c-0.33,0.097-0.672,0.149-1.016,0.169 c-0.344,0.021-0.689,0.008-1.033-0.03c-0.344-0.044-0.688-0.109-1.033-0.253l-0.922-0.479l-0.893-0.454 c-0.598-0.297-1.199-0.572-1.793-0.857c-1.189-0.55-2.359-1.126-3.586-1.531c-0.609-0.208-1.229-0.385-1.854-0.51 c-0.625-0.133-1.258-0.215-1.889-0.236c-0.637-0.027-1.244,0.008-1.887,0.115c-0.631,0.096-1.252,0.27-1.861,0.481 c-0.607,0.215-1.203,0.477-1.777,0.791c-0.572,0.312-1.129,0.661-1.662,1.044c-1.072,0.764-2.059,1.656-2.971,2.623 c-0.455,0.484-0.891,0.988-1.307,1.51c-0.412,0.521-0.816,1.053-1.182,1.613l-0.008-0.041c0.461,0.355,0.943,0.682,1.434,0.994 c0.492,0.309,0.994,0.604,1.506,0.877c1.021,0.551,2.086,1.023,3.18,1.396c0.547,0.189,1.102,0.344,1.664,0.475 c0.561,0.135,1.129,0.225,1.699,0.291c0.568,0.068,1.143,0.078,1.711,0.068c0.287-0.012,0.572-0.023,0.85-0.059 c0.273-0.02,0.578-0.082,0.85-0.121c0.555-0.117,1.107-0.266,1.641-0.461c0.535-0.199,1.062-0.422,1.566-0.695 c0.504-0.27,0.994-0.566,1.465-0.893c0.473-0.326,0.934-0.672,1.373-1.045c0.881-0.744,1.699-1.564,2.451-2.445 c0.377-0.439,0.738-0.895,1.082-1.361c0.344-0.466,0.676-0.944,0.971-1.439L140.498,75.197z"/>, <path fill="#020202" d="M139.178,74.058c0,0,0.094,0.017,0.275,0.058c0.17,0.035,0.398,0.093,0.682,0.137 c0.141,0.025,0.293,0.04,0.455,0.059c0.164,0.011,0.336,0.027,0.514,0.023c0.18,0.01,0.361-0.001,0.551-0.003 c0.186-0.013,0.379-0.028,0.566-0.064c0.188-0.04,0.377-0.073,0.557-0.136c0.092-0.028,0.18-0.057,0.27-0.084 c0.086-0.036,0.17-0.07,0.254-0.105s0.17-0.064,0.246-0.105c0.078-0.04,0.152-0.08,0.227-0.119s0.146-0.078,0.215-0.115 c0.066-0.043,0.131-0.086,0.191-0.126c0.121-0.083,0.236-0.152,0.33-0.228c0.092-0.076,0.17-0.143,0.236-0.196 c0.133-0.11,0.209-0.173,0.209-0.173l0.039,0.041c0,0-0.072,0.066-0.197,0.189c-0.062,0.059-0.137,0.132-0.225,0.216 c-0.09,0.083-0.201,0.161-0.316,0.257c-0.059,0.047-0.121,0.096-0.184,0.146c-0.068,0.044-0.137,0.09-0.209,0.137 s-0.148,0.095-0.223,0.145c-0.078,0.049-0.162,0.086-0.246,0.131c-0.084,0.043-0.17,0.088-0.256,0.132 c-0.09,0.036-0.182,0.075-0.273,0.111c-0.184,0.081-0.379,0.136-0.572,0.194c-0.096,0.033-0.195,0.053-0.295,0.074 s-0.197,0.053-0.297,0.068c-0.197,0.033-0.395,0.069-0.586,0.076c-0.191,0.018-0.377,0.012-0.553,0.012 c-0.176-0.01-0.344-0.016-0.496-0.032c-0.305-0.027-0.557-0.073-0.725-0.105c-0.156-0.031-0.26-0.046-0.26-0.046L139.178,74.058z"/>, <path fill="#020202" d="M137.287,73.005c0,0,0.02,0.007,0.055,0.019c0.037,0.01,0.09,0.025,0.158,0.045 c0.137,0.039,0.336,0.087,0.58,0.136c0.123,0.021,0.254,0.049,0.395,0.067c0.141,0.02,0.291,0.041,0.445,0.053 c0.154,0.018,0.314,0.021,0.479,0.028c0.164,0.009,0.328-0.003,0.494-0.003c0.164-0.015,0.332-0.025,0.494-0.047 c0.158-0.031,0.32-0.045,0.471-0.09c0.146-0.045,0.301-0.068,0.43-0.127c0.131-0.055,0.264-0.093,0.373-0.153 c0.111-0.06,0.211-0.113,0.303-0.161c0.086-0.053,0.156-0.109,0.215-0.151c0.121-0.086,0.189-0.136,0.189-0.136l0.039,0.043 c0,0-0.064,0.057-0.178,0.154c-0.057,0.049-0.123,0.114-0.207,0.176c-0.088,0.059-0.188,0.125-0.295,0.195 c-0.109,0.076-0.24,0.126-0.373,0.197c-0.129,0.074-0.283,0.113-0.436,0.175s-0.318,0.091-0.484,0.142 c-0.166,0.039-0.338,0.066-0.51,0.098c-0.172,0.016-0.348,0.047-0.518,0.053c-0.17,0.01-0.34,0.021-0.504,0.018 c-0.164,0.003-0.322-0.004-0.471-0.011c-0.15-0.005-0.291-0.021-0.422-0.03c-0.262-0.028-0.479-0.057-0.631-0.086 c-0.076-0.012-0.139-0.025-0.182-0.034c-0.039-0.009-0.062-0.013-0.062-0.013L137.287,73.005z"/>, <path fill="#F3A5A6" d="M100.486,76.562c0.412,0.444,0.812,0.904,1.189,1.381c0.409,0.514,0.808,1.039,1.167,1.59 c-0.454,0.348-0.928,0.67-1.411,0.977c-0.491,0.309-0.992,0.604-1.504,0.877c-0.206,0.111-0.414,0.217-0.624,0.32 c0.87-1.479,1.174-2.893,1.174-4.774C100.478,76.639,100.492,76.652,100.486,76.562"/>
, <path fill="#FFFFFF" d="M80.199,74.967l-0.646,0.338c0.262,0.42,0.547,0.831,0.843,1.234c0.343,0.466,0.705,0.92,1.082,1.359 c0.751,0.881,1.573,1.701,2.452,2.445c0.438,0.373,0.899,0.719,1.372,1.045c0.472,0.328,0.964,0.623,1.467,0.895 c0.504,0.271,1.03,0.494,1.563,0.693c0.535,0.195,1.086,0.344,1.643,0.459c0.271,0.041,0.576,0.104,0.85,0.123 c0.277,0.035,0.562,0.047,0.848,0.059c0.57,0.008,1.144,0,1.715-0.068c0.568-0.064,1.138-0.156,1.697-0.291 c0.561-0.131,1.117-0.285,1.664-0.475c0.873-0.299,1.727-0.662,2.557-1.076c0.869-1.479,1.173-2.893,1.173-4.774 c0-0.294,0.015-0.28,0.009-0.37c-0.039-0.043-0.076-0.087-0.115-0.129c-0.912-0.967-1.898-1.859-2.971-2.624 c-0.535-0.382-1.09-0.732-1.664-1.044c-0.571-0.312-1.168-0.576-1.776-0.79c-0.608-0.212-1.229-0.386-1.86-0.481 c-0.641-0.107-1.248-0.142-1.887-0.116c-0.633,0.022-1.264,0.105-1.889,0.237c-0.627,0.125-1.244,0.301-1.855,0.509 c-1.225,0.407-2.393,0.981-3.586,1.534c-0.592,0.282-1.194,0.559-1.791,0.854L80.199,74.967z"/>, <path fill="#020202" d="M79.245,75.197c0.581,1.023,1.253,1.984,1.985,2.902c0.734,0.916,1.535,1.781,2.415,2.568 c0.438,0.395,0.902,0.762,1.38,1.111c0.477,0.352,0.988,0.654,1.506,0.941c0.521,0.287,1.068,0.525,1.625,0.736 c0.561,0.205,1.141,0.35,1.727,0.467c0.305,0.043,0.572,0.096,0.883,0.117c0.302,0.035,0.598,0.041,0.896,0.051 c0.595,0.002,1.189-0.031,1.775-0.115c0.586-0.086,1.168-0.193,1.738-0.352c0.568-0.154,1.131-0.332,1.68-0.543 c1.099-0.418,2.156-0.934,3.166-1.525c0.508-0.295,1.002-0.607,1.484-0.938c0.48-0.334,0.95-0.68,1.4-1.055l0.021-0.018 l-0.013-0.023c-0.645-1.182-1.422-2.283-2.28-3.324c-0.859-1.039-1.806-2.016-2.861-2.877c-1.056-0.858-2.216-1.613-3.491-2.163 c-0.637-0.274-1.297-0.509-1.981-0.665c-0.67-0.162-1.403-0.244-2.101-0.254c-0.707-0.008-1.411,0.055-2.102,0.172 c-0.689,0.124-1.367,0.294-2.027,0.508c-0.658,0.216-1.302,0.469-1.93,0.75c-0.625,0.287-1.234,0.604-1.812,0.969 c-0.581,0.359-1.132,0.762-1.672,1.172l-0.803,0.621l-0.396,0.312c-0.131,0.1-0.269,0.225-0.38,0.275 c-0.266,0.131-0.582,0.217-0.898,0.277c-0.315,0.063-0.641,0.098-0.967,0.112c-0.324,0.014-0.652,0.003-0.975-0.048 c-0.321-0.05-0.641-0.14-0.923-0.312l-0.028,0.037c0.252,0.233,0.578,0.376,0.906,0.474c0.331,0.097,0.674,0.149,1.017,0.169 c0.344,0.021,0.688,0.008,1.033-0.03c0.345-0.044,0.687-0.109,1.032-0.253l0.922-0.479l0.894-0.454 c0.597-0.297,1.199-0.572,1.792-0.857c1.191-0.55,2.36-1.126,3.586-1.531c0.61-0.208,1.229-0.385,1.854-0.51 c0.624-0.133,1.257-0.215,1.889-0.236c0.638-0.027,1.245,0.008,1.888,0.115c0.629,0.096,1.25,0.27,1.859,0.481 c0.607,0.215,1.205,0.477,1.777,0.791c0.573,0.312,1.129,0.661,1.664,1.044c1.071,0.764,2.058,1.656,2.969,2.623 c0.455,0.484,0.892,0.988,1.307,1.51c0.414,0.521,0.818,1.053,1.182,1.613l0.008-0.041c-0.46,0.355-0.943,0.682-1.434,0.994 c-0.492,0.309-0.993,0.604-1.504,0.877c-1.023,0.551-2.086,1.023-3.181,1.396c-0.546,0.189-1.103,0.344-1.665,0.475 c-0.559,0.135-1.127,0.225-1.697,0.291c-0.57,0.068-1.143,0.078-1.713,0.068c-0.285-0.012-0.571-0.023-0.849-0.059 c-0.272-0.02-0.577-0.082-0.849-0.121c-0.557-0.117-1.107-0.266-1.643-0.461c-0.535-0.199-1.061-0.422-1.564-0.695 c-0.504-0.27-0.994-0.566-1.467-0.893s-0.934-0.672-1.373-1.045c-0.879-0.744-1.699-1.564-2.45-2.445 c-0.378-0.439-0.739-0.895-1.083-1.361c-0.343-0.466-0.675-0.944-0.97-1.439L79.245,75.197z"/>, <path fill="#020202" d="M80.564,74.058c0,0-0.094,0.017-0.274,0.058c-0.169,0.035-0.399,0.093-0.682,0.137 c-0.141,0.025-0.294,0.04-0.456,0.059c-0.162,0.011-0.335,0.027-0.512,0.023c-0.18,0.01-0.363-0.001-0.552-0.003 c-0.186-0.013-0.378-0.028-0.566-0.064c-0.188-0.04-0.377-0.073-0.557-0.136c-0.091-0.028-0.18-0.057-0.27-0.084 c-0.087-0.036-0.171-0.07-0.255-0.105c-0.082-0.035-0.168-0.064-0.246-0.105c-0.077-0.04-0.152-0.08-0.227-0.119 c-0.073-0.039-0.145-0.078-0.215-0.115c-0.065-0.043-0.129-0.086-0.19-0.126c-0.12-0.083-0.236-0.152-0.329-0.228 c-0.092-0.076-0.172-0.143-0.238-0.196c-0.132-0.11-0.207-0.173-0.207-0.173l-0.041,0.041c0,0,0.072,0.066,0.197,0.189 c0.062,0.059,0.139,0.132,0.226,0.216c0.089,0.083,0.202,0.161,0.316,0.257c0.059,0.047,0.12,0.096,0.184,0.146 c0.067,0.044,0.138,0.09,0.21,0.137s0.146,0.095,0.223,0.145c0.076,0.049,0.162,0.086,0.244,0.131 c0.085,0.043,0.17,0.088,0.256,0.132c0.091,0.036,0.183,0.075,0.273,0.111c0.184,0.081,0.378,0.136,0.574,0.194 c0.096,0.033,0.195,0.053,0.294,0.074s0.197,0.053,0.296,0.068c0.198,0.033,0.395,0.069,0.587,0.076 c0.192,0.018,0.378,0.012,0.554,0.012c0.174-0.01,0.342-0.016,0.494-0.032c0.305-0.027,0.559-0.073,0.727-0.105 c0.155-0.031,0.258-0.046,0.258-0.046L80.564,74.058z"/>, <path fill="#020202" d="M82.456,73.005c0,0-0.02,0.007-0.056,0.019c-0.036,0.01-0.088,0.025-0.155,0.045 c-0.138,0.039-0.339,0.087-0.581,0.136c-0.123,0.021-0.254,0.049-0.396,0.067c-0.14,0.02-0.289,0.041-0.444,0.053 c-0.155,0.018-0.314,0.021-0.478,0.028c-0.164,0.009-0.328-0.003-0.495-0.003c-0.165-0.015-0.331-0.025-0.493-0.047 c-0.158-0.031-0.322-0.045-0.471-0.09c-0.147-0.045-0.301-0.068-0.43-0.127c-0.131-0.055-0.266-0.093-0.373-0.153 c-0.111-0.06-0.213-0.113-0.303-0.161c-0.088-0.053-0.156-0.109-0.217-0.151c-0.121-0.086-0.189-0.136-0.189-0.136l-0.038,0.043 c0,0,0.065,0.057,0.179,0.154c0.057,0.049,0.122,0.114,0.207,0.176c0.088,0.059,0.187,0.125,0.295,0.195 c0.107,0.076,0.238,0.126,0.371,0.197c0.131,0.074,0.284,0.113,0.436,0.175c0.153,0.062,0.318,0.091,0.484,0.142 c0.168,0.039,0.339,0.066,0.511,0.098c0.173,0.016,0.347,0.047,0.519,0.053c0.17,0.01,0.34,0.021,0.502,0.018 c0.164,0.003,0.322-0.004,0.473-0.011c0.15-0.005,0.291-0.021,0.422-0.03c0.261-0.028,0.479-0.057,0.63-0.086 c0.076-0.012,0.14-0.025,0.181-0.034s0.062-0.013,0.062-0.013L82.456,73.005z"/>	
			);
		}
		else if (this.props.eyes == 1) {
			eyes.push(
				<path fill="#F3A5A6" d="M117.02,80.13c0.504,0.164,1.012,0.313,1.521,0.464c0.438,0.127,0.879,0.248,1.32,0.364 c-0.352-0.95-0.5-1.94-0.52-3.112c-0.396,0.331-0.783,0.675-1.152,1.039C117.781,79.28,117.387,79.694,117.02,80.13"/>, <path fill="#FFFFFF" d="M139.193,74.305c-0.564-0.142-1.129-0.273-1.699-0.384c-0.57-0.107-1.141-0.217-1.715-0.293 c-0.574-0.08-1.15-0.149-1.727-0.192c-0.578-0.05-1.156-0.067-1.734-0.077c-0.58-0.002-1.156,0.012-1.732,0.047 c-0.102,0.006-0.203,0.013-0.303,0.02c-1.326,0.134-2.275,0.279-2.906,0.402c-0.074,0.015-0.154,0.031-0.229,0.045 c-0.553,0.12-1.117,0.26-1.662,0.442c-0.547,0.181-1.086,0.384-1.609,0.621c-0.527,0.238-1.043,0.501-1.543,0.789 c-0.5,0.289-0.986,0.604-1.463,0.934c-0.477,0.332-0.938,0.687-1.381,1.06c-0.051,0.043-0.098,0.086-0.148,0.128 c0.02,1.172,0.168,2.162,0.52,3.112c0.086,0.021,0.17,0.045,0.256,0.066c1.059,0.266,2.129,0.489,3.205,0.658 c2.15,0.336,4.348,0.469,6.512,0.216c0.537-0.062,1.078-0.157,1.604-0.277c0.527-0.134,1.049-0.286,1.551-0.492 c0.5-0.206,0.994-0.434,1.463-0.709c0.467-0.272,0.92-0.573,1.35-0.903c0.859-0.666,1.633-1.438,2.311-2.285 c0.34-0.422,0.656-0.865,0.947-1.322c0.289-0.459,0.562-0.933,0.785-1.422v0.001c0-0.003,0-0.007,0-0.01 C139.627,74.419,139.41,74.36,139.193,74.305"/>, <path fill="none" stroke="#020202" stroke-width="0.5" stroke-miterlimit="10" d="M119.893,81.044 c-0.4-1.049-0.555-2.141-0.555-3.471"/>, <path fill="#020202" d="M140.029,74.567c-0.23,0.506-0.506,0.98-0.801,1.447c-0.297,0.463-0.619,0.908-0.965,1.338 c-0.689,0.857-1.475,1.638-2.348,2.311c-0.438,0.334-0.896,0.64-1.373,0.915c-0.477,0.277-0.977,0.509-1.488,0.716 c-0.512,0.209-1.039,0.361-1.574,0.496c-0.539,0.121-1.076,0.215-1.625,0.277c-2.186,0.252-4.395,0.111-6.557-0.229 c-1.084-0.171-2.156-0.399-3.219-0.667c-1.059-0.271-2.111-0.582-3.127-0.998l-0.037-0.011l0.023-0.037 c0.152-0.253,0.324-0.493,0.502-0.729c0.18-0.236,0.361-0.471,0.555-0.693c0.387-0.448,0.797-0.879,1.227-1.289 c0.869-0.805,1.807-1.549,2.826-2.17c0.51-0.311,1.033-0.599,1.572-0.859c0.537-0.262,1.092-0.488,1.654-0.691 c0.566-0.207,1.137-0.367,1.73-0.512c0.289-0.062,0.568-0.131,0.867-0.181c0.295-0.048,0.592-0.108,0.889-0.144 c0.295-0.041,0.59-0.082,0.887-0.108c0.297-0.034,0.594-0.056,0.893-0.075c0.594-0.043,1.191-0.047,1.787-0.041 c0.596,0.014,1.189,0.037,1.785,0.094c0.592,0.053,1.184,0.121,1.77,0.22c0.588,0.095,1.172,0.209,1.748,0.35 c0.58,0.138,1.152,0.296,1.717,0.481c0.564,0.181,1.121,0.387,1.67,0.615c0.545,0.235,1.084,0.474,1.602,0.773l-0.092,0.182 c-0.541-0.207-1.094-0.403-1.652-0.57c-0.557-0.174-1.115-0.328-1.68-0.473c-0.564-0.143-1.131-0.274-1.701-0.385 c-0.57-0.107-1.139-0.218-1.713-0.292c-0.576-0.08-1.152-0.151-1.729-0.192c-0.578-0.051-1.154-0.068-1.734-0.078 c-0.578-0.002-1.156,0.012-1.732,0.047c-0.289,0.016-0.578,0.037-0.865,0.068c-0.289,0.023-0.574,0.062-0.859,0.099 c-0.289,0.032-0.568,0.089-0.852,0.134c-0.283,0.047-0.574,0.113-0.861,0.166c-0.553,0.121-1.117,0.26-1.662,0.441 s-1.084,0.385-1.609,0.622c-0.525,0.238-1.041,0.501-1.543,0.79c-0.5,0.289-0.986,0.604-1.463,0.934 c-0.475,0.33-0.938,0.685-1.381,1.06c-0.449,0.37-0.885,0.757-1.299,1.167c-0.42,0.406-0.824,0.829-1.201,1.277l-0.014-0.048 c0.518,0.171,1.043,0.323,1.564,0.479c0.523,0.151,1.049,0.296,1.578,0.43c1.059,0.266,2.127,0.49,3.205,0.657 c2.15,0.337,4.348,0.47,6.512,0.216c0.537-0.061,1.078-0.156,1.604-0.275c0.525-0.135,1.049-0.286,1.549-0.494 c0.502-0.204,0.996-0.433,1.463-0.707c0.469-0.273,0.92-0.574,1.35-0.904c0.859-0.666,1.633-1.438,2.312-2.285 c0.338-0.422,0.656-0.865,0.947-1.322c0.289-0.459,0.562-0.934,0.783-1.421L140.029,74.567z"/>, <path fill="#F3A5A6" d="M103.129,80.13c-0.504,0.164-1.014,0.313-1.521,0.464c-0.439,0.127-0.879,0.248-1.32,0.364 c0.35-0.95,0.499-1.94,0.52-3.112c0.396,0.331,0.783,0.675,1.151,1.039C102.367,79.28,102.76,79.694,103.129,80.13"/>, <path fill="#FFFFFF" d="M80.954,74.305c0.564-0.142,1.13-0.273,1.7-0.384c0.571-0.107,1.14-0.217,1.716-0.293 c0.573-0.08,1.148-0.149,1.727-0.192c0.576-0.05,1.156-0.067,1.734-0.077c0.578-0.002,1.156,0.012,1.733,0.047 c0.101,0.006,0.2,0.013,0.302,0.02c1.325,0.134,2.273,0.279,2.904,0.402c0.076,0.015,0.154,0.031,0.23,0.045 c0.552,0.12,1.116,0.26,1.66,0.442c0.547,0.181,1.086,0.384,1.611,0.621c0.525,0.238,1.041,0.501,1.541,0.789 c0.501,0.289,0.986,0.604,1.464,0.934c0.477,0.332,0.937,0.687,1.381,1.06c0.051,0.043,0.1,0.086,0.149,0.128 c-0.021,1.172-0.17,2.162-0.521,3.112c-0.085,0.021-0.17,0.045-0.256,0.066c-1.059,0.266-2.127,0.489-3.204,0.658 c-2.151,0.336-4.349,0.469-6.511,0.216c-0.539-0.062-1.079-0.157-1.605-0.277c-0.525-0.134-1.047-0.286-1.549-0.492 s-0.994-0.434-1.463-0.709c-0.469-0.272-0.92-0.573-1.35-0.903c-0.859-0.666-1.632-1.438-2.312-2.285 c-0.339-0.422-0.656-0.865-0.947-1.322c-0.289-0.459-0.562-0.933-0.783-1.422l-0.001,0.001c0-0.003,0-0.007,0-0.01 C80.52,74.419,80.737,74.36,80.954,74.305"/>, <path fill="none" stroke="#020202" stroke-width="0.5" stroke-miterlimit="10" d="M100.254,81.044 c0.402-1.049,0.557-2.141,0.557-3.471"/>, <path fill="#020202" d="M80.118,74.567c0.232,0.506,0.508,0.98,0.801,1.447c0.297,0.463,0.62,0.908,0.965,1.338 c0.691,0.857,1.477,1.638,2.349,2.311c0.438,0.334,0.896,0.64,1.374,0.915c0.475,0.277,0.977,0.509,1.486,0.716 c0.512,0.209,1.042,0.361,1.575,0.496c0.54,0.121,1.077,0.215,1.626,0.277c2.185,0.252,4.394,0.111,6.557-0.229 c1.082-0.171,2.154-0.399,3.217-0.667c1.061-0.271,2.113-0.582,3.128-0.998l0.037-0.011l-0.022-0.037 c-0.154-0.253-0.326-0.493-0.504-0.729s-0.359-0.471-0.555-0.693c-0.387-0.448-0.795-0.879-1.223-1.289 c-0.872-0.805-1.81-1.549-2.829-2.17c-0.51-0.311-1.033-0.599-1.571-0.859c-0.537-0.262-1.092-0.488-1.655-0.691 c-0.565-0.207-1.138-0.367-1.729-0.512c-0.289-0.062-0.57-0.131-0.866-0.181c-0.296-0.048-0.595-0.108-0.89-0.144 c-0.295-0.041-0.59-0.082-0.889-0.108c-0.295-0.034-0.592-0.056-0.891-0.075c-0.596-0.043-1.191-0.047-1.787-0.041 c-0.596,0.014-1.191,0.037-1.785,0.094c-0.594,0.053-1.185,0.121-1.771,0.22c-0.586,0.095-1.171,0.209-1.748,0.35 c-0.578,0.138-1.15,0.296-1.715,0.481c-0.564,0.181-1.122,0.387-1.67,0.615c-0.545,0.235-1.085,0.474-1.603,0.773l0.091,0.182 c0.541-0.207,1.095-0.403,1.652-0.57c0.557-0.174,1.118-0.328,1.682-0.473c0.563-0.143,1.129-0.274,1.699-0.385 c0.57-0.107,1.14-0.218,1.715-0.292c0.574-0.08,1.15-0.151,1.727-0.192c0.578-0.051,1.157-0.068,1.734-0.078 c0.579-0.002,1.158,0.012,1.734,0.047c0.289,0.016,0.576,0.037,0.864,0.068c0.288,0.023,0.573,0.062,0.861,0.099 c0.288,0.032,0.567,0.089,0.85,0.134c0.283,0.047,0.574,0.113,0.861,0.166c0.552,0.121,1.117,0.26,1.661,0.441 c0.545,0.182,1.086,0.385,1.611,0.622c0.525,0.238,1.04,0.501,1.541,0.79s0.986,0.604,1.464,0.934 c0.476,0.33,0.937,0.685,1.381,1.06c0.449,0.37,0.886,0.757,1.3,1.167c0.419,0.406,0.824,0.829,1.201,1.277l0.014-0.048 c-0.518,0.171-1.042,0.323-1.564,0.479c-0.525,0.151-1.051,0.296-1.579,0.43c-1.059,0.266-2.126,0.49-3.204,0.657 c-2.152,0.337-4.349,0.47-6.512,0.216c-0.537-0.061-1.078-0.156-1.605-0.275c-0.524-0.135-1.046-0.286-1.548-0.494 c-0.502-0.204-0.995-0.433-1.462-0.707c-0.471-0.273-0.921-0.574-1.352-0.904c-0.857-0.666-1.631-1.438-2.312-2.285 c-0.339-0.422-0.655-0.865-0.948-1.322c-0.287-0.459-0.561-0.934-0.782-1.421L80.118,74.567z"/>	
			);
		}
		else {
			eyes.push(
				<path fill="#F3A5A6" d="M119.447,76.933c-0.049,0.052-0.096,0.102-0.145,0.153c-0.4,0.438-0.787,0.894-1.156,1.361 c-0.369,0.456-0.719,0.929-1.053,1.413c0.459,0.34,0.934,0.656,1.412,0.971c0.488,0.314,0.982,0.618,1.492,0.9 c0.219,0.123,0.441,0.241,0.666,0.357c-0.895-1.5-1.207-2.924-1.207-4.83C119.457,77.022,119.447,76.987,119.447,76.933"/>, <path fill="#FFFFFF" d="M138.135,74.134c-0.516-0.292-1.035-0.572-1.568-0.828c-0.529-0.26-1.068-0.5-1.615-0.718 c-0.545-0.216-1.102-0.409-1.664-0.571c-0.562-0.156-1.133-0.287-1.709-0.377c-0.576-0.084-1.154-0.146-1.732-0.149 c-0.146-0.007-0.291,0.005-0.434,0.006c-0.146,0.003-0.291,0.007-0.432,0.022l-0.424,0.036l-0.443,0.067 c-0.561,0.09-1.135,0.221-1.684,0.408c-0.553,0.181-1.096,0.403-1.617,0.668c-0.523,0.259-1.033,0.553-1.523,0.881 c-0.49,0.322-0.965,0.674-1.42,1.05s-0.904,0.763-1.328,1.176c-0.379,0.36-0.738,0.743-1.094,1.128c0,0.053,0.01,0.09,0.01,0.326 c0,1.906,0.312,3.33,1.207,4.829c0.807,0.418,1.641,0.787,2.496,1.097c0.545,0.199,1.102,0.362,1.664,0.504 c0.562,0.146,1.135,0.244,1.707,0.318c0.576,0.074,1.156,0.096,1.734,0.089c0.578-0.011,1.15-0.077,1.723-0.175 c0.566-0.115,1.127-0.263,1.67-0.462c0.541-0.204,1.074-0.433,1.582-0.71c0.508-0.279,1.004-0.576,1.477-0.914 c0.471-0.337,0.93-0.692,1.365-1.073c0.875-0.763,1.682-1.603,2.42-2.499c0.371-0.447,0.725-0.908,1.061-1.381 c0.305-0.429,0.598-0.869,0.865-1.32c-0.254-0.175-0.51-0.344-0.768-0.506C139.158,74.733,138.65,74.428,138.135,74.134"/>, <path fill="none" stroke="#020202" stroke-width="0.5" stroke-miterlimit="10" d="M120.771,82.265 c-0.979-1.564-1.312-3.025-1.312-5.008c0-0.432-0.035-0.195,0.018-0.613"/>, <path fill="#020202" d="M140.688,75.524c-0.295,0.51-0.619,0.996-0.959,1.474c-0.34,0.476-0.697,0.94-1.072,1.39 c-0.746,0.902-1.561,1.748-2.447,2.516c-0.439,0.385-0.904,0.744-1.385,1.083c-0.477,0.341-0.98,0.642-1.496,0.923 s-1.059,0.514-1.607,0.717c-0.551,0.203-1.123,0.352-1.699,0.467c-0.576,0.098-1.164,0.166-1.752,0.174 c-0.586,0.005-1.174-0.017-1.758-0.094c-0.58-0.077-1.158-0.178-1.727-0.324c-0.568-0.145-1.129-0.312-1.68-0.514 c-1.102-0.399-2.164-0.896-3.184-1.469c-0.51-0.287-1.01-0.59-1.496-0.916s-0.955-0.676-1.396-1.059l-0.021-0.02l0.014-0.021 c0.271-0.539,0.592-1.049,0.922-1.555c0.338-0.498,0.693-0.986,1.068-1.461c0.373-0.475,0.777-0.925,1.193-1.365 c0.418-0.439,0.854-0.861,1.314-1.26c0.459-0.4,0.939-0.773,1.441-1.122c0.498-0.351,1.02-0.673,1.564-0.956 c0.539-0.291,1.104-0.54,1.684-0.746c0.582-0.213,1.176-0.367,1.795-0.482l0.443-0.069l0.473-0.046 c0.158-0.018,0.312-0.021,0.467-0.026c0.154-0.001,0.309-0.015,0.463-0.009c0.621,0.002,1.236,0.061,1.848,0.15 c0.607,0.1,1.205,0.243,1.795,0.412c0.586,0.176,1.162,0.381,1.729,0.611c0.564,0.232,1.113,0.501,1.652,0.782 c0.535,0.288,1.059,0.595,1.564,0.931c0.508,0.33,1,0.686,1.475,1.062c0.469,0.384,0.934,0.767,1.361,1.203l-0.139,0.153 c-0.479-0.348-0.971-0.689-1.475-1.004c-0.5-0.322-1.01-0.629-1.523-0.922c-0.516-0.292-1.037-0.572-1.57-0.828 c-0.529-0.262-1.066-0.5-1.613-0.719c-0.547-0.215-1.102-0.408-1.664-0.57c-0.564-0.156-1.133-0.287-1.709-0.377 c-0.576-0.084-1.156-0.146-1.734-0.15c-0.145-0.006-0.291,0.006-0.434,0.007c-0.145,0.003-0.291,0.006-0.43,0.022l-0.424,0.036 l-0.445,0.067c-0.559,0.09-1.135,0.221-1.684,0.408c-0.553,0.182-1.094,0.404-1.615,0.668c-0.525,0.258-1.035,0.553-1.523,0.881 c-0.49,0.322-0.965,0.673-1.42,1.051c-0.455,0.374-0.904,0.762-1.33,1.174c-0.428,0.41-0.834,0.844-1.236,1.283 c-0.402,0.438-0.787,0.893-1.156,1.36c-0.377,0.463-0.732,0.944-1.07,1.437l-0.008-0.041c0.465,0.348,0.951,0.67,1.436,0.989 c0.49,0.312,0.984,0.618,1.492,0.9c1.014,0.567,2.07,1.058,3.162,1.451c0.545,0.199,1.104,0.364,1.666,0.505 c0.561,0.146,1.133,0.243,1.707,0.317c0.574,0.075,1.154,0.097,1.732,0.09c0.58-0.011,1.15-0.077,1.725-0.175 c0.564-0.115,1.125-0.262,1.668-0.463c0.541-0.202,1.074-0.432,1.582-0.71c0.51-0.277,1.006-0.575,1.477-0.913 c0.473-0.336,0.932-0.691,1.367-1.074c0.875-0.762,1.682-1.602,2.42-2.497c0.369-0.448,0.723-0.908,1.061-1.38 c0.334-0.475,0.656-0.96,0.945-1.459L140.688,75.524z"/>, <path fill="#F3A5A6" d="M100.68,76.933c0.048,0.052,0.095,0.102,0.143,0.153c0.401,0.438,0.786,0.894,1.156,1.361 c0.37,0.456,0.72,0.929,1.054,1.413c-0.458,0.34-0.934,0.656-1.412,0.971c-0.488,0.314-0.983,0.618-1.49,0.9 c-0.221,0.123-0.443,0.241-0.667,0.357c0.896-1.5,1.206-2.924,1.206-4.83C100.669,77.022,100.679,76.987,100.68,76.933"/>, <path fill="#FFFFFF" d="M80.466,75.056c-0.258,0.162-0.516,0.331-0.768,0.506c0.268,0.45,0.561,0.892,0.864,1.32 c0.337,0.473,0.69,0.934,1.06,1.381c0.738,0.896,1.547,1.736,2.42,2.498c0.436,0.383,0.896,0.737,1.368,1.074 c0.471,0.337,0.968,0.635,1.476,0.913s1.041,0.507,1.582,0.711c0.543,0.199,1.104,0.347,1.669,0.462 c0.573,0.098,1.146,0.164,1.724,0.175c0.578,0.007,1.158-0.015,1.733-0.089c0.573-0.074,1.146-0.174,1.708-0.318 c0.562-0.142,1.119-0.305,1.664-0.504c0.855-0.309,1.688-0.678,2.497-1.096c0.896-1.5,1.206-2.924,1.206-4.83 c0-0.236,0.01-0.271,0.011-0.326c-0.356-0.385-0.716-0.768-1.093-1.128c-0.426-0.413-0.874-0.802-1.331-1.176 c-0.454-0.376-0.931-0.728-1.421-1.05c-0.488-0.328-0.998-0.622-1.521-0.881c-0.523-0.265-1.064-0.487-1.617-0.668 c-0.549-0.188-1.123-0.318-1.684-0.408l-0.445-0.067l-0.422-0.036c-0.141-0.016-0.286-0.02-0.431-0.022 c-0.144-0.001-0.289-0.013-0.435-0.006c-0.578,0.003-1.158,0.065-1.733,0.149c-0.576,0.09-1.146,0.221-1.71,0.377 c-0.562,0.162-1.117,0.355-1.662,0.571c-0.548,0.218-1.086,0.458-1.615,0.718c-0.533,0.256-1.054,0.536-1.569,0.828 C81.476,74.428,80.966,74.733,80.466,75.056"/>, <path fill="none" stroke="#020202" stroke-width="0.5" stroke-miterlimit="10" d="M99.355,82.265 c0.979-1.564,1.312-3.025,1.312-5.008c0-0.432,0.034-0.195-0.018-0.613"/>, <path fill="#020202" d="M79.437,75.524c0.297,0.51,0.621,0.996,0.961,1.474c0.34,0.476,0.697,0.94,1.071,1.39 c0.746,0.902,1.563,1.748,2.446,2.516c0.441,0.385,0.907,0.744,1.385,1.083c0.479,0.341,0.982,0.642,1.498,0.923 s1.057,0.514,1.607,0.717c0.553,0.203,1.122,0.352,1.699,0.467c0.575,0.098,1.164,0.166,1.752,0.174 c0.586,0.005,1.174-0.017,1.756-0.094s1.161-0.178,1.729-0.324c0.566-0.145,1.13-0.312,1.68-0.514 c1.101-0.399,2.164-0.896,3.184-1.469c0.51-0.287,1.011-0.59,1.495-0.916c0.486-0.326,0.956-0.676,1.397-1.059l0.021-0.02 l-0.014-0.021c-0.272-0.539-0.593-1.049-0.922-1.555c-0.338-0.498-0.694-0.986-1.068-1.461c-0.375-0.475-0.778-0.925-1.193-1.365 c-0.419-0.439-0.854-0.861-1.314-1.26c-0.457-0.4-0.939-0.773-1.441-1.122c-0.498-0.351-1.021-0.673-1.563-0.956 c-0.54-0.291-1.104-0.54-1.686-0.746c-0.581-0.213-1.175-0.367-1.794-0.482l-0.445-0.069l-0.471-0.046 c-0.157-0.018-0.312-0.021-0.467-0.026c-0.155-0.001-0.311-0.015-0.465-0.009c-0.619,0.002-1.235,0.061-1.845,0.15 c-0.608,0.1-1.206,0.243-1.796,0.412c-0.588,0.176-1.164,0.381-1.729,0.611c-0.565,0.232-1.113,0.501-1.651,0.782 c-0.535,0.288-1.06,0.595-1.565,0.931c-0.508,0.33-1,0.686-1.475,1.062c-0.469,0.384-0.934,0.767-1.361,1.203l0.137,0.153 c0.481-0.348,0.973-0.689,1.477-1.004c0.5-0.322,1.009-0.629,1.523-0.922c0.516-0.292,1.036-0.572,1.569-0.828 c0.528-0.262,1.068-0.5,1.614-0.719c0.547-0.215,1.102-0.408,1.664-0.57c0.564-0.156,1.134-0.287,1.71-0.377 c0.574-0.084,1.153-0.146,1.733-0.15c0.145-0.006,0.289,0.006,0.434,0.007c0.146,0.003,0.29,0.006,0.43,0.022l0.424,0.036 l0.443,0.067c0.561,0.09,1.137,0.221,1.685,0.408c0.554,0.182,1.094,0.404,1.616,0.668c0.525,0.258,1.033,0.553,1.522,0.881 c0.491,0.322,0.966,0.673,1.422,1.051c0.456,0.374,0.903,0.762,1.329,1.174c0.429,0.41,0.834,0.844,1.236,1.283 c0.402,0.438,0.787,0.893,1.157,1.36c0.376,0.463,0.731,0.944,1.071,1.437l0.006-0.041c-0.465,0.348-0.951,0.67-1.436,0.989 c-0.489,0.312-0.984,0.618-1.492,0.9c-1.014,0.567-2.07,1.058-3.163,1.451c-0.545,0.199-1.103,0.364-1.665,0.505 c-0.561,0.146-1.133,0.243-1.707,0.317c-0.574,0.075-1.154,0.097-1.732,0.09c-0.58-0.011-1.151-0.077-1.725-0.175 c-0.564-0.115-1.126-0.262-1.67-0.463c-0.54-0.202-1.072-0.432-1.58-0.71c-0.509-0.277-1.006-0.575-1.477-0.913 c-0.473-0.336-0.932-0.691-1.368-1.074c-0.874-0.762-1.682-1.602-2.42-2.497c-0.369-0.448-0.723-0.908-1.06-1.38 c-0.334-0.475-0.658-0.96-0.945-1.459L79.437,75.524z"/>
			);
		}
		return eyes;	
	},
	getBangsPaths: function() {
		var color = this.getHairColor();
		var bangs = [];
		if (this.props.bangs == 0) {
			bangs.push(
				<path fill={color} stroke={color} stroke-miterlimit="10" d="M116.914,56.84c0.219,2.188,6.104-4.737,12.092-5.649 c9.469-1.446,20.793-8.259,17.668-17.308C139.537,13.235,115.67,44.418,116.914,56.84"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M106.527,54.271c0.219,2.188,6.102-4.736,12.092-5.65 c9.471-1.445,20.793-8.26,17.666-17.307C129.148,10.665,105.285,41.85,106.527,54.271"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M94.116,56.846c0.221,2.188,6.101-4.736,12.093-5.648 c9.469-1.444,20.793-8.26,17.666-17.307C116.74,13.242,92.873,44.424,94.116,56.846"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M77.807,59.941c0.219,2.189,6.102-4.734,12.092-5.648 c9.471-1.444,20.793-8.26,17.666-17.308C100.432,16.338,76.564,47.521,77.807,59.941"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M67.361,64.705c0.684,2.088,4.939-5.938,10.592-8.119 c8.938-3.449,18.529-12.539,13.531-20.703C80.074,17.254,63.475,52.84,67.361,64.705"/>
			);
		}
		else if (this.props.bangs == 1) {
			bangs.push(
				<path fill={color} stroke={color} stroke-miterlimit="10" d="M67.988,83.666c2.225,4.234,3.041-21.209,14.857-27.863 c18.678-10.521,59.664-25.297,37.303-28.963C75.863,19.58,55.357,59.631,67.988,83.666"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M150.184,72.4c-1.906,2.025,1.592-12.357-3.992-17.922 c-8.832-8.801-29.504-23.449-16.404-22.029C155.732,35.266,160.996,60.895,150.184,72.4"/>	
			);
		}
		else if (this.props.bangs == 2) {
			bangs.push(
				<path fill={color} stroke={color} stroke-miterlimit="10" d="M152.72,59.966c0,4.096-3.157,7.415-7.053,7.415 c-3.895,0-7.054-3.319-7.054-7.415c0-4.095,3.159-7.415,7.054-7.415C149.562,52.551,152.72,55.871,152.72,59.966"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M155.44,65.87c0,4.094-3.159,7.414-7.05,7.414 c-3.895,0-7.054-3.32-7.054-7.414c0-4.097,3.159-7.416,7.054-7.416C152.281,58.454,155.44,61.773,155.44,65.87"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M77.971,61.47c0,4.095-3.157,7.415-7.052,7.415 s-7.052-3.319-7.052-7.415c0-4.096,3.157-7.415,7.052-7.415S77.971,57.374,77.971,61.47"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M80.692,67.373c0,4.096-3.157,7.415-7.05,7.415 c-3.895,0-7.052-3.319-7.052-7.415c0-4.095,3.157-7.415,7.052-7.415C77.535,59.958,80.692,63.277,80.692,67.373"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M88.954,39.916c-2.681,3.094-7.241,3.536-10.185,0.986 c-2.942-2.55-3.155-7.126-0.472-10.221c2.681-3.095,7.241-3.537,10.183-0.987C91.424,32.244,91.635,36.821,88.954,39.916"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M82.131,47.793c-2.683,3.094-7.243,3.536-10.185,0.986 c-2.944-2.55-3.155-7.126-0.474-10.221c2.681-3.095,7.241-3.537,10.185-0.987C84.599,40.122,84.81,44.698,82.131,47.793"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M78.704,54.636c-2.681,3.094-7.241,3.536-10.185,0.985 c-2.942-2.549-3.155-7.125-0.474-10.22c2.683-3.096,7.243-3.537,10.185-0.987S81.385,51.541,78.704,54.636"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M87.148,46.161c-2.683,3.095-7.243,3.537-10.187,0.986 c-2.942-2.549-3.155-7.126-0.474-10.222c2.683-3.094,7.245-3.536,10.187-0.985C89.617,38.489,89.83,43.065,87.148,46.161"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M141.16,31.439c2.369,3.34,1.713,7.875-1.465,10.126 c-3.176,2.253-7.671,1.372-10.039-1.97c-2.371-3.34-1.715-7.874,1.463-10.126C134.297,27.216,138.791,28.099,141.16,31.439"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M147.189,39.941c2.366,3.34,1.714,7.874-1.466,10.126 c-3.178,2.255-7.67,1.371-10.039-1.969c-2.369-3.339-1.717-7.875,1.463-10.128C140.325,35.719,144.818,36.601,147.189,39.941"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M153.021,44.895c2.366,3.342,1.714,7.875-1.466,10.128 c-3.175,2.251-7.67,1.37-10.039-1.971c-2.369-3.341-1.716-7.874,1.464-10.127C146.157,40.673,150.652,41.555,153.021,44.895"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M100.229,26.612c2.367,3.341,1.712,7.875-1.465,10.127 c-3.175,2.252-7.672,1.371-10.039-1.969c-2.369-3.341-1.714-7.875,1.463-10.128C93.364,22.39,97.86,23.272,100.229,26.612"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M108.001,23.712c2.369,3.342,1.715,7.875-1.463,10.128 c-3.177,2.252-7.672,1.37-10.041-1.97c-2.369-3.341-1.712-7.875,1.463-10.127C101.137,19.49,105.632,20.373,108.001,23.712"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M115.177,26.612c2.369,3.341,1.712,7.875-1.463,10.127 c-3.178,2.252-7.675,1.371-10.042-1.969c-2.369-3.341-1.714-7.875,1.463-10.128C108.313,22.39,112.808,23.272,115.177,26.612"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M132.81,30.203c2.37,3.339,1.714,7.875-1.466,10.126 c-3.173,2.253-7.67,1.371-10.039-1.969c-2.367-3.34-1.712-7.875,1.465-10.127C125.945,25.98,130.442,26.861,132.81,30.203"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M125.636,26.612c2.366,3.341,1.712,7.875-1.466,10.127 c-3.175,2.252-7.672,1.371-10.039-1.969c-2.369-3.341-1.714-7.875,1.463-10.128C118.771,22.39,123.267,23.272,125.636,26.612"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M149.133,58.468c1.424,2.01,1.029,4.742-0.884,6.098 c-1.913,1.358-4.62,0.827-6.045-1.186c-1.427-2.012-1.034-4.742,0.879-6.098C144.996,55.927,147.704,56.457,149.133,58.468"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M144.802,48.86c1.425,2.011,1.031,4.743-0.882,6.099 c-1.913,1.355-4.62,0.825-6.045-1.187c-1.427-2.011-1.033-4.743,0.88-6.099C140.67,46.317,143.375,46.849,144.802,48.86"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M140.874,44.497c1.425,2.011,1.032,4.743-0.881,6.099 c-1.913,1.355-4.62,0.825-6.045-1.187c-1.429-2.012-1.034-4.741,0.879-6.099C136.74,41.955,139.448,42.485,140.874,44.497"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M146.147,54.858c1.425,2.011,1.029,4.743-0.884,6.099 c-1.913,1.357-4.618,0.827-6.047-1.186c-1.427-2.012-1.029-4.743,0.882-6.1C142.012,52.316,144.719,52.847,146.147,54.858"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M153.451,54.744c1.427,2.012,1.031,4.742-0.88,6.1 c-1.915,1.356-4.622,0.825-6.049-1.186c-1.425-2.014-1.029-4.744,0.884-6.1C149.316,52.202,152.026,52.733,153.451,54.744"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M73.581,51.912c1.427,2.011,1.032,4.743-0.881,6.099 c-1.913,1.357-4.621,0.826-6.047-1.186c-1.425-2.012-1.032-4.742,0.881-6.1C69.449,49.37,72.154,49.901,73.581,51.912"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M78.072,56.219c1.427,2.012,1.032,4.742-0.881,6.098 c-1.913,1.358-4.621,0.827-6.045-1.185c-1.429-2.013-1.034-4.742,0.879-6.098C73.938,53.678,76.645,54.208,78.072,56.219"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M76.424,61.713c1.425,2.012,1.031,4.742-0.881,6.099 c-1.913,1.356-4.621,0.824-6.047-1.187c-1.424-2.011-1.031-4.742,0.882-6.098C72.29,59.171,74.998,59.703,76.424,61.713"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M126.733,37.86c1.427,2.012,1.032,4.742-0.883,6.099 c-1.911,1.356-4.621,0.826-6.045-1.185c-1.427-2.013-1.032-4.743,0.879-6.1C122.6,35.318,125.307,35.849,126.733,37.86"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M119.929,41.563c1.427,2.011,1.031,4.742-0.882,6.098 c-1.91,1.356-4.62,0.826-6.047-1.186c-1.427-2.012-1.029-4.742,0.882-6.098C115.795,39.021,118.504,39.553,119.929,41.563"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M133.873,41.563c1.427,2.011,1.031,4.742-0.882,6.098 c-1.913,1.356-4.62,0.826-6.047-1.186c-1.425-2.012-1.031-4.742,0.882-6.098C129.741,39.021,132.446,39.553,133.873,41.563"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M145.195,46.638c1.427,2.01,1.031,4.742-0.882,6.1 c-1.911,1.356-4.62,0.825-6.047-1.188c-1.425-2.012-1.031-4.742,0.881-6.098C141.063,44.096,143.769,44.626,145.195,46.638"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M95.449,39.802c1.427,2.01,1.032,4.742-0.881,6.099 c-1.913,1.357-4.62,0.825-6.047-1.186c-1.427-2.013-1.032-4.743,0.881-6.099C91.315,37.259,94.022,37.79,95.449,39.802"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M97.638,34.694c1.424,2.01,1.031,4.742-0.884,6.098 c-1.913,1.355-4.618,0.826-6.045-1.187c-1.427-2.011-1.031-4.742,0.881-6.099C93.503,32.15,96.211,32.683,97.638,34.694"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M102.195,40.915c1.428,2.011,1.031,4.742-0.88,6.1 c-1.913,1.355-4.62,0.825-6.047-1.188s-1.031-4.742,0.881-6.098C98.063,38.374,100.771,38.904,102.195,40.915"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M102.841,36.521c1.427,2.012,1.034,4.743-0.881,6.099 c-1.913,1.357-4.62,0.826-6.045-1.187c-1.427-2.011-1.032-4.742,0.881-6.099C98.708,33.979,101.415,34.51,102.841,36.521"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M97.638,40.915c1.424,2.011,1.031,4.742-0.884,6.1 c-1.913,1.355-4.618,0.825-6.045-1.188s-1.031-4.742,0.881-6.098C93.503,38.374,96.211,38.904,97.638,40.915"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M107.792,36.09c1.425,2.01,1.032,4.741-0.881,6.098 c-1.913,1.357-4.62,0.825-6.047-1.186c-1.427-2.013-1.032-4.743,0.881-6.099C103.658,33.547,106.366,34.078,107.792,36.09"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M111.288,37.573c1.425,2.011,1.029,4.742-0.882,6.099 c-1.913,1.357-4.62,0.825-6.047-1.187c-1.427-2.012-1.031-4.742,0.881-6.098C107.154,35.032,109.861,35.562,111.288,37.573"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M91.128,44.497c1.427,2.011,1.032,4.743-0.881,6.099 c-1.913,1.355-4.621,0.825-6.047-1.187c-1.426-2.012-1.031-4.741,0.88-6.099C86.995,41.955,89.702,42.485,91.128,44.497"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M86.806,47.562c1.426,2.012,1.033,4.742-0.882,6.1 c-1.911,1.355-4.62,0.824-6.045-1.188c-1.427-2.011-1.034-4.742,0.879-6.098C82.672,45.02,85.379,45.552,86.806,47.562"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M82.392,51.599c1.427,2.012,1.032,4.742-0.881,6.099 s-4.618,0.826-6.045-1.187c-1.427-2.011-1.032-4.742,0.879-6.098C78.26,49.056,80.966,49.588,82.392,51.599"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M115.61,39.087c1.425,2.01,1.029,4.741-0.884,6.098 c-1.913,1.357-4.62,0.825-6.045-1.186c-1.426-2.012-1.033-4.742,0.88-6.099C111.475,36.544,114.184,37.076,115.61,39.087"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M107.792,39.223c1.425,2.01,1.032,4.741-0.881,6.098 c-1.913,1.357-4.62,0.825-6.047-1.185c-1.427-2.013-1.032-4.742,0.881-6.1C103.658,36.68,106.366,37.21,107.792,39.223"/>, <path fill={color} stroke={color} stroke-miterlimit="10" d="M120.474,34.694c1.427,2.01,1.034,4.742-0.881,6.098 c-1.913,1.355-4.619,0.826-6.048-1.187c-1.424-2.011-1.031-4.742,0.882-6.099C116.342,32.15,119.05,32.683,120.474,34.694"/>	
			);
		}
		else if (this.props.bangs == 3) {
			bangs.push(
				<path fill={color} stroke={color} stroke-miterlimit="10" d="M152.091,69.543c-9.652,0.02-23.308-16.557-28.023-25.678 c-8.967,8.375-45.685,26.744-57.146,26.744c0-14.997,10.301-41.622,41.528-41.622C142.217,28.987,152.091,54.544,152.091,69.543"/>
			);
		}
		else {
			bangs.push(
				<path fill={color} stroke={color} stroke-miterlimit="10" d="M149.47,59.91H70.532c0-15.574,20.703-30.9,39.407-30.9 C129.931,29.01,149.47,44.336,149.47,59.91"/>	
			);
		}
		return bangs;
	},
	getNosePath: function() {
		if (this.props.nose == 3) {
			return "M116.044,92.588c0,2.108-2.705,3.818-6.043,3.818 s-6.043-1.71-6.043-3.818";
		}	
		else if (this.props.nose == 2) {
			return "M103.474,93.86c0.398-0.589,1.104-0.981,1.906-0.981 c0.746,0,1.406,0.338,1.814,0.856v0.001c0.686,0.815,1.729,1.337,2.893,1.337c1.148,0,2.174-0.505,2.861-1.3l-0.01-0.008 c0.408-0.537,1.078-0.887,1.838-0.887c0.709,0,1.34,0.305,1.752,0.781";
		}
		else if (this.props.nose == 1) {
			return "M113.633,97.133c-4.543,2.014-6.455,0.342-7.338-0.431 c-1.131-0.991,4.891-6.915,1.725-20.999";
		}
		else {
			return "M105.767,93.485c-0.006-1.136,1.885-2.065,4.223-2.078 c2.337-0.013,4.238,0.897,4.244,2.033";
		}
	},
	getMouthPaths: function() {
		var mouth = [];
		if (this.props.mouth == 2) {
			mouth.push(
				<path fill="#F3B29E" d="M95.229,104.814c-0.014,0.008,6.952,3.812,14.762,3.812c7.809,0,14.279-3.695,14.279-3.695 s0.302-0.137,0.287-0.141c0,0-10.899,1.199-14.541,1.203C106.334,106,95.229,104.814,95.229,104.814"/>, <path fill="#DCA192" d="M110.166,104.506c-1.985-0.025-2.984-0.908-4.051-0.814c-5.955,0.516-10.535,0.988-10.887,1.123 c0,0,11.295,1.305,14.936,1.297c3.604-0.006,14.393-1.32,14.393-1.32c-0.357-0.141-4.316-0.566-10.423-1.051 C113.161,103.664,112.028,104.529,110.166,104.506"/>	
			);
		}	
		else if (this.props.mouth == 1) {
			mouth.push(
				<path fill="#C48C85" d="M95.631,104.695c-0.016,0.013,6.687,6.404,14.384,6.404c7.696,0,14.072-6.22,14.072-6.22 s0.298-0.266,0.283-0.276c0,0-10.742,1.298-14.331,1.306C106.411,105.917,95.631,104.695,95.631,104.695"/>, <path fill="#AE8075" d="M110.204,103.472c-1.956-0.039-2.94-1.467-3.991-1.316c-5.869,0.838-10.235,2.318-10.582,2.54 c0,0,10.984,1.39,14.572,1.378c3.553-0.013,14.167-1.471,14.167-1.471c-0.352-0.225-4.237-1.585-10.253-2.367 C113.157,102.109,112.04,103.51,110.204,103.472"/>	
			);
		}
		else {
			mouth.push(
				<path fill="#F38780" d="M96.113,104.605c-0.016,0.011-0.023,0.017-0.023,0.017s6.506,5.67,14.09,5.67s13.754-5.638,13.754-5.638 s-0.008-0.006-0.023-0.016c0,0-10.199,0.877-13.611,0.879C106.746,105.518,96.113,104.605,96.113,104.605"/>, <path fill="#E47E73" d="M110.18,103.061c-0.875,0-1.73-0.748-2.559-0.673c-6.113,0.565-11.154,2.032-11.508,2.218 c0,0,10.662,0.913,14.186,0.912c3.416-0.004,13.635-0.863,13.635-0.863c-0.352-0.182-5.021-1.671-11.078-2.256 C111.99,102.315,111.094,103.061,110.18,103.061"/>	
			);			
		}
		return mouth;
	},
	getIrisPaths: function() {
		var irises = [];
		if (this.props.irises == 2) {
			irises.push(
				<circle fill="#5A4137" cx="91.405" cy="77.686" r="4.405"/>, <circle fill="#5A4137" cx="129.605" cy="77.485" r="4.605"/>, <path fill="#020202" d="M89.06,77.419c0,1.23,0.998,2.228,2.229,2.228s2.229-0.997,2.229-2.228c0-1.231-0.998-2.229-2.229-2.229 S89.06,76.188,89.06,77.419"/>, <path fill="#020202" d="M127.377,77.686c0,1.23,0.998,2.228,2.229,2.228s2.229-0.997,2.229-2.228c0-1.231-0.998-2.229-2.229-2.229 S127.377,76.455,127.377,77.686"/>
			);
		}	
		else if (this.props.irises == 1) {
			irises.push(
				<circle fill="#8CB48C" cx="91.405" cy="77.686" r="4.405"/>, <circle fill="#8CB48C" cx="129.605" cy="77.485" r="4.605"/>, <path fill="#020202" d="M89.06,77.419c0,1.23,0.998,2.228,2.229,2.228s2.229-0.997,2.229-2.228c0-1.231-0.998-2.229-2.229-2.229 S89.06,76.188,89.06,77.419"/>, <path fill="#020202" d="M127.377,77.686c0,1.23,0.998,2.228,2.229,2.228s2.229-0.997,2.229-2.228c0-1.231-0.998-2.229-2.229-2.229 S127.377,76.455,127.377,77.686"/>
			);
		}
		else {
			irises.push(
				<circle fill="#558FAB" cx="91.405" cy="77.686" r="4.405"/>, <circle fill="#558FAB" cx="129.605" cy="77.485" r="4.605"/>, <path fill="#020202" d="M89.06,77.419c0,1.23,0.998,2.228,2.229,2.228s2.229-0.997,2.229-2.228c0-1.231-0.998-2.229-2.229-2.229 S89.06,76.188,89.06,77.419"/>, <path fill="#020202" d="M127.135,77.686c0,1.23,0.998,2.228,2.229,2.228s2.229-0.997,2.229-2.228c0-1.231-0.998-2.229-2.229-2.229 S127.135,76.454,127.135,77.686"/>
			);
		}
		return irises;
	},
	getBrowsPath: function() {
		var brows = [];
		if (this.props.brows == 2) {
			brows.push(
				<path fill="#020202" d="M115.403,66.036c0,0,0.012-0.051,0.033-0.15c0.01-0.053,0.027-0.1,0.051-0.164 c0.025-0.068,0.064-0.131,0.109-0.203c0.176-0.301,0.445-0.619,0.838-0.832c0.197-0.111,0.422-0.162,0.67-0.229 c0.244-0.064,0.508-0.133,0.791-0.199c0.566-0.131,1.207-0.266,1.906-0.387c0.701-0.119,1.463-0.225,2.273-0.311 c0.809-0.084,1.666-0.145,2.557-0.176c0.889-0.035,1.812-0.039,2.756-0.023c0.941,0.021,1.904,0.062,2.877,0.154 c0.973,0.086,1.959,0.248,2.924,0.572c0.242,0.068,0.486,0.176,0.723,0.262c0.121,0.049,0.242,0.105,0.359,0.158l0.18,0.082 l0.043,0.02c-0.023-0.01,0.047,0.02,0.043,0.02l0.008,0.004l0.02,0.01l0.072,0.043c0.395,0.213,0.771,0.449,1.145,0.678 c0.371,0.217,0.75,0.465,1.117,0.699c0.365,0.238,0.729,0.461,1.066,0.695c0.662,0.477,1.295,0.909,1.848,1.353 c0.277,0.219,0.549,0.418,0.797,0.625c0.246,0.207,0.48,0.4,0.701,0.584c0.438,0.367,0.809,0.701,1.115,0.971 c0.604,0.551,0.939,0.869,0.939,0.869l-0.119,0.158c0,0-0.396-0.25-1.088-0.67c-0.35-0.205-0.771-0.457-1.266-0.725 c-0.246-0.133-0.51-0.275-0.787-0.424s-0.578-0.289-0.885-0.443c-0.611-0.314-1.301-0.604-2.014-0.926 c-0.359-0.154-0.73-0.289-1.105-0.438c-0.188-0.074-0.377-0.146-0.568-0.222c-0.188-0.072-0.404-0.135-0.611-0.199 c-0.418-0.129-0.844-0.256-1.266-0.406l-0.08-0.029l-0.02-0.006l-0.01-0.006c-0.01-0.004,0.053,0.025,0.021,0.012l-0.033-0.01 l-0.139-0.037c-0.09-0.023-0.178-0.051-0.273-0.074c-0.195-0.037-0.379-0.088-0.584-0.117c-0.801-0.129-1.652-0.23-2.523-0.311 c-0.871-0.074-1.762-0.1-2.641-0.088c-0.881,0.008-1.75,0.055-2.596,0.105c-0.844,0.053-1.66,0.119-2.436,0.182 s-1.508,0.121-2.186,0.174c-0.676,0.059-1.295,0.109-1.846,0.154c-0.271,0.025-0.527,0.049-0.764,0.07 c-0.232,0.023-0.447,0.055-0.646,0.027c-0.402-0.049-0.75-0.211-0.99-0.391c-0.059-0.043-0.111-0.076-0.166-0.119 c-0.055-0.041-0.104-0.061-0.145-0.094c-0.082-0.059-0.127-0.09-0.127-0.09L115.403,66.036z"/>, <path fill="#020202" d="M103.398,66.036c0,0-0.011-0.051-0.033-0.15c-0.01-0.053-0.025-0.1-0.051-0.164 c-0.025-0.068-0.063-0.131-0.109-0.203c-0.177-0.301-0.445-0.619-0.838-0.832c-0.197-0.111-0.422-0.162-0.669-0.229 c-0.245-0.064-0.509-0.133-0.792-0.199c-0.566-0.131-1.205-0.266-1.906-0.387c-0.701-0.119-1.463-0.225-2.273-0.311 c-0.809-0.084-1.666-0.145-2.556-0.176c-0.89-0.035-1.813-0.039-2.757-0.023c-0.941,0.021-1.904,0.062-2.877,0.154 c-0.973,0.086-1.958,0.248-2.925,0.572c-0.239,0.068-0.483,0.176-0.722,0.262c-0.12,0.049-0.241,0.105-0.359,0.158l-0.18,0.082 l-0.043,0.02c0.023-0.01-0.046,0.02-0.041,0.02l-0.01,0.004l-0.018,0.01l-0.074,0.043c-0.393,0.213-0.771,0.449-1.145,0.678 c-0.37,0.217-0.75,0.465-1.117,0.699c-0.364,0.238-0.729,0.461-1.064,0.695c-0.663,0.477-1.297,0.909-1.849,1.353 c-0.278,0.219-0.55,0.418-0.796,0.625c-0.248,0.207-0.482,0.4-0.702,0.584c-0.437,0.367-0.808,0.701-1.114,0.971 c-0.604,0.551-0.939,0.869-0.939,0.869l0.118,0.158c0,0,0.396-0.25,1.088-0.67c0.35-0.205,0.771-0.457,1.265-0.725 c0.247-0.133,0.51-0.275,0.787-0.424s0.578-0.289,0.885-0.443c0.611-0.314,1.301-0.604,2.014-0.926 c0.359-0.154,0.73-0.289,1.105-0.438c0.188-0.074,0.377-0.146,0.568-0.222c0.188-0.072,0.404-0.135,0.611-0.199 c0.418-0.129,0.844-0.256,1.266-0.406l0.08-0.029l0.02-0.006l0.01-0.006c0.01-0.004-0.052,0.025-0.021,0.012l0.034-0.01l0.138-0.037 c0.09-0.023,0.179-0.051,0.273-0.074c0.196-0.037,0.379-0.088,0.584-0.117c0.801-0.129,1.654-0.23,2.523-0.311 c0.871-0.074,1.762-0.1,2.642-0.088c0.88,0.008,1.751,0.055,2.595,0.105c0.844,0.053,1.66,0.119,2.436,0.182 s1.508,0.121,2.186,0.174c0.676,0.059,1.295,0.109,1.845,0.154c0.272,0.025,0.528,0.049,0.765,0.07 c0.234,0.023,0.448,0.055,0.648,0.027c0.4-0.049,0.749-0.211,0.988-0.391c0.059-0.043,0.111-0.076,0.166-0.119 c0.055-0.041,0.104-0.061,0.146-0.094c0.082-0.059,0.126-0.09,0.126-0.09L103.398,66.036z"/>
			);
		}	
		else if (this.props.brows == 1) {
			brows.push(
				<path fill="#020202" d="M117.085,67.278c0,0,0.027-0.196,0.139-0.439c0.113-0.241,0.32-0.532,0.662-0.715 c0.35-0.165,0.789-0.333,1.289-0.53c0.502-0.195,1.074-0.402,1.707-0.61c1.264-0.407,2.766-0.823,4.42-1.08 c0.826-0.132,1.689-0.225,2.574-0.256c0.883-0.034,1.785-0.007,2.684,0.104c0.896,0.109,1.789,0.297,2.641,0.574 c0.211,0.071,0.42,0.148,0.629,0.223c0.205,0.084,0.408,0.175,0.609,0.261c0.379,0.187,0.754,0.37,1.121,0.552 c0.363,0.184,0.723,0.35,1.072,0.538c0.348,0.194,0.689,0.382,1.018,0.57c0.164,0.093,0.326,0.187,0.486,0.276 c0.158,0.092,0.307,0.195,0.459,0.289c0.297,0.192,0.584,0.378,0.861,0.556c0.275,0.178,0.525,0.375,0.768,0.553 c0.24,0.178,0.471,0.344,0.672,0.521c0.205,0.172,0.396,0.334,0.574,0.482c0.166,0.16,0.32,0.307,0.459,0.439 c0.139,0.131,0.256,0.258,0.357,0.367c0.102,0.107,0.189,0.199,0.256,0.275c0.133,0.152,0.205,0.234,0.205,0.234l-0.111,0.117 c0,0-0.082-0.07-0.238-0.201c-0.078-0.066-0.176-0.145-0.287-0.238c-0.113-0.092-0.24-0.201-0.395-0.311 c-0.15-0.111-0.316-0.236-0.498-0.369c-0.188-0.127-0.393-0.262-0.607-0.406c-0.213-0.148-0.457-0.287-0.709-0.434 c-0.127-0.074-0.256-0.148-0.389-0.227c-0.131-0.076-0.262-0.162-0.408-0.234c-0.283-0.148-0.58-0.303-0.887-0.463 c-0.154-0.078-0.309-0.164-0.469-0.238c-0.162-0.074-0.326-0.148-0.494-0.223c-0.334-0.149-0.674-0.312-1.02-0.473 c-0.352-0.159-0.729-0.301-1.102-0.456c-0.373-0.152-0.75-0.306-1.133-0.461c-0.189-0.066-0.377-0.132-0.566-0.197 c-0.191-0.057-0.385-0.117-0.578-0.172c-0.783-0.211-1.602-0.34-2.426-0.396c-0.826-0.055-1.658-0.047-2.477,0.012 c-0.818,0.062-1.621,0.172-2.395,0.312c-1.547,0.289-2.971,0.695-4.172,1.105c-0.6,0.201-1.145,0.402-1.625,0.589 c-0.482,0.188-0.895,0.369-1.24,0.504c-0.354,0.119-0.688,0.074-0.943,0c-0.258-0.072-0.426-0.18-0.426-0.18L117.085,67.278z"/>, <path fill="#020202" d="M103.295,67.278c0,0-0.027-0.196-0.139-0.439c-0.112-0.241-0.32-0.532-0.661-0.715 c-0.351-0.165-0.789-0.333-1.291-0.53c-0.502-0.195-1.074-0.402-1.706-0.61c-1.264-0.407-2.766-0.823-4.42-1.08 c-0.825-0.132-1.689-0.225-2.573-0.256c-0.883-0.034-1.786-0.007-2.684,0.104c-0.897,0.109-1.789,0.297-2.641,0.574 c-0.213,0.071-0.421,0.148-0.63,0.223c-0.206,0.084-0.407,0.175-0.608,0.261c-0.38,0.187-0.754,0.37-1.122,0.552 c-0.364,0.184-0.723,0.35-1.071,0.538c-0.349,0.194-0.69,0.382-1.019,0.57c-0.163,0.093-0.327,0.187-0.485,0.276 c-0.158,0.092-0.308,0.195-0.459,0.289c-0.297,0.192-0.586,0.378-0.861,0.556s-0.525,0.375-0.768,0.553 c-0.24,0.178-0.471,0.344-0.673,0.521c-0.204,0.172-0.396,0.334-0.573,0.482c-0.167,0.16-0.32,0.307-0.459,0.439 c-0.141,0.131-0.255,0.258-0.357,0.367c-0.102,0.107-0.189,0.199-0.256,0.275c-0.134,0.152-0.207,0.234-0.207,0.234l0.111,0.117 c0,0,0.084-0.07,0.239-0.201c0.078-0.066,0.175-0.145,0.288-0.238c0.113-0.092,0.239-0.201,0.394-0.311 c0.15-0.111,0.317-0.236,0.498-0.369c0.188-0.127,0.392-0.262,0.608-0.406c0.213-0.148,0.455-0.287,0.707-0.434 c0.127-0.074,0.258-0.148,0.389-0.227c0.133-0.076,0.264-0.162,0.408-0.234c0.285-0.148,0.582-0.303,0.889-0.463 c0.154-0.078,0.307-0.164,0.469-0.238s0.326-0.148,0.494-0.223c0.334-0.149,0.672-0.312,1.02-0.473 c0.35-0.159,0.728-0.301,1.102-0.456c0.371-0.152,0.75-0.306,1.133-0.461c0.188-0.066,0.375-0.132,0.565-0.197 c0.192-0.057,0.384-0.117,0.579-0.172c0.782-0.211,1.601-0.34,2.426-0.396c0.826-0.055,1.658-0.047,2.477,0.012 c0.818,0.062,1.621,0.172,2.395,0.312c1.547,0.289,2.971,0.695,4.17,1.105c0.601,0.201,1.147,0.402,1.627,0.589 c0.481,0.188,0.894,0.369,1.239,0.504c0.353,0.119,0.688,0.074,0.943,0c0.258-0.072,0.427-0.18,0.427-0.18L103.295,67.278z"/>
			);	
		}
		else {
			brows.push(
					<path fill="#020202" d="M115.655,68.768c0,0-0.022-0.373,0.185-0.426c0.199-0.082,0.496-0.199,0.867-0.342 c0.748-0.285,1.826-0.672,3.139-1.074c1.314-0.404,2.869-0.801,4.561-1.128c0.849-0.159,1.73-0.294,2.633-0.392 c0.904-0.092,1.828-0.158,2.756-0.162c0.927-0.006,1.856,0.034,2.77,0.133c0.912,0.098,1.809,0.252,2.658,0.49 c0.213,0.057,0.422,0.125,0.629,0.187l0.076,0.024l0.038,0.01l0.038,0.013l0.018,0.006l0.145,0.054 c0.098,0.036,0.194,0.071,0.291,0.105c0.383,0.145,0.756,0.287,1.12,0.426c0.734,0.327,1.432,0.635,2.032,0.982 c0.148,0.083,0.299,0.164,0.445,0.243c0.143,0.083,0.276,0.175,0.409,0.258c0.267,0.175,0.525,0.323,0.751,0.489 c0.227,0.167,0.438,0.323,0.635,0.468c0.189,0.151,0.361,0.294,0.515,0.421c0.306,0.259,0.537,0.477,0.692,0.619 c0.156,0.146,0.239,0.223,0.239,0.223l-0.106,0.146c0,0-0.1-0.061-0.281-0.172c-0.092-0.057-0.202-0.124-0.335-0.203 c-0.131-0.08-0.276-0.181-0.448-0.275c-0.17-0.102-0.359-0.211-0.562-0.33c-0.209-0.113-0.433-0.231-0.675-0.361 c-0.236-0.134-0.505-0.248-0.775-0.384c-0.137-0.064-0.277-0.138-0.423-0.2c-0.147-0.062-0.298-0.126-0.452-0.192 c-0.607-0.28-1.289-0.5-1.99-0.771c-0.373-0.114-0.756-0.231-1.146-0.352c-0.097-0.03-0.195-0.063-0.294-0.094l-0.147-0.048 l-0.128-0.033c-0.195-0.05-0.392-0.105-0.59-0.152c-0.2-0.042-0.403-0.085-0.604-0.129c-0.206-0.035-0.414-0.07-0.621-0.107 c-0.416-0.064-0.842-0.121-1.273-0.159c-0.861-0.079-1.746-0.105-2.631-0.086c-0.885,0.022-1.77,0.074-2.644,0.164 c-0.87,0.087-1.726,0.208-2.552,0.342c-0.826,0.13-1.623,0.282-2.375,0.444c-0.753,0.16-1.46,0.337-2.111,0.499 c-1.305,0.329-2.379,0.659-3.126,0.901c-0.374,0.12-0.665,0.221-0.862,0.29c-0.189,0.099-0.423-0.196-0.423-0.196L115.655,68.768z"/>, <path fill="#020202" d="M104.345,68.768c0,0,0.023-0.373-0.185-0.426c-0.2-0.082-0.494-0.199-0.867-0.342 c-0.748-0.285-1.826-0.672-3.139-1.074c-1.313-0.404-2.87-0.801-4.562-1.128c-0.848-0.159-1.73-0.294-2.632-0.392 c-0.903-0.092-1.827-0.158-2.755-0.162c-0.926-0.006-1.856,0.034-2.769,0.133c-0.914,0.098-1.81,0.252-2.659,0.49 c-0.212,0.057-0.421,0.125-0.629,0.187l-0.078,0.024l-0.038,0.01l-0.036,0.013l-0.019,0.006l-0.146,0.054 c-0.097,0.036-0.194,0.071-0.289,0.105c-0.383,0.145-0.756,0.287-1.122,0.426c-0.734,0.327-1.43,0.635-2.029,0.982 c-0.152,0.083-0.3,0.164-0.446,0.243c-0.143,0.083-0.279,0.175-0.411,0.258c-0.266,0.175-0.524,0.323-0.751,0.489 c-0.225,0.167-0.437,0.323-0.632,0.468c-0.19,0.151-0.362,0.294-0.516,0.421c-0.307,0.259-0.537,0.477-0.692,0.619 c-0.155,0.146-0.239,0.223-0.239,0.223l0.107,0.146c0,0,0.097-0.061,0.279-0.172c0.092-0.057,0.204-0.124,0.336-0.203 c0.132-0.08,0.278-0.181,0.45-0.275c0.17-0.102,0.357-0.211,0.561-0.33c0.208-0.113,0.433-0.231,0.673-0.361 c0.237-0.134,0.505-0.248,0.777-0.384c0.138-0.064,0.275-0.138,0.422-0.2c0.147-0.062,0.298-0.126,0.452-0.192 c0.607-0.28,1.29-0.5,1.992-0.771c0.372-0.114,0.755-0.231,1.145-0.352c0.098-0.03,0.194-0.063,0.294-0.094l0.147-0.048l0.13-0.033 c0.195-0.05,0.39-0.105,0.589-0.152c0.199-0.042,0.401-0.085,0.605-0.129c0.206-0.035,0.412-0.07,0.621-0.107 c0.417-0.064,0.841-0.121,1.273-0.159c0.862-0.079,1.746-0.105,2.631-0.086c0.885,0.022,1.771,0.074,2.643,0.164 c0.87,0.087,1.727,0.208,2.552,0.342c0.827,0.13,1.623,0.282,2.375,0.444c0.753,0.16,1.459,0.337,2.113,0.499 c1.305,0.329,2.379,0.659,3.125,0.901c0.374,0.12,0.664,0.221,0.862,0.29c0.188,0.099,0.423-0.196,0.423-0.196L104.345,68.768z"/>
			);
		}
		return brows;
	},
	render: function() {
		var hairPath = this.getHairPath();
		var bodyPath = this.getBodyPath();
		var skinColor = this.getSkinColor();
		var facePath = this.getFacePath();
		var eyes = this.getEyesPaths();
		var bangs = this.getBangsPaths();
		var nosePath = this.getNosePath();
		var mouthPath = this.getMouthPaths();
		var irisPaths = this.getIrisPaths();
		var browsPath = this.getBrowsPath();
		return (
			<div className="svgContainer">
				<svg version="1.1" x="0px" y="0px" width="220px" height="620px" viewBox="0 0 220 620" enable-background="new 0 0 220 620">
					{hairPath}
					<path fill={skinColor} stroke={skinColor} strokeWidth="1" stroke-miterlimit="10" d={bodyPath} />
					<path fill={skinColor} stroke={skinColor} strokeWidth="1" stroke-miterlimit="10" d={facePath} />
					{eyes}
					{browsPath}
					{bangs}
					<path fill="none" stroke="#231F20" strokeWidth="1" stroke-miterlimit="10" d={nosePath} />
					{mouthPath}
					{irisPaths}
				</svg>
			</div>
		)
	}
});

export default SVG;