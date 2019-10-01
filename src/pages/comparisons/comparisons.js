import './comparisons.scss';

let Comparisons = {
	render: async() => {

		let view = await
		`
			<section class="comparisons">
				<div class="container">
					<div class="content" id="content">

					</div>
				</div>
			</section>
		`;

		return view;
	},

	after_render: async() => {


		let comparisons = [];
		if(localStorage.comparisons != null) {
			comparisons = JSON.parse(localStorage.comparisons);
		}


		let session = null;
		if(sessionStorage.session) {
			session = JSON.parse(sessionStorage.session);
		}
		let user = session ? session.user.email : null;



		let data = comparisons.map(item => {


			let fullBar = +(item.firstItem.vote) + +(item.secondItem.votes);
			let firstBarWidth = fullBar != 0 ? (item.firstItem.vote / fullBar) * 100 : 0;
			let secondBarWidth = fullBar != 0 ?(item.secondItem.votes / fullBar) * 100: 0;


			let minWidth = 20; 

			if(firstBarWidth == 0 && secondBarWidth == 0) {
				firstBarWidth = 50;
				secondBarWidth = 50;
			} else if(firstBarWidth == 100) {
					secondBarWidth = 20;
			} else if(secondBarWidth == 100) {
				firstBarWidth = 20;
			} else if(firstBarWidth < minWidth) {
				firstBarWidth = minWidth
			} else if(secondBarWidth < minWidth) {
				secondBarWidth = minWidth
			}


			return `
				<a href="/#/comparison/${item.id}" class="comparison-item">
					${user === item.author ? `<div class="ifmy"><small>Your</small></div>` : '' }
					<h3>
						<span class="first">${item.firstItem.title}</span>
						<br>
						Vs.
						<br>
						<span class="second">${item.secondItem.title}</span>
					</h3>
					<div class="vote-bar">
						<div style="background: #FFC107; width: ${firstBarWidth}%;">${item.firstItem.vote}</div>
						<div style="background: #8BC34A; width: ${secondBarWidth}%;">${item.secondItem.votes}</div>
					</div>
				</a>
			`;

		}).join(' ');

		content.innerHTML = data;



		


	}
};

export default Comparisons;