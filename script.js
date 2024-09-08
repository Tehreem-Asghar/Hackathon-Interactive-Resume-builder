document.addEventListener('DOMContentLoaded', function () {
    var _a;
    // Function to toggle the visibility of the form
    function toggleForm() {
        var formContainer = document.getElementById('resumeFormContainer');
        if (formContainer) {
            formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
        }
    }
    // Add event listener to the "Dynamic Resume Builder" button
    var showFormBtn = document.getElementById('showFormBtn');
    if (showFormBtn) {
        showFormBtn.addEventListener('click', toggleForm);
    }
    // Handle form submission
    (_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
        event.preventDefault();
        var form = event.target;
        var formData = new FormData(form);
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
        // Hide the form after generating the resume
        var formContainer = document.getElementById('resumeFormContainer');
        if (formContainer) {
            formContainer.style.display = 'none';
        }
    });
    // Handle profile picture upload
    var fileUpload = document.getElementById('fileUpload');
    fileUpload.addEventListener('change', function (event) {
        var input = event.target;
        if (input.files && input.files[0]) {
            var file = input.files[0];
            var reader = new FileReader();
            reader.onload = function (e) {
                var _a;
                var img = document.getElementById('profilePic');
                if (img) {
                    img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                }
            };
            reader.readAsDataURL(file);
        }
    });
    // Function to generate and display the resume
    function generateResume(data) {
        document.getElementById('profileName').textContent = data.name;
        document.getElementById('contactAddress').textContent = "Address: ".concat(data.address);
        document.getElementById('contactPhone').textContent = "Phone: ".concat(data.phone);
        document.getElementById('contactEmail').textContent = "Email: ".concat(data.email);
        document.getElementById('summaryText').textContent = data.summary;
        document.getElementById('experienceText').textContent = data.experience;
        // Update skills
        var skillsList = document.getElementById('skills-list');
        skillsList.innerHTML = data.skills.split(',').map(function (skill) { return "<li>".concat(skill.trim(), "</li>"); }).join('');
        // Update projects
        var projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = data.projects.split('\n').map(function (project) {
            var _a = project.split('|'), link = _a[0], description = _a[1];
            if (link && description) {
                return "\n                    <div class=\"project\">\n                        <h3 class=\"project-title\">\n                            <a href=\"".concat(link.trim(), "\" target=\"_blank\">").concat(description.trim(), "</a>\n                        </h3>\n                        <p class=\"project-description\">").concat(description.trim(), "</p>\n                    </div>\n                ");
            }
            else {
                return ''; // Handle invalid input
            }
        }).join('');
        // Update education
        var educationText = document.getElementById('educationText');
        educationText.textContent = data.education;
    }
});
