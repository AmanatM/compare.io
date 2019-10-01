import './app.scss';


import Navbar from './components/navbar/navbar.js';
import Footer from './components/footer/footer.js';



import Home from './pages/home/home.js';
import About from './pages/about/about.js';
import Register from './pages/register/register.js';
import Comparisons from './pages/comparisons/comparisons.js';
import Comparison from './pages/comparison/comparison.js';
import AddComparison from './pages/addComparison/addComparison.js';
import EditComparison from './pages/EditComparison/EditComparison.js';
import Login from './pages/login/login.js';
import User from './pages/user/user.js';
import Error404 from './pages/error404/error404.js';

import mock_data from'./mock-data.js';

console.log(mock_data);

let comparisons = [];
if(localStorage.comparisons != null) {
    comparisons = JSON.parse(localStorage.comparisons);
} else {
    comparisons = mock_data;
}




const routes = {
	'/': Home,
    '/about': About,
    '/register': Register,
    '/login': Login,
    '/comparisons': Comparisons,
    '/user': User,
    '/add-comparison': AddComparison,
    '/comparison/:id': Comparison,
    '/edit/:id': EditComparison

};




function getUrl() {
        let url = location.hash.slice(1).toLowerCase() || '/';
        let r = url.split("/");
        let request = {
            resource    : r[1],
            id          : r[2],
        };
        return request;
}



const router = async () => {

    const content = null || document.getElementById('router_container');
    
    
    let request = getUrl(); //get url

 	
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '');

    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();

  
};

const onload = async() => {

    const header = null || document.getElementById('navbar_container');
    const content = null || document.getElementById('router_container');
    const footer = null || document.getElementById('footer_container');

    header.innerHTML = await Navbar.render();
    await Navbar.drawNavbar();
    await Navbar.after_render();  

    footer.innerHTML = await Footer.render();
    await Navbar.after_render();



    // Get the parsed URl from the addressbar
    let request = getUrl();

     // Parse the URL and if it has an id part, change it with the string ":id"
    let parsedURL = (request.resource ? '/' + request.resource : '/') + (request.id ? '/:id' : '') + (request.verb ? '/' + request.verb : '');


    let page = routes[parsedURL] ? routes[parsedURL] : Error404
    content.innerHTML = await page.render();
    await page.after_render();


};


window.addEventListener('hashchange', router);

window.addEventListener('load', onload);






