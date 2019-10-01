import './login.scss';

import PopUp from '../../components/pop-up/popUp.js';
import Navbar from '../../components/navbar/navbar.js';


let Login = {
	render: async() => {

		let pop_up_component = await PopUp.render();


		let view = 
		`
			<section class="login">

				${pop_up_component}

				<div class="content-left content-both">
					<form action="" id="login_form" class="login">

						<input autocomplete type="email" id="email" placeholder="Email"/>
						<input autocomplete type="password" id="password" placeholder="Password"/>

						<button class="btn" type="submit">Log in</button>
					</form>
				</div>

				<div class="content-right content-both">
					<div class="content">
						<h3 class="above-slogan">Log in</h3>
						<h1 class="slogan">
							<span class="highlight">Compare</span> anything
						</h1>
						<p class="under-slogan">Don't have an account? <a href="/#/register">Sign up</a></p>
					</div>
				</div>

			</section>
		`;

		return view;
	}, 
	after_render: async() => {
		await PopUp.after_render();



		login_form.addEventListener('submit', function(e) {
			e.preventDefault();

			let users = null;
			let login_user = null;

			if(localStorage.users != null) {

				users = JSON.parse(localStorage.users); 
				login_user = users.find(user => user.email === email.value);

			} else {
				PopUp.pop('error', 'Authentication failed', 'Try again');
			}


			if(login_user) {

				if(login_user.password === password.value) {
					PopUp.pop('success', 'Logged in successfuly', 'Go to <a href="/#/">Main page</a>');

					sessionStorage.session = JSON.stringify({
							user: login_user
						}
					);

					Navbar.drawNavbar();
 				} else {
					PopUp.pop('error', 'Authentication failed', 'Try again');
				}

			} else {
				PopUp.pop('error', 'Authentication failed', 'Try again');
			}

			console.log(login_user);


		});


	}
};

export default Login;







