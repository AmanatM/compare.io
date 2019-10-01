import './error404.scss';

let Error404 = {

	render: async() => {
		let view = 
		`
			<section class="error">
				<div class="content">
					<h1>Error <span class="highlight">404</span> - no page found</h1>
					<p onclick="history.go(-1)">Go back</p>
				</div>
			</section>
		`;

		return view;
	},

	after_render: async() => {

	}

};

export default Error404;