import './home.scss';


import Header from '../../components/header/header.js';

let Home = {
	render: async() => {

		let header_component = await Header.render();

		let view = 
		`
			<div class="home">
				${header_component}
				<section class="slogan">
					<h2>" Like any blog, unlike any blog "</h2>
				</section>
			</div>
		`;

		return view;
	},

	after_render: async() => {
		
	}
}

export default Home;