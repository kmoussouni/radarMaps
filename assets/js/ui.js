import axios from 'axios';

var currentSection = 'home';


function exitResume() {
    // e.preventDefault();
    ShowSection('card')
    console.log('click on exit resume');
};

function exitContact() {
    ShowSection('card')
    console.log('click on exit contact');
};

function submitContactForm() {
    console.log('submitContactForm');
    axios.post('/api/quotations',
    [
        {
            lastname: document.getElementById('lastname').valueOf(),
            firstname: document.getElementById('firstname').valueOf(),
            email: document.getElementById('email').valueOf(),
            subject: document.getElementById('subject').valueOf(),
            message: document.getElementById('message').valueOf(),
            type: document.getElementById('type').valueOf(),
            contract: document.getElementById('contract').valueOf(),
            technos: document.getElementById('technos').valueOf()
        }
    ]
    );
};

function showProject(project) {
    console.log('showProject ' + project.title);
}

function ShowSection(UIId) {
    var UIElemeents = ["loading", "spinner", "card", "exit", "contact", "resume", "project"];

    if(document.getElementById(UIId)) {
        UIElemeents.map(function(UIElmnt) {
            if(document.getElementById(UIElmnt)) {
                if(UIElmnt == UIId) {
                    console.log(UIId);
                    document.getElementById(UIId).style.display = 'block';
                } else {
                    document.getElementById(UIElmnt).style.display = 'none';
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


// Resume
document.getElementById("exitResume").onclick = exitResume;

// ContactForm

document.getElementById("submitContactForm").onclick = submitContactForm;
document.getElementById("exitContact").onclick = exitContact;

// Projects

// exports
export {ShowSection, showProject, updateProgress};
