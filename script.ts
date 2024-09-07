document.addEventListener('DOMContentLoaded', () => {
    // Function to toggle the visibility of additional skills
    function toggleSkills() {
        const skillsList = document.getElementById('skills-list');
        if (skillsList) {
            // Skills to be toggled
            const additionalSkills = ["React", "Next.js", "TailwindCSS", "Shadcn"];
            
            // Check if any additional skills are currently visible
            const isVisible = additionalSkills.some(skill => 
                Array.from(skillsList.getElementsByTagName('li')).some(li => li.textContent === skill)
            );

            if (isVisible) {
                // Remove additional skills if they are currently visible
                additionalSkills.forEach(skill => {
                    Array.from(skillsList.getElementsByTagName('li')).forEach(li => {
                        if (li.textContent === skill) {
                            skillsList.removeChild(li);
                        }
                    });
                });
            } else {
                // Add additional skills if they are currently hidden
                additionalSkills.forEach(skill => {
                    const li = document.createElement('li');
                    li.textContent = skill;
                    skillsList.appendChild(li);
                });
            }
        }
    }

    // Attach click event listener to the button
    const button = document.querySelector('.button');
    if (button) {
        button.addEventListener('click', toggleSkills);
    }
});
