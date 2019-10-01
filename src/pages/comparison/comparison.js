import './comparison.scss';

let Comparison = {
	render: async() => {
		let view = 
		`
			<section class="comparison">
				<div id="content" class="content">
					Loading...
				</div>
				<div class="common">
					<h3 class="title">Common</h3>
					<p class="info"><i>Here you can find information related to this post, so that you better understand comparison</i></p>
					<div class="common_content" id="common_content"></div>
				</div>
				<div id="vote_bar"></div>
			</section>
		`;
		return view;
	},

	after_render: async() => {

		function getUrl() {
	        let url = location.hash.slice(1).toLowerCase() || '/';
	        let r = url.split("/");
	        let request = {
	            resource    : r[1],
	            id          : r[2],
       		};

       		return request;
		}

	    let comparison_id = getUrl().id; //get id



		let comparisons_all = [];
		if(localStorage.comparisons != null) {
			comparisons_all = JSON.parse(localStorage.comparisons);
		}

		let comparison_current = comparisons_all.find(item => item.id === +(comparison_id));



		let firstExtras = '';
		for(let i = 0; i < comparison_current.firstItem.extras.length; i++) {
			let item = comparison_current.firstItem.extras[i].type == "img" ? `<img src="${comparison_current.firstItem.extras[i].src}" class="extra_img"/>` : `<p class="extra_text">${comparison_current.firstItem.extras[i].text}</p>`;
			firstExtras += item;
		}	

		let secondExtras = '';
		for(let i = 0; i < comparison_current.secondItem.extras.length; i++) {
			let item = comparison_current.secondItem.extras[i].type == "img" ? `<img src="${comparison_current.secondItem.extras[i].src}" class="extra_img"/>` : `<p class="extra_text">${comparison_current.secondItem.extras[i].text}</p>`;
			secondExtras += item;
		}	

		let compare_markup = 
		`
			<div class="first-container">
				<div class="data-content">
					<h2 class="title">${comparison_current.firstItem.title}</h2>
					<p class="description">${comparison_current.firstItem.description}</p>
					${firstExtras}
				</div>
			</div>
			<div class="second-container">
				<div class="data-content">
					<h2 class="title">${comparison_current.secondItem.title}</h2>
					<p class="description">${comparison_current.secondItem.description}</p>
					${secondExtras}
				</div>
			</div>
		`;
		content.innerHTML = compare_markup;



		//commpon 

		let common_markup = '';
		common_markup += comparison_current.common.imgs.map(item => `<img src="${item}"/>`);
		common_markup += comparison_current.common.youtubeLinks.map(item => `<iframe src="${item}" style="width: 100%; max-width: 500px;" allowfullscreen height="215" frameborder="0"></iframe>`);
		common_markup += comparison_current.common.text.map(item => {
			if(item.substring(0, 4) == 'http') {
				return `<a href="${item}" target="_blank">${item}</a>`
			} else {
				return `<p>${item}</p>`
			}
		});
		common_content.innerHTML = common_markup;



		// vote bar

		async function renderVoteBar() {

			let fullBar = +(comparison_current.firstItem.vote) + +(comparison_current.secondItem.votes);
			let firstBarWidth = fullBar != 0 ? (comparison_current.firstItem.vote / fullBar) * 100 : 0;
			let secondBarWidth = fullBar != 0 ?(comparison_current.secondItem.votes / fullBar) * 100: 0;

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

			let voteBar_markup = {

				render: async() => {

					let view = `
						<div class="vote-info">
							<div class="container">
								<p> - Click to <span class="yellow">Yellow box</span> to vote for ${comparison_current.firstItem.title}</p>
								<p> - Click to <span class="green">Green box</span> to vote for ${comparison_current.secondItem.title}</p>
							</div>
						</div>
						<div class="vote-bar">
							<div id="vote_first" style="background: #FFC107; width: ${firstBarWidth}%;">${comparison_current.firstItem.vote}</div>
							<div id="vote_second" style="background: #8BC34A; width: ${secondBarWidth}%;">${comparison_current.secondItem.votes}</div>
						</div>
					`;

					return view;
				},

				after_render: async() => {

					function save() {
						localStorage.comparisons = JSON.stringify(comparisons_all);
					}

					vote_first.addEventListener('click', () => {
						comparison_current.firstItem.vote++;
						save();
						renderVoteBar();
					});

					vote_second.addEventListener('click', () => {
						comparison_current.secondItem.votes++;
						save();
						renderVoteBar();

					});
				}
			}

			vote_bar.innerHTML = await voteBar_markup.render();	
			await voteBar_markup.after_render();	
		}

		renderVoteBar();

	    
	}
};

export default Comparison;













