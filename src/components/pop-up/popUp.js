import './popUp.scss';


let PopUp = {
	render: async() => {

		let view = 
		`
			<div id="pop_up" class="pop-up">
				<div class="content" id="content">
					<div class="close" id="close_btn">
						<span></span>
						<span></span>
					</div>
					<h4 id="pop_up_msg"></h4>
					<p id="pop_up_extra"></p>
				</div>
			</div>
		`;

		return view;
	},

	after_render: async() => {


		function close() {
			pop_up.classList.remove('active');
			pop_up.classList.remove('error');
			pop_up.classList.remove('info');
			pop_up.classList.remove('success');
			pop_up_msg.innerHTML = '';
			pop_up_extra.innerHTML = '';
		}

		close_btn.addEventListener('click', close());

		content.addEventListener('click', close());

		pop_up.addEventListener('click', () => {

			if(pop_up.classList.contains('active')) {
				pop_up.classList.remove('active');
			} else {
				return false;
			}

		});

	},

	pop: async(status, msg, extra) => {

		let popUp = document.getElementById('pop_up');


		// status could be one of this: success, error, info
		popUp.classList.add('active');

		popUp.classList.remove('error');
		popUp.classList.remove('info');
		popUp.classList.remove('success');

		popUp.classList.add(status);

		pop_up_msg.innerHTML = msg;
		pop_up_extra.innerHTML = extra;


	}
}

export default PopUp;