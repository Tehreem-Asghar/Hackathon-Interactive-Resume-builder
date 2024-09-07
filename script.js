document.addEventListener('DOMContentLoaded', function () {
    // Function to toggle the visibility of additional skills
    function toggleSkills() {
        var skillsList = document.getElementById('skills-list');
        if (skillsList) {
            // Skills to be toggled
            var additionalSkills = ["React", "Next.js", "TailwindCSS", "Shadcn"];
            // Check if any additional skills are currently visible
            var isVisible = additionalSkills.some(function (skill) {
                return Array.from(skillsList.getElementsByTagName('li')).some(function (li) { return li.textContent === skill; });
            });
            if (isVisible) {
                // Remove additional skills if they are currently visible
                additionalSkills.forEach(function (skill) {
                    Array.from(skillsList.getElementsByTagName('li')).forEach(function (li) {
                        if (li.textContent === skill) {
                            skillsList.removeChild(li);
                        }
                    });
                });
            }
            else {
                // Add additional skills if they are currently hidden
                additionalSkills.forEach(function (skill) {
                    var li = document.createElement('li');
                    li.textContent = skill;
                    skillsList.appendChild(li);
                });
            }
        }
    }
    // Attach click event listener to the button
    var button = document.querySelector('.button');
    if (button) {
        button.addEventListener('click', toggleSkills);
    }
});
