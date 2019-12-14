var TWEEN = require('tween/tween.js');
import axios from 'axios';
import Translator from '../../public/bundles/bazingajstranslation/js/translator.min';

var currentSection = 'home';

function Home() {
    ShowSection('card');
    document.getElementById('modal').classList.remove("is-active");
}

function submitContactForm() {
    var technos = document.getElementById('technos');
    var selectedTechnos =  Array.from(technos.selectedOptions)
        .map(option => option.value);

    axios.post('/api/quotations',
        {
            lastname: document.getElementById('lastname').value,
            firstname: document.getElementById('firstname').value,
            mail: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            text: document.getElementById('message').value,
            type: document.getElementById('type').value,
            contract: document.getElementById('contract').value,
            technos: selectedTechnos
        }
    ).then(function (response) {
        if(response) {
            ShowSection('card')
        }
    })
    .catch(function (error) {
        console.log(error);
    });;
};

function ShowSection(UIId) {
    var UIElemeents = ["loading", "card", "info", "contact", "resume", "article", "modals"];

    if(document.getElementById(UIId)) {
        UIElemeents.map(function(UIElmnt) {
            if(document.getElementById(UIElmnt)) {
                if(UIElmnt == UIId) {
                    var tweenOpacity = new TWEEN.Tween({v: 1})
                    .to({ v: 0 }, 1000)
                    .onUpdate(function() {
                        document.getElementById(UIId).style.opacity=this.v;
                    });
                    tweenOpacity.start();

                    document.getElementById(UIId).style.display = 'block';
                } else {
                    var tweenOpacity = new TWEEN.Tween({v: 0})
                        .to({ v: 1 }, 1000)
                        .onUpdate(function() {
                            document.getElementById(UIId).style.opacity=this.v;
                        });
                    tweenOpacity.start();
                    document.getElementById(UIElmnt).style.display = 'none';
                }
                if('card' === UIId) {
                    var tweenOpacity = new TWEEN.Tween({v: 0})
                    .to({ v: 1 }, 1000)
                    .onUpdate(function() {
                        document.getElementById('info').style.opacity=this.v;
                    });
                    tweenOpacity.start();

                    document.getElementById('info').style.display = 'block';
                }
            }
        });
    }
}

function updateProgress(e) {
    if(document.getElementById('progress')) {
        document.getElementById('progress').value = (e.loaded / e.total) * 100;
    }
}

function changeMusic(id) {
    // Update Modal
    document.getElementById('modal_title').innerHTML = "Coming soon...";
    document.getElementById('modal_body').innerHTML = "Music #"+id;
    document.getElementById('modal_image').src = "https://picsum.photos/id/512/512";
    document.getElementById('modal').classList.add("is-active");
    ShowSection('modal');
}

function changeDance(id) {
    // Update Modal
    document.getElementById('modal_title').innerHTML = "Coming soon...";
    document.getElementById('modal_body').innerHTML = "Dance #"+id;
    document.getElementById('modal_image').src = "https://picsum.photos/id/512/512";
    document.getElementById('modal').classList.add("is-active");

    ShowSection('modal');
}

function updateClock() {
    var now = new Date();

    document.getElementById('time').innerHTML = now.toDateString() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds();
    setTimeout(updateClock, 1000);
}
updateClock();

// ContactForm
document.getElementById("exitContact").onclick = Home;
document.getElementById("submitContactForm").onclick = submitContactForm;

// Projects
document.getElementById("exitProject").onclick = Home;

// Modal
document.getElementById("exitModal").onclick = Home;

// Misc
// document.getElementById("evts").onkeydown = function(evt) {
//     // evt.preventDefault();
//     if(evt.key === "Escape") {
//         ShowSection('card');
//     }
// };

function updateBillBoard(mesh, mouse) {
    // console.log(mesh);
    var bb;

    if(bb) {
        if(bb == 'Project') {
            console.log(bb.elmnt);
            bb.style.x = mouse.x;
            bb.style.y = mouse.y;
            bb = document.getElementById('billboard'+(mesh.name.charAt(0).toUpperCase() + mesh.name.slice(1)));
            document.getElementById('billboardBody').innerHTML = mesh.elmnt.title;

            bb.style.display = 'block';
            bb.style.posx.value = mouse.x;
            bb.style.posy.value = mouse.y;
        }
        else if(mesh.name == 'Shoes' || mesh.name == 'Bottoms' || mesh.name == 'Shoes' || mesh.name == 'Hats' || mesh.name == 'Tops') {
            bb = document.getElementById('billboardResume');
            console.log(bb.elmnt);
            bb.style.display = 'block';
            bb.style.posx.value = mouse.x;
            bb.style.posy.value = mouse.y;
        }
    }
}

document.getElementById("exitResume").onclick = Home;

document.getElementById("music#1").onclick = changeMusic(1);
document.getElementById("music#2").onclick = changeMusic(2);
document.getElementById("music#3").onclick = changeMusic(3);
document.getElementById("music#4").onclick = changeMusic(4);

document.getElementById("dance#1").onclick = changeDance(1);
document.getElementById("dance#2").onclick = changeDance(2);
document.getElementById("dance#3").onclick = changeDance(3);
document.getElementById("dance#4").onclick = changeDance(4);

// exports
export {ShowSection, updateProgress, updateBillBoard};
