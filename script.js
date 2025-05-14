document.getElementById("startBtn").addEventListener("click", () => {
  document.querySelector(".landing").style.display = "none";
  document.getElementById("resumeForm").style.display = "block";
});

function addExperience() {
  const div = document.createElement("div");
  div.className = "exp-entry";
  div.innerHTML = `
    <input type="text" placeholder="Job Title" class="jobTitle" />
    <input type="text" placeholder="Company Name (optional)" class="company" />
    <input type="text" placeholder="Duration (e.g. Jan 2021 - Dec 2022)" class="duration" />
    <textarea placeholder="Job Responsibilities" class="jobDetails" rows="3"></textarea>
  `;
  document.getElementById("experienceSection").appendChild(div);
}

function addEducation() {
  const div = document.createElement("div");
  div.className = "edu-entry";
  div.innerHTML = `
    <input type="text" placeholder="Degree" class="degree" required />
    <input type="text" placeholder="Institution" class="institution" required />
    <input type="text" placeholder="Duration" class="eduDuration" />
    <input type="text" placeholder="Grade (optional)" class="eduGrade" />
  `;
  document.getElementById("educationSection").appendChild(div);
}

function addProject() {
  const div = document.createElement("div");
  div.className = "project-entry";
  div.innerHTML = `
    <input type="text" placeholder="Project Title" class="projectTitle" />
    <textarea placeholder="Project Description" class="projectDesc" rows="3"></textarea>
    <input type="text" placeholder="Project Link (optional)" class="projectLink" />
  `;
  document.getElementById("projectSection").appendChild(div);
}

document.getElementById("resumeForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const getValue = id => document.getElementById(id).value;
  const fullName = getValue("fullName");
  const title = getValue("title");
  const profile = getValue("profile");
  const email = getValue("email");
  const phone = getValue("phone");
  const address = getValue("address");
  const guardian = getValue("guardian");
  const skills = getValue("skills");
  const languages = getValue("languages");
  const hobbies = getValue("hobbies");

  const imageInput = document.getElementById("profileImage");
  let imageSrc = "";

  const expEntries = document.querySelectorAll(".exp-entry");
  let expHTML = "";
  expEntries.forEach(entry => {
    const jobTitle = entry.querySelector(".jobTitle").value;
    const company = entry.querySelector(".company").value;
    const duration = entry.querySelector(".duration").value;
    const jobDetails = entry.querySelector(".jobDetails").value;
    if (jobTitle) {
      expHTML += `<h4>${jobTitle} <span style="float:right;">${duration}</span></h4><p>${company}</p><p>${jobDetails}</p>`;
    }
  });

  const eduEntries = document.querySelectorAll(".edu-entry");
  let eduHTML = "";
  eduEntries.forEach(entry => {
    const degree = entry.querySelector(".degree").value;
    const institution = entry.querySelector(".institution").value;
    const eduDuration = entry.querySelector(".eduDuration").value;
    const grade = entry.querySelector(".eduGrade").value;
    eduHTML += `<h4>${degree} <span style="float:right;">${eduDuration}</span></h4><p>${institution}</p><p>${grade}</p>`;
  });

  const projectEntries = document.querySelectorAll(".project-entry");
  let projectHTML = "";
  projectEntries.forEach(entry => {
    const title = entry.querySelector(".projectTitle").value;
    const desc = entry.querySelector(".projectDesc").value;
    const link = entry.querySelector(".projectLink").value;
    if (title) {
      projectHTML += `<h4>${title}</h4><p>${desc}</p>${link ? `<p><a href="${link}" target="_blank">${link}</a></p>` : ''}`;
    }
  });

  if (imageInput.files && imageInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function(event) {
      imageSrc = event.target.result;
      renderResume(imageSrc);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    renderResume('');
  }

  function renderResume(imgSrc) {
    const resumeHTML = `
      <div id="resumeContainer" style="display:flex; border:1px solid #ccc;">
        <div style="width:35%; background:#2e3a59; color:white; padding:20px; text-align:center;">
          ${imgSrc ? `<img src="${imgSrc}" class="profile-img" alt="Profile" />` : ''}
          <h2>${fullName}</h2>
          <h4>${title}</h4>
          <p>${email}</p>
          <p>${phone}</p>
          <p>${address}</p>
          <p>Guardian: ${guardian}</p>
          <h4>Skills</h4><p>${skills.replace(/,/g, "<br>")}</p>
          <h4>Languages</h4><p>${languages.replace(/,/g, "<br>")}</p>
          <h4>Hobbies</h4><p>${hobbies.replace(/,/g, "<br>")}</p>
        </div>
        <div style="width:65%; padding:20px;">
          <h3>Profile</h3><p>${profile}</p>
          <h3>Experience</h3>${expHTML}
          <h3>Education</h3>${eduHTML}
          <h3>Projects</h3>${projectHTML}
        </div>
      </div>`;
    const output = document.getElementById("resumeOutput");
    output.innerHTML = resumeHTML;
    output.style.display = "block";
  }
});

document.getElementById("downloadBtn").addEventListener("click", function () {
  const resume = document.getElementById("resumeOutput");
  if (resume.style.display === "block") {
    html2pdf().from(resume).save("resume.pdf");
  } else {
    alert("Please generate your resume first.");
  }
});
