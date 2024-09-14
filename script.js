document.addEventListener('DOMContentLoaded', function () {
    var _a;
    // Toggle form visibility
    var toggleForm = function () {
        var formContainer = document.getElementById('resumeFormContainer');
        if (formContainer) {
            formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
        }
    };
    // Show form button
    var showFormBtn = document.getElementById('showFormBtn');
    showFormBtn === null || showFormBtn === void 0 ? void 0 : showFormBtn.addEventListener('click', toggleForm);
    // Handle form submission
    var resumeForm = document.getElementById('resumeForm');
    resumeForm === null || resumeForm === void 0 ? void 0 : resumeForm.addEventListener('submit', function (event) {
        event.preventDefault();
        var formData = new FormData(resumeForm);
        var resumeData = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            summary: formData.get('summary'),
            skills: formData.get('skills'),
            experience: formData.get('experience'),
            projects: formData.get('projects'),
            education: formData.get('education')
        };
        generateResume(resumeData);
        toggleForm();
    });
    // Handle profile picture upload
    var fileUpload = document.getElementById('fileUpload');
    fileUpload === null || fileUpload === void 0 ? void 0 : fileUpload.addEventListener('change', function (event) {
        var _a;
        var input = event.target;
        var file = (_a = input.files) === null || _a === void 0 ? void 0 : _a[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var img = document.getElementById('profilePic');
                img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            };
            reader.readAsDataURL(file);
        }
    });
    // Generate and display the resume
    function generateResume(data) {
        var elements = {
            profileName: document.getElementById('profileName'),
            contactAddress: document.getElementById('contactAddress'),
            contactPhone: document.getElementById('contactPhone'),
            contactEmail: document.getElementById('contactEmail'),
            summaryText: document.getElementById('summaryText'),
            experienceText: document.getElementById('experienceText'),
            skillsList: document.getElementById('skills-list'),
            projectsList: document.getElementById('projects-list'),
            educationText: document.getElementById('educationText')
        };
        if (elements.profileName)
            elements.profileName.textContent = data.name;
        if (elements.contactAddress)
            elements.contactAddress.textContent = "Address: ".concat(data.address);
        if (elements.contactPhone)
            elements.contactPhone.textContent = "Phone: ".concat(data.phone);
        if (elements.contactEmail)
            elements.contactEmail.textContent = "Email: ".concat(data.email);
        if (elements.summaryText)
            elements.summaryText.textContent = data.summary;
        if (elements.experienceText)
            elements.experienceText.textContent = data.experience;
        if (elements.skillsList)
            elements.skillsList.innerHTML = data.skills.split(',').map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join('');
        if (elements.projectsList)
            elements.projectsList.innerHTML = data.projects.split('\n').map(function (project) {
                var _a = project.split('|'), link = _a[0], description = _a[1];
                return link && description ? "<div class=\"project\"><h3 class=\"project-title\"><a href=\"".concat(link.trim(), "\" target=\"_blank\">").concat(description.trim(), "</a></h3><p class=\"project-description\">").concat(description.trim(), "</p></div> ") : '';
            }).join('');
        if (elements.educationText)
            elements.educationText.textContent = data.education;
    }
    // Edit and save functionality
    var editBtn = document.getElementById('editBtn');
    var saveBtn = document.getElementById('saveBtn');
    editBtn === null || editBtn === void 0 ? void 0 : editBtn.addEventListener('click', function () {
        document.querySelectorAll('#profileName, #contactEmail, #contactPhone, #contactAddress, #summaryText, #experienceText, #educationText').forEach(function (el) { return el.setAttribute('contenteditable', 'true'); });
        document.querySelectorAll('#skills-list, #projects-list').forEach(function (el) { return el.setAttribute('contenteditable', 'true'); });
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline';
    });
    saveBtn === null || saveBtn === void 0 ? void 0 : saveBtn.addEventListener('click', function () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
        document.querySelectorAll('#profileName, #contactEmail, #contactPhone, #contactAddress, #summaryText, #experienceText, #educationText').forEach(function (el) { return el.setAttribute('contenteditable', 'false'); });
        document.querySelectorAll('#skills-list, #projects-list').forEach(function (el) { return el.setAttribute('contenteditable', 'false'); });
        var updatedResume = {
            name: ((_b = (_a = document.getElementById('profileName')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '',
            email: ((_d = (_c = document.getElementById('contactEmail')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.trim()) || '',
            phone: ((_f = (_e = document.getElementById('contactPhone')) === null || _e === void 0 ? void 0 : _e.textContent) === null || _f === void 0 ? void 0 : _f.trim()) || '',
            address: ((_h = (_g = document.getElementById('contactAddress')) === null || _g === void 0 ? void 0 : _g.textContent) === null || _h === void 0 ? void 0 : _h.trim()) || '',
            summary: ((_k = (_j = document.getElementById('summaryText')) === null || _j === void 0 ? void 0 : _j.textContent) === null || _k === void 0 ? void 0 : _k.trim()) || '',
            skills: Array.from(document.querySelectorAll('#skills-list li')).map(function (li) { return li.textContent; }).join(', '),
            experience: ((_m = (_l = document.getElementById('experienceText')) === null || _l === void 0 ? void 0 : _l.textContent) === null || _m === void 0 ? void 0 : _m.trim()) || '',
            projects: Array.from(document.querySelectorAll('#projects-list .project')).map(function (project) {
                var _a;
                var linkElement = project.querySelector('.project-title a');
                var link = (linkElement === null || linkElement === void 0 ? void 0 : linkElement.href) || '';
                var description = ((_a = project.querySelector('.project-description')) === null || _a === void 0 ? void 0 : _a.textContent) || '';
                return "".concat(link, "|").concat(description);
            }).join('\n'),
            education: ((_p = (_o = document.getElementById('educationText')) === null || _o === void 0 ? void 0 : _o.textContent) === null || _p === void 0 ? void 0 : _p.trim()) || ''
        };
        console.log('Updated Resume:', updatedResume);
        saveBtn.style.display = 'none';
        editBtn.style.display = 'inline';
    });
    // Shareable URL handling
    var shareableLink = document.getElementById('shareable-link');
    var username = (_a = document.getElementById('profileName')) === null || _a === void 0 ? void 0 : _a.textContent;
    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(username !== null && username !== void 0 ? username : ''));
    // Setting the href and text content for the anchor tag
    shareableLink.href = shareableURL;
    // shareableLink.textContent = shareableURL;
    // Function to copy the link to clipboard when button is clicked
    var copyButton = document.getElementById('copy-link');
    copyButton === null || copyButton === void 0 ? void 0 : copyButton.addEventListener('click', function (event) {
        event.preventDefault(); // Button click par default behavior rokna
        // Link ko clipboard me copy karna
        navigator.clipboard.writeText(shareableURL).then(function () {
            alert('Link copied to clipboard: ' + shareableURL);
        }).catch(function (err) {
            console.error('Failed to copy: ', err);
        });
    });
    // Handle PDF download
    var downloadpdf = document.getElementById('download-pdf');
    downloadpdf === null || downloadpdf === void 0 ? void 0 : downloadpdf.addEventListener('click', function () {
        window.print();
    });
});
