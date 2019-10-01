import './footer.scss';

import compareio_logo from './compareio-icon-white.svg';
import neobis_logo from './neobis-logo-white.svg';


let Footer = {
	render: async() => {
		let view = 

		`
			<footer class="footer">
				<div class="container">

					<div class="col-1 logos">
						<ul>
							<li><img class="compareio-logo" src="${compareio_logo}"/></li>
							<li><img src="${neobis_logo}"/></li>
						</ul>
					</div>

					<div class="col-1 footer-menu">
						<ul>
							<li><a href="/#/">Home page</a></li>
							<li><a href="/#/about">About page</a></li>
							<li><a href="/#/comparisons">Read comparisons</a></li>
						</ul>
					</div>


					<div class="col-1 social">
						<ul>
							<li><a href="" target="_blank" rel="noopener">Github</a></li>
							<li><a href="" target="_blank" rel="noopener">Lorem</a></li>
							<li><a href="" target="_blank" rel="noopener">Lorem</a></li>
						</ul>
					</div>

				
				</div>

				<div class="copyright">
					Amanat Murzaliev
				</div>
			</footer>
		`;

		return view;
	},

	after_render: async() => {

	}

};


export default Footer;