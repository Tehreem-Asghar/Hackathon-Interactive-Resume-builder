document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle the visibility of the form
    function toggleForm(): void {
        const formContainer = document.getElementById('resumeFormContainer') as HTMLDivElement;
        if (formContainer) {
            formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
        }
    }

    // Add event listener to the "Dynamic Resume Builder" button
    const showFormBtn = document.getElementById('showFormBtn') as HTMLButtonElement;
    if (showFormBtn) {
        showFormBtn.addEventListener('click', toggleForm);
    }

    // Handle form submission
    document.getElementById('resumeForm')?.addEventListener('submit', function (event: Event) {
        event.preventDefault();

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const resumeData: ResumeData = {
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            address: formData.get('address') as string,
            summary: formData.get('summary') as string,
            skills: formData.get('skills') as string,
            experience: formData.get('experience') as string,
            projects: formData.get('projects') as string,
            education: formData.get('education') as string
        };

        generateResume(resumeData);
        
        // Hide the form after generating the resume
        const formContainer = document.getElementById('resumeFormContainer') as HTMLDivElement;
        if (formContainer) {
            formContainer.style.display = 'none';
        }
    });

    // Handle profile picture upload
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.addEventListener('change', function (event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files[0]) {
            const file = input.files[0];
            const reader = new FileReader();
            reader.onload = function (e: ProgressEvent<FileReader>) {
                const img = document.getElementById('profilePic') as HTMLImageElement;
                if (img) {
                    img.src = e.target?.result as string;
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Function to generate and display the resume
    function generateResume(data: ResumeData): void {
        document.getElementById('profileName')!.textContent = data.name;
        document.getElementById('contactAddress')!.textContent = `Address: ${data.address}`;
        document.getElementById('contactPhone')!.textContent = `Phone: ${data.phone}`;
        document.getElementById('contactEmail')!.textContent = `Email: ${data.email}`;
        document.getElementById('summaryText')!.textContent = data.summary;
        document.getElementById('experienceText')!.textContent = data.experience;

        // Update skills
        const skillsList = document.getElementById('skills-list') as HTMLUListElement;
        skillsList.innerHTML = data.skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');

        // Update projects
        const projectsList = document.getElementById('projects-list') as HTMLDivElement;
        projectsList.innerHTML = data.projects.split('\n').map(project => {
            const [link, description] = project.split('|');
            if (link && description) {
                return `
                    <div class="project">
                        <h3 class="project-title">
                            <a href="${link.trim()}" target="_blank">${description.trim()}</a>
                        </h3>
                        <p class="project-description">${description.trim()}</p>
                    </div>
                `;
            } else {
                return ''; // Handle invalid input
            }
        }).join('');

        // Update education
        const educationText = document.getElementById('educationText') as HTMLParagraphElement;
        educationText.textContent = data.education;
    }
});

// Define an interface for the resume data
interface ResumeData {
    name: string;
    email: string;
    phone: string;
    address: string;
    summary: string;
    skills: string;
    experience: string;
    projects: string;
    education: string;
}
