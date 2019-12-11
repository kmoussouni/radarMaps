import axios from 'axios';

var currentSection = 'home';


function exitResume() {
    // e.preventDefault();
    ShowSection('card')
};

function exitContact() {
    ShowSection('card')
};

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

function showProject(project) {
    console.log('showProject ' + project.title);
}

function ShowSection(UIId) {
    var UIElemeents = ["loading", "card", "info", "contact", "resume", "project"];

    if(document.getElementById(UIId)) {
        UIElemeents.map(function(UIElmnt) {
            if(document.getElementById(UIElmnt)) {
                if(UIElmnt == UIId) {
                    document.getElementById(UIId).style.display = 'block';
                } else {
                    document.getElementById(UIElmnt).style.display = 'none';
                }
                if('card' === UIId) {
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

function updateClock() {
    var now = new Date();

    document.getElementById('time').innerHTML = now.toDateString() + ' ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds() + ':' + now.getMilliseconds();
    setTimeout(updateClock, 1000);
}

updateClock();

// Resume
document.getElementById("exitResume").onclick = exitResume;

// ContactForm

document.getElementById("submitContactForm").onclick = submitContactForm;
document.getElementById("exitContact").onclick = exitContact;

// Projects

// exports
export {ShowSection, showProject, updateProgress};
