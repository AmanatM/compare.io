
import './about.scss';

let About  = {
	render: async() => {
		let view = 
		`
			<section class="about">
				<h2> About compare.io !</h2>
			</section>
		`;

		return view;
	},

	after_render: async() => {
		
	}
}

export default About;