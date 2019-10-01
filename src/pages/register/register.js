import './register.scss';

import PopUp from '../../components/pop-up/popUp.js';

let Register = {
	render: async() => {

		let pop_up_component = await PopUp.render();


		let view = 
		`
			<section class="register">

				${pop_up_component}


				<div class="content-left content-both">
					<div class="content">
						<h3 class="above-slogan">Register</h3>
						<h1 class="slogan">
							Start writing your <br /> own <span class="highlight">comparisons</span>
						</h1>
						<p class="under-slogan">Already have an account? <a href="/#/login">Log in</a></p>
					</div>
				</div>

				<div class="content-right content-both">
					<form id="registration_form" action="" class="register">

						<input autocomplete required type="email" id="email" placeholder="Email"/>
						<input autocomplete required type="password" id="password" placeholder="Password"/>
						<input autocomplete required type="password" id="repeat_password" placeholder="Repeat password"/>

						<button class="btn" type="submit">Register</button>
					</form>
				</div>
			</section>
		`;

		return view;
	}, 

	after_render: async() => {

		await PopUp.after_render();



		registration_form.addEventListener('submit', function(e) {
			e.preventDefault();

			let users = [];
			
			if(localStorage.users != null) {
				users = JSON.parse(window.localStorage.users)
			}

			console.log(users);



			if(users.find(user => user.email === email.value)) {

				PopUp.pop('error', 'Email already exsists!', 'Try to login with this email or create new accaunt');

			}

			else if(password.value === repeat_password.value) {

				let user = {
					email: email.value,
					password: password.value
				};

				users.push(user);

				PopUp.pop('success', 'User successfuly created!', 'Go to <a href="/#/login">Login page</a>');


				email.value = '';
				password.value= '';
				repeat_password.value = '';


				window.localStorage.users = JSON.stringify(users);


			} else {
				PopUp.pop('error', 'Passwords do not match', 'Try enter passwords one more time');
			}

		});


	}
};

export default Register;