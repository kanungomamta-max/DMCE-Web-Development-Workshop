// ==================================================
// 1. PAGE LOAD
// ==================================================

document.addEventListener("DOMContentLoaded", function () {

    console.log("Portfolio page loaded successfully.");

});


// ==================================================
// 2. VIEW PROJECT BUTTON
// ==================================================

const projectLink = document.getElementById("projectLink");
const projectDetails = document.getElementById("projectDetails");

if (projectLink && projectDetails) {

    projectLink.addEventListener("click", function (event) {

        // Prevent the link from opening another page
        event.preventDefault();

        // Show / hide project details
        if (projectDetails.style.display === "none") {

            projectDetails.style.display = "block";
            projectLink.textContent = "Hide Project Details";

        } else {

            projectDetails.style.display = "none";
            projectLink.textContent = "View Project";

        }

    });

}
