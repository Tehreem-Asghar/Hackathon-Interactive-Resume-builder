document.addEventListener('DOMContentLoaded', () => {
    // Toggle form visibility
    const toggleForm = () => {
        const formContainer = document.getElementById('resumeFormContainer') as HTMLDivElement;
        if (formContainer) {
            formContainer.style.display = formContainer.style.display === 'none' ? 'block' : 'none';
        }
    };

    // Show form button
    const showFormBtn = document.getElementById('showFormBtn') as HTMLButtonElement;
    showFormBtn?.addEventListener('click', toggleForm);

    // Handle form submission
    const resumeForm = document.getElementById('resumeForm') as HTMLFormElement;
    resumeForm?.addEventListener('submit', (event: Event) => {
        event.preventDefault();
        const formData = new FormData(resumeForm);
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
        toggleForm();
    });

    // Handle profile picture upload
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload?.addEventListener('change', (event: Event) => {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e: ProgressEvent<FileReader>) => {
                const img = document.getElementById('profilePic') as HTMLImageElement;
                img.src = e.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    });

    // Generate and display the resume
    function generateResume(data: ResumeData): void {
        const elements = {
            profileName: document.getElementById('profileName') as HTMLHeadingElement,
            contactAddress: document.getElementById('contactAddress') as HTMLHeadingElement,
            contactPhone: document.getElementById('contactPhone') as HTMLHeadingElement,
            contactEmail: document.getElementById('contactEmail') as HTMLHeadingElement,
            summaryText: document.getElementById('summaryText') as HTMLParagraphElement,
            experienceText: document.getElementById('experienceText') as HTMLParagraphElement,
            skillsList: document.getElementById('skills-list') as HTMLUListElement,
            projectsList: document.getElementById('projects-list') as HTMLDivElement,
            educationText: document.getElementById('educationText') as HTMLParagraphElement
        };

        if (elements.profileName) elements.profileName.textContent = data.name;
        if (elements.contactAddress) elements.contactAddress.textContent = `Address: ${data.address}`;
        if (elements.contactPhone) elements.contactPhone.textContent = `Phone: ${data.phone}`;
        if (elements.contactEmail) elements.contactEmail.textContent = `Email: ${data.email}`;
        if (elements.summaryText) elements.summaryText.textContent = data.summary;
        if (elements.experienceText) elements.experienceText.textContent = data.experience;
        if (elements.skillsList) elements.skillsList.innerHTML = data.skills.split(',').map(skill => `<li>${skill.trim()}</li>`).join('');
        if (elements.projectsList) elements.projectsList.innerHTML = data.projects.split('\n').map(project => {
            const [link, description] = project.split('|');
            return link && description ? `<div class="project"><h3 class="project-title"><a href="${link.trim()}" target="_blank">${description.trim()}</a></h3><p class="project-description">${description.trim()}</p></div>` : '';
        }).join('');
        if (elements.educationText) elements.educationText.textContent = data.education;
    }

    // Edit and save functionality
    const editBtn = document.getElementById('editBtn') as HTMLButtonElement;
    const saveBtn = document.getElementById('saveBtn') as HTMLButtonElement;

    editBtn?.addEventListener('click', () => {
        document.querySelectorAll('#profileName, #contactEmail, #contactPhone, #contactAddress, #summaryText, #experienceText, #educationText').forEach(el => (el as HTMLElement).setAttribute('contenteditable', 'true'));
        document.querySelectorAll('#skills-list, #projects-list').forEach(el => (el as HTMLElement).setAttribute('contenteditable', 'true'));
        editBtn.style.display = 'none';
        saveBtn.style.display = 'inline';
    });

    saveBtn?.addEventListener('click', () => {
        document.querySelectorAll('#profileName, #contactEmail, #contactPhone, #contactAddress, #summaryText, #experienceText, #educationText').forEach(el => (el as HTMLElement).setAttribute('contenteditable', 'false'));
        document.querySelectorAll('#skills-list, #projects-list').forEach(el => (el as HTMLElement).setAttribute('contenteditable', 'false'));

        const updatedResume: ResumeData = {
            name: (document.getElementById('profileName') as HTMLHeadingElement)?.textContent?.trim() || '',
            email: (document.getElementById('contactEmail') as HTMLHeadingElement)?.textContent?.trim() || '',
            phone: (document.getElementById('contactPhone') as HTMLHeadingElement)?.textContent?.trim() || '',
            address: (document.getElementById('contactAddress') as HTMLHeadingElement)?.textContent?.trim() || '',
            summary: (document.getElementById('summaryText') as HTMLParagraphElement)?.textContent?.trim() || '',
            skills: Array.from(document.querySelectorAll('#skills-list li')).map(li => li.textContent).join(', '),
            experience: (document.getElementById('experienceText') as HTMLParagraphElement)?.textContent?.trim() || '',
            projects: Array.from(document.querySelectorAll('#projects-list .project')).map(project => {
                const linkElement = project.querySelector('.project-title a') as HTMLAnchorElement;
                const link = linkElement?.href || '';
                const description = project.querySelector('.project-description')?.textContent || '';
                return `${link}|${description}`;
            }).join('\n'),
            education: (document.getElementById('educationText') as HTMLParagraphElement)?.textContent?.trim() || ''
        };

        console.log('Updated Resume:', updatedResume);
        saveBtn.style.display = 'none';
        editBtn.style.display = 'inline';
    });
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
