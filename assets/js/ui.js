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
    axios.post('/api/quotation', {
        lastname: document.getElementById('contactForm[Lastname]'),
        firstname: document.getElementById('contactForm[firstname]'),
        email: document.getElementById('contactForm[email]'),
        subject: document.getElementById('contactForm[subject]'),
        message: document.getElementById('contactForm[message]'),
        type: document.getElementById('contactForm[type]'),
        contract: document.getElementById('contactForm[contract]'),
        techno: document.getElementById('contactForm[technos]')
    }

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

// Resume
document.getElementById("exitResume").onclick = exitResume;
// ContactForm
document.getElementById("exitContact").onclick = exitContact;
document.getElementById("submitContactForm").onclick = submitContactForm;
// Projects

// exports
export {ShowSection, showProject};
