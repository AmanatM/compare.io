import './header.scss';



let Header = {
	render: async() => {

		let view = 

		`
			<header class="header">
				<div class="content">
					<h1><span class="highlighted">COMPARE</span>.IO </h1>
					<div class="action-btns">
						<a href="/#/about"><button class="btn about">ABOUT</button></a>
						<a href="/#/comparisons"><button class="btn read">READ</button></a>
					</div>
				</div>
			</header>
		`

		return view;
	},

	after_render: async() => {

	}

};


export default Header;