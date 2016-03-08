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

export default Main;