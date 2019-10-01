import './addComparison.scss';

import add_btn_icon from './add-icon.svg';
import youtube_icon from './youtube-icon.svg';
import image_icon from './image-icon.svg';
import text_icon from './text-icon.svg';
import link_icon from './link-icon.svg';
import exit_icon from './exit_icon.svg';

import PopUp from '../../components/pop-up/popUp.js';


let AddComparison = {
	render: async() => {

		let PopUpComponent = await PopUp.render();
		let view = 
		`
			<section class="add-comparison">

				${PopUpComponent}
				
				<form id="comparison_form" action="" class="add-comparison">
					<div class="content-both">

						<div class="first-item both-items" id="first_item">
							<div class="content">
								<h4 class="title">1st Item</h4>
								<input required type="text" class="first-title" id="title" placeholder="Title" />
								<textarea  placeholder="Description" name="" id="description" cols="auto" rows="2"></textarea>

								<div class="btns">
									<span title="Add text field" class="icon-btn add-text appear_btn" id="add_text_btn"><img src="${text_icon}" alt="" /></span>
									<span class="icon-btn add-info" id="add_btn"><img src="${add_btn_icon}" alt="" /></span>
									<span title="Add link to image" class="icon-btn add-img appear_btn" id="add_img_btn"><img src="${image_icon}" alt="" /></span>
								</div>
							</div>
						</div>

						<div class="second-item both-items" id="second_item">
							<div class="content">
								<h4 class="title">2nd Item</h4>
								<input required type="text" class="first-title" id="title" placeholder="Title" />
								<textarea  placeholder="Description" name="" id="description" cols="auto" rows="2"></textarea>
								<div class="btns">
									<span title="Add text field" class="icon-btn add-text appear_btn" id="add_text_btn"><img src="${text_icon}" alt="" /></span>
									<span class="icon-btn add-info" id="add_btn"><img src="${add_btn_icon}" alt="" /></span>
									<span title="Add link to image" class="icon-btn add-img appear_btn" id="add_img_btn"><img src="${image_icon}" alt="" /></span>
								</div>
							</div>
						</div>

					</div>

					<div class="content-common">
						<div class="container">
							<h3 class="title">Common</h3>
							<p class="info"><i>Here you can add links(to source other than this, it may be other comparisons of same items)<br/>
 or other kind of information about compares
</i></p>
							<div class="content">
								<div class="btns">

									<span class="icon-btn add-info" id="common_add_btn"><img src="${add_btn_icon}" alt="" /></span>
									<div class="appear_btns">
										<span class="icon-btn" id="add_common_link_btn"><img src="${link_icon}" alt="" /></span>
										<span class="icon-btn" id="add_common_img_btn"><img src="${image_icon}" alt="" /></span>
										<span class="icon-btn" id="add_common_youtube_btn"><img src="${youtube_icon}" alt="" /></span>
									</div>
								</div>
							</div>

							<button class="btn post-btn" type="submit">POST!</button>
						</div>
					</div>
					
				</form>

			</section>
		`;

		return view;
	},

	after_render: async() => {

		await PopUp.after_render();

		if(!sessionStorage.session) {
			PopUp.pop('info', 'Log in first', 'You will not be able to add comparisons until you log in!');
		} 

		const exit_event = () => {
			let exitBtn = document.querySelectorAll('#exit_btn');
			exitBtn.forEach((item) => {
				item.addEventListener('click', (e) => {
					let parent = e.target.parentNode;
					parent.remove();
				});
			});
		}

		add_btn.forEach(item => {
			item.addEventListener('click', function() {
				item.classList.toggle('active');
				let parent  = item.parentNode;


				let btn_add_text = parent.querySelectorAll('#add_text_btn')[0];
				let btn_add_img = parent.querySelectorAll('#add_img_btn')[0];

				btn_add_text.classList.toggle('active');
				btn_add_img.classList.toggle('active');

			});
		});


		add_text_btn.forEach(item => {
			item.addEventListener('click', async function(e) {

				let parent = e.target.parentNode.parentNode;
				let newItem = document.createElement('div');
				newItem.classList.add('input-container');

				let input = {
					render: async() => {
						let view = `<textarea cols="auto" rows="2" placeholder="Add information" name="text_information" id="extra" type="text"></textarea><img id="exit_btn" class="exit_btn"src="${exit_icon}"/>`;
						return view;
					},

					after_render: async() => {
						exit_event();
					}
				};

				newItem.innerHTML = await input.render();
				parent.before(newItem);
				await input.after_render();
			});
		});


		add_img_btn.forEach(item => {
			item.addEventListener('click', async function(e) {

				let parent = e.target.parentNode.parentNode;
				let newItem = document.createElement('div');
				newItem.classList.add('input-container');

				let input = {
					render: async() => {
						let view = `<input type="url" id="img_link" placeholder="Insert link to image"/><img id="exit_btn" class="exit_btn"src="${exit_icon}"/>`;
						return view;
					},

					after_render: async() => {
						let img_link = document.getElementById('img_link');

						img_link.addEventListener('change', function() {
							let img_url = this.value;

							newItem.innerHTML = `<img src="${img_url}" name="extra_img_link" id="extra"/><img id="exit_btn" class="exit_btn" src="${exit_icon}"/>`;
							exit_event();
						});

						exit_event();
					}
				};


				newItem.innerHTML = await input.render();
				parent.before(newItem);
				await input.after_render();

			});
		});

		common_add_btn.addEventListener('click', function() {
			this.classList.toggle('active');
			add_common_link_btn.classList.toggle('active');
			add_common_img_btn.classList.toggle('active');
			add_common_youtube_btn.classList.toggle('active');
		});



		add_common_link_btn.addEventListener('click', async function(e) {

			let parent = e.target.parentNode.parentNode.parentNode;
			let newItem = document.createElement('div');
			newItem.classList.add('input-container');

			let input = {
				render: async() => {
					let view = `<textarea cols="auto" rows="1" type="url" id="common_link_input" placeholder="Insert text or link"></textarea><img id="exit_btn" class="exit_btn"src="${exit_icon}"/>`;
					return view;
				}, 

				after_render: async() => {

					let link_input =  document.getElementById('common_link_input');

					link_input.addEventListener('change', async function() {
					})

					exit_event();
				}
			};

			newItem.innerHTML = await input.render();
			parent.before(newItem);
			await input.after_render();

		});

		add_common_img_btn.addEventListener('click', async (e) => {

				let parent = e.target.parentNode.parentNode.parentNode;
				let newItem = document.createElement('div');
				newItem.classList.add('input-container');

				let input = {
					render: async() => {
						let view = `<input type="url" id="img_link" placeholder="Insert link to image"/><img id="exit_btn" class="exit_btn"src="${exit_icon}"/>`;
						return view;
					},

					after_render: async() => {
						let img_link = document.getElementById('img_link');

						img_link.addEventListener('change', function() {
							let img_url = this.value;

							newItem.innerHTML = `<img src="${img_url}" id="common_img_links" /><img id="exit_btn" class="exit_btn"src="${exit_icon}"/>`;
							exit_event();
						});

						exit_event();
					}
				};


				newItem.innerHTML = await input.render();
				parent.before(newItem);
				await input.after_render();

		});


		add_common_youtube_btn.addEventListener('click', async function(e) {

			let parent = e.target.parentNode.parentNode.parentNode;
			let newItem = document.createElement('div');
			newItem.classList.add('input-container');

			let input = {
				render: async() => {
					let view = `<input type="url" id="youtube_link" placeholder="Insert youtube video link"/><img id="exit_btn" class="exit_btn"src="${exit_icon}"/>`;
					return view;
				},

				after_render: async() => {
					let youtube_link = document.getElementById('youtube_link');

					youtube_link.addEventListener('change', function() {
						let youtube_url = this.value;
						let url = youtube_url.replace("watch?v=", "embed/");

						newItem.innerHTML = `<iframe src="${url}" id="youtube_link_iframe" style="width: 80%; max-width: 800%;" height="215" frameborder="0"></iframe><img id="exit_btn" class="exit_btn"src="${exit_icon}"/>`;
						exit_event();
					});

					exit_event();
				}
			};



			newItem.innerHTML = await input.render();
			parent.before(newItem);
			await input.after_render();



		});



		comparison_form.addEventListener('submit', function(e) {
			e.preventDefault();
			if(sessionStorage.session) {


				let session = JSON.parse(sessionStorage.session);

				let common_youtube_links = [];
				if(document.querySelectorAll('#youtube_link_iframe')) {
					let youtube = document.querySelectorAll('#youtube_link_iframe');
					youtube.forEach((item) => {
						common_youtube_links.push(item.src);
					});
				}


				let common_text = [];
				if(document.querySelectorAll('#common_link_input')) {
					let link = document.querySelectorAll('#common_link_input');
					link.forEach((item) => {
						common_text.push(item.value);
					});
				}

				let common_img_links = [];
				if(document.querySelectorAll('#common_img_links')) {
					let img_link = document.querySelectorAll('#common_img_links');
					img_link.forEach((item) => {
						common_img_links.push(item.src);
					});
				}

				let firstExtras = [];
				if(first_item.querySelectorAll('#extra')) {
					let extras = first_item.querySelectorAll('#extra');
					for(let i = 0; i < extras.length; i++) {
						let item = {
							order: null
						};

						if(extras[i].name == 'extra_img_link') {

							item.type = 'img';
							item.src = extras[i].src;

						} else if(extras[i].name == 'text_information') {

							item.type = 'text';
							item.text = extras[i].value;

						}
						item.order = i;
						firstExtras.push(item);
					}
				};

				let secondExtras = [];
				if(second_item.querySelectorAll('#extra')) {
					let extras = second_item.querySelectorAll('#extra');
					for(let i = 0; i < extras.length; i++) {
						let item = {
							order: null
						};

						if(extras[i].name == 'extra_img_link') {

							item.type = 'img';
							item.src = extras[i].src;

						} else if(extras[i].name == 'text_information') {

							item.type = 'text';
							item.text = extras[i].value;

						}
						item.order = i;
						secondExtras.push(item);
					}
				};




				//add votes!
				let comparisonJSON = {

					id: Math.floor(Math.random() * 99999999) + 1 ,

					firstItem: {
						vote: 0,
						title: first_item.querySelector('#title').value,
						description: first_item.querySelector('#description').value,
						extras: firstExtras
					},

					secondItem: {
						votes: 0,
						title: second_item.querySelector('#title').value,
						description: second_item.querySelector('#description').value,
						extras: secondExtras
					},

					common: {
						youtubeLinks: common_youtube_links,
						text: common_text,
						imgs: common_img_links
					},

					author: session.user.email
				};



				let comparisons_all = [];

				if(localStorage.comparisons != null){
				    comparisons_all = JSON.parse(window.localStorage.comparisons);
				}

				try {

					comparisons_all.push(comparisonJSON);
					localStorage.comparisons = JSON.stringify(comparisons_all);

					let field_to_delete = document.querySelectorAll('.input-container');

					field_to_delete.forEach((item) => {
						item.remove();
					});
					title.forEach(item => item.value = '');
					description.forEach(item => item.value = '');

					PopUp.pop('success', 'Comparison successfully posted!', '<a href="/#/comparisons">Go to all comparisons</a>');
				}

				catch {
					PopUp.pop('error', 'Something went wrong', 'Try one more time!');
				}



			} else {
				PopUp.pop('error', 'Log in first', 'Log in to add comparison!(Your current data will not be saved!)');
			}
		});







	}
};

export default AddComparison;




