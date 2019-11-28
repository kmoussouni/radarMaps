import axios from 'axios';

export var currentSection = 'home';

export default function ShowSection(UIId) {
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
    axios.post('/api/quotation', {}

    );
};

// Resume
document.getElementById("exitResume").onclick = exitResume;
// ContactForm
document.getElementById("exitContact").onclick = exitContact;
document.getElementById("submitContactForm").onclick = submitContactForm;
// Projects