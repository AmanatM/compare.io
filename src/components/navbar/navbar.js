import './navbar.scss';

import logo from './compareio-logo.svg';

let Navbar = {
	render: async() => {

		let view = 

		`
			<nav class="navbar">
				<div class="container">

					<div class="header-logo">
						<a href="/#/"><img src="${logo}" alt="compare.io logo"/></a>
					</div>
						
					<button class="toggle-menu" id="toggle-menu">
						<span></span>
						<span></span>
						<span></span>
					</button>

					<ul class="menu" id="menu">

					</ul>

				</div>
			</nav>
		`

		return view;
	},

	drawNavbar: async() => {

		if(sessionStorage.session == undefined) {
			menu.innerHTML = 		
			`			
				<li><a href="/#/">Home page</a></li>
				<li><a href="/#/about">About page</a></li>
				<li><a href="/#/comparisons">Read comparisons</a></li>

				<li><a href="/#/login"><button class="btn login">Log in</button></a></li>
				<li><a href="/#/register"><button class="btn signup">Sign up</button></a></li>						
			`;
		} else {

			let session = JSON.parse(sessionStorage.session);
			menu.innerHTML = 		
			`			
				<li><a href="/#/">Home page</a></li>
				<li><a href="/#/about">About page</a></li>
				<li><a href="/#/comparisons">Read comparisons</a></li>

				<li><a href="/#/add-comparison">Add comparisons</a></li>
				<li class="user"><a href="/#/user">${session.user.email}</a></li>
				<li><button class="btn signup" id="signOut">Sign Out</button></li>					
			`;
		}	


		if(sessionStorage.session) {
			signOut.addEventListener('click', () => {
				sessionStorage.clear();
				Navbar.drawNavbar();
			});
		}	
	},

	after_render: async() => {

		const menu_btn = document.getElementById('toggle-menu');
		const menu = document.getElementById('menu');
		let menu_opened = false; //0 is closed

		menu_btn.addEventListener('click', () => {
			if(menu_opened) {
				menu_btn.classList.remove('active');
				menu.classList.remove('mobile-menu')
				menu_opened = false;
			} else {

				menu_btn.classList.add('active');
				menu.classList.add('mobile-menu');
				menu_opened = true;
			}

		});




	}



};


export default Navbar;