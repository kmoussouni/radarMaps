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
    axios.post('/api/quotations', {
    {
        document.getElementById('lastname'),
        document.getElementById('firstname'),
            email: document.getElementById('email'),
            subject: document.getElementById('subject'),
            message: document.getElementById('message'),
            type: document.getElementById('type'),
            contract: document.getElementById('contract'),
            techno: document.getElementById('technos')
    }
    });
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

// Resume
document.getElementById("exitResume").onclick = exitResume;
// ContactForm
document.getElementById("exitContact").onclick = exitContact;
document.getElementById("submitContactForm").onclick = submitContactForm;
// Projects

// exports
export {ShowSection, showProject};
