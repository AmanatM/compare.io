import './user.scss';

import trash_body from './trash-body.svg';
import trash_head from './trash-head.svg';
import edit_icon from './edit.svg';

let User = {
	render: async() => {

		if(sessionStorage.session) {

			let session = JSON.parse(sessionStorage.session);
			let view = 
			`
				<section class="user_section" id="user_section">
					<div class="container">
						<div class="content">
							<h3>You are currently logged in as: <i>${session.user.email}</i></h3>
							<h3 class="info-title">Your comparisons:</h3>
							<div id="comparisons"></div>
						</div>
					</div>
				</section>
			`;

			return view;

		} else {
			let view = 
			`
				<section class="user_section" id="user_section">
					<div class="not_logged_content">
						<div class="content">
							<h1>Error - <span class="highlight">Authorise first</span></h1>
							<p><a href="/#/login">Log in</a></p>
						</div>
					</div>
				</section>
			`;
			return view;
		}
	},

	after_render: async() => {

		if(document.getElementById('signOut')) {

			let signOut_btn = document.getElementById('signOut');
			signOut_btn.addEventListener('click', () => {

				let view = 
				`
					<div class="not_logged_content">
						<div class="content">
							<h1>Error - <span class="highlight">Authorise first</span></h1>
							<p><a href="/#/login">Log in</a></p>
						</div>
					</div>
				`;

				user_section.innerHTML = view;

			});
		}


		let id = 2;


		function render() {
			let comparisons_all = [];
			if(localStorage.comparisons != null) {
				comparisons_all = JSON.parse(localStorage.comparisons);
			}


			if(sessionStorage.session) {
				var session = JSON.parse(sessionStorage.session);
			}

			let user = session.user.email;
			let user_comparisons = comparisons_all.filter(item => item.author === user);



			let markup = user_comparisons.map(item => {

				let fullBar = +(item.firstItem.vote) + +(item.secondItem.votes);
				let firstBarWidth = fullBar != 0 ? (item.firstItem.vote / fullBar) * 100 : 0;
				let secondBarWidth = fullBar != 0 ?(item.secondItem.votes / fullBar) * 100: 0;

				if(firstBarWidth == 0 && secondBarWidth == 0) {
					firstBarWidth = 50;
					secondBarWidth = 50;
				}




				return `
					<div id="comparison_item" class="comparison-item" data-id="${item.id}">
						<div class="top-items">
							${user === item.author ? `<div class="ifmy"><small>Your</small></div>` : '' }
<!-- 							<button href="/#/edit/${id}" class="ctrl-element edit">
								<img src="${edit_icon}" class="edit-icon" id="edit_comparison">
							</button> -->
							<button id="delete_comparison" class="ctrl-element delete">
								<img class="trash-head" src="${trash_head}"/>
								<img class="trash-body" src="${trash_body}"/>
							</button>
						</div>
						<a href="/#/comparison/${item.id}" class="title">
							<span class="first">${item.firstItem.title}</span>
							Vs.
							<span class="second">${item.secondItem.title}</span>
						</a href="/#/comarisons/${item.id}">
						<div class="vote-bar">
							<div style="background: #FFC107; width: ${firstBarWidth}%;">${item.firstItem.vote}</div>
							<div style="background: #8BC34A; width: ${secondBarWidth}%;">${item.secondItem.votes}</div>
						</div>
					</div>
				`;

			}).join(' ');

			comparisons.innerHTML = markup;



			let delete_comparison = document.querySelectorAll('#delete_comparison');
			delete_comparison.forEach(item => {
				item.addEventListener('click', (e) => {
					let parent = item.parentNode.parentNode;
					let id = parent.dataset.id;

					let comparisons_all = [];
					if(localStorage.comparisons != null) {
							comparisons_all = JSON.parse(localStorage.comparisons);
					}
					console.log('clicked');


					let newArray = comparisons_all.filter(item => +(item.id) != +(id));




					localStorage.comparisons = JSON.stringify(newArray);
					render();
				});
			});


			let edit_comparison = document.querySelectorAll('#edit_comparison');
			edit_comparison.forEach(item => {
				item.addEventListener('click', (e) => {
					let parent = item.parentNode.parentNode.parentNode;
					let id = parent.dataset.id;
					console.log(parent);

					window.location = `/#/edit/${id}`;
				});
			});

		}

		render();






	}
};

export default User;









