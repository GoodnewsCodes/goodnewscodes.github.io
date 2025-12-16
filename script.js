const currentYearElement = document.getElementById("current-year");
if (currentYearElement) {
  currentYearElement.innerHTML = new Date().getFullYear();
}

window.addEventListener("load", function () {
  // console.log("Window loaded"); // Debugging log
  setTimeout(function () {
    const loader = document.querySelector(".loader");
    // console.log("Loader element:", loader); // Debugging log
    if (loader) {
      loader.style.opacity = "0";
      // console.log("Loader opacity set to 0"); // Debugging log
      document.body.classList.remove("loading");
      // console.log("Loading class removed from body"); // Debugging log
      setTimeout(function () {
        loader.remove();
        // console.log("Loader removed from DOM"); // Debugging log
      }, 500);
    } else {
      console.warn("Loader element not found"); // Debugging log
    }
  }, 1000);
});

document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    window.scrollTo({
      top: targetElement.offsetTop - 80,
      behavior: "smooth",
    });

    // Update URL without reloading
    history.pushState(null, null, targetId);
  });
});

const backToTopButton = document.createElement("a");
backToTopButton.href = "#home";
backToTopButton.className = "back-to-top";
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTopButton);

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("visible");
  } else {
    backToTopButton.classList.remove("visible");
  }
});

// Load Projects from XML
document.addEventListener("DOMContentLoaded", function () {
  const projectsGrid = document.querySelector(".projects-grid");
  if (projectsGrid) {
    fetch("projects.xml")
      .then((response) => response.text())
      .then((data) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        const projects = xmlDoc.getElementsByTagName("project");

        for (let i = 0; i < projects.length; i++) {
          const title =
            projects[i].getElementsByTagName("title")[0].textContent;
          const icon = projects[i].getElementsByTagName("icon")[0].textContent;
          const description =
            projects[i].getElementsByTagName("description")[0].textContent;
          const image =
            projects[i].getElementsByTagName("image")[0].textContent;
          const technologies = projects[i].getElementsByTagName("tech");
          const links = projects[i].getElementsByTagName("link");

          const projectDiv = document.createElement("div");
          projectDiv.className = "project";

          let techHtml = "";
          for (let j = 0; j < technologies.length; j++) {
            techHtml += `<span class="tech-tag">${technologies[j].textContent}</span>`;
          }

          let linksHtml = "";
          for (let k = 0; k < links.length; k++) {
            const url = links[k].getAttribute("url");
            const text = links[k].getAttribute("text");
            linksHtml += `
                            <a href="${url}" target="_blank" class="project-link">
                                ${text} <i class="fas fa-arrow-right"></i>
                            </a>
                        `;
          }

          projectDiv.innerHTML = `
                        <div class="project-image" style="background-image: url('${image}');"></div>
                        <div class="project-overlay">
                            <div class="overlay-content">
                                ${linksHtml}
                            </div>
                        </div>
                        <div class="project-content">
                            <h3>${title} <i class="${icon}"></i></h3>
                            <p>${description}</p>
                            <div class="project-tech">
                                ${techHtml}
                            </div>
                            <div class="mobile-buttons">
                                ${linksHtml}
                            </div>
                        </div>
                    `;

          projectsGrid.appendChild(projectDiv);
        }
      })
      .catch((error) => console.error("Error loading projects:", error));
  }
});

document.addEventListener("DOMContentLoaded", function () {
  // Select the chart container using its class name
  const chartContainer = document.querySelector(".github-chart-container");

  if (chartContainer) {
    // Set the horizontal scroll position (scrollLeft) to the total scrollable width (scrollWidth)
    // This scrolls the container all the way to the right, showing recent commits.
    chartContainer.scrollLeft = chartContainer.scrollWidth;
  }
});
