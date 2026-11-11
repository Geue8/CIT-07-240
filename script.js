/**
 * Cedemarl Abelarde | Professional Student Portfolio
 * Interactive Scripts (script.js)
 * Clean, lightweight vanilla JS for UI micro-interactions, filtering & modals
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Highlight current active page in navigation
  highlightActiveNavLink();

  // 2. Initialize Project Filtering if on projects page
  initProjectFilters();

  // 3. Initialize Tour Filtering if on tour page
  initTourFilters();

  // 4. Initialize Contact Form Validation & Handler if on contact page
  initContactForm();

  // 5. Initialize Quick Copy Button for Email
  initCopyEmail();

  // 6. Initialize Project Detail Modal triggers
  initProjectModal();

  // 7. Initialize Tour Detail Modal triggers
  initTourModal();
});

/**
 * Highlights current active link based on window location pathname
 */
function highlightActiveNavLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link-custom');

  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (linkHref === currentPath || (currentPath === '' && linkHref === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/**
 * Handles project filtering by data-category attribute
 */
function initProjectFilters() {
  const filterButtons = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card-item');

  if (!filterButtons.length || !projectCards.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue || category.includes(filterValue)) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 20);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

/**
 * Handles tour filtering by category
 */
function initTourFilters() {
  const filterButtons = document.querySelectorAll('.tour-filter-btn');
  const tourItems = document.querySelectorAll('.tour-timeline-item');

  if (!filterButtons.length || !tourItems.length) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      filterButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filterValue = this.getAttribute('data-filter');

      tourItems.forEach(item => {
        const category = item.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          item.style.display = 'block';
          item.style.opacity = '1';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Handles Contact Form Validation and Submission with Bootstrap Modal confirmation
 */
function initContactForm() {
  const contactForm = document.getElementById('portfolioContactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!contactForm.checkValidity()) {
      e.stopPropagation();
      contactForm.classList.add('was-validated');
      return;
    }

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending message...';

    // Collect values
    const name = document.getElementById('senderName')?.value || 'Visitor';
    const email = document.getElementById('senderEmail')?.value || '';
    const subject = document.getElementById('messageSubject')?.value || 'Portfolio Inquiry';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      // Show success modal
      const modalElement = document.getElementById('contactSuccessModal');
      if (modalElement && window.bootstrap) {
        const modal = new window.bootstrap.Modal(modalElement);
        document.getElementById('modalSenderName').textContent = name;
        document.getElementById('modalSenderEmail').textContent = email;
        modal.show();
      } else {
        alert(`Thank you, ${name}! Your message regarding "${subject}" has been received. I will reply to ${email} promptly.`);
      }

      contactForm.reset();
      contactForm.classList.remove('was-validated');
    }, 900);
  });
}

/**
 * Quick copy to clipboard for user email
 */
function initCopyEmail() {
  const copyButtons = document.querySelectorAll('.btn-copy-email');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const email = this.getAttribute('data-email') || 'abelardeocedemarl07@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        const originalHtml = this.innerHTML;
        this.innerHTML = '<i class="bi bi-check-circle-fill text-success me-1"></i> Copied!';
        this.classList.add('btn-light');
        setTimeout(() => {
          this.innerHTML = originalHtml;
          this.classList.remove('btn-light');
        }, 2200);
      }).catch(err => {
        console.error('Copy failed:', err);
      });
    });
  });
}

/**
 * Dynamic project details modal population
 */
const projectsData = {
  campuspulse: {
    title: 'CampusPulse – Student Organization Management System',
    type: 'Full-Stack Web Application / Capstone',
    role: 'Lead Full-Stack Developer & Database Architect',
    timeline: 'First Semester, Final Year (4 Months)',
    tech: ['HTML5', 'Bootstrap 5', 'JavaScript', 'Node.js', 'Express', 'MySQL'],
    overview: 'A centralized organization management platform designed to streamline student council elections, club announcements, event ticketing, and attendance tracking through QR code verification.',
    features: [
      'Role-based access control for students, faculty advisors, and student council officers.',
      'Event registration portal with automated digital ticket generation and scan-to-check-in.',
      'Transparent budgeting and liquidation reporting module for university student clubs.',
      'Responsive design ensuring frictionless usability on mobile devices during on-campus events.'
    ],
    challenges: 'Designing a fast, normalized relational schema capable of handling concurrent election voting without duplicate votes or lock contention during peak hours.',
    outcomes: 'Piloted across 4 college departments, successfully registering over 850 student attendees across 12 campus seminars.'
  },
  edutracker: {
    title: 'EduTracker – Academic Planner & GPA Forecasting Tool',
    type: 'Student Productivity Web Tool',
    role: 'Frontend UI/UX Developer',
    timeline: 'Third Year Coursework Project',
    tech: ['HTML5', 'Bootstrap 5', 'JavaScript (ES6)', 'Chart.js', 'Local Storage'],
    overview: 'An intuitive study companion built to help undergraduate students schedule course deliverables, track academic milestones, calculate weighted GPAs, and visualize study habits.',
    features: [
      'Interactive semester grade point simulator with goal-based grade targets.',
      'Kanban-style task board with priority labels and due-date countdown alerts.',
      'Data visualization of credit units completed vs degree requirements.',
      'Offline-capable local storage persistence—no server account required for student privacy.'
    ],
    challenges: 'Creating an accurate calculation model that accommodates diverse university grading scales and variable credit weights effortlessly.',
    outcomes: 'Used by over 120 fellow classmates during midterm and finals review periods with 94% positive usability feedback.'
  },
  mediqueue: {
    title: 'MediQueue – Community Clinic Triage & Appointment Portal',
    type: 'Healthcare Service Web System',
    role: 'Full-Stack Developer & UI Designer',
    timeline: 'Collaborative Term Project',
    tech: ['HTML5', 'Bootstrap 5', 'REST API', 'JavaScript', 'PostgreSQL'],
    overview: 'An accessible web portal tailored for barangay health centers and university outpatient clinics to eliminate crowded waiting rooms and streamline patient appointments.',
    features: [
      'Real-time queue number monitor accessible via smartphone browser.',
      'Automated SMS / email confirmation and appointment reminder alerts.',
      'Medical triage classification based on urgency and physician availability.',
      'Confidential patient history logs compliant with basic healthcare data protection practices.'
    ],
    challenges: 'Ensuring high accessibility standards (WCAG AA) with high contrast text and large touch targets for senior citizens and low-bandwidth users.',
    outcomes: 'Awarded "Best Software Architecture" award in the annual College Department Project Showcase.'
  },
  ecobytes: {
    title: 'EcoBytes – E-Waste Recycling & Tech Lifecycle Hub',
    type: 'Environmental Tech Education Platform',
    role: 'Solo Creator & Content Curator',
    timeline: 'Hackathon & Personal Project',
    tech: ['HTML5', 'Bootstrap 5', 'CSS Grid', 'JavaScript', 'Leaflet.js'],
    overview: 'An educational platform promoting safe electronic waste disposal, computer refurbishing guides, and interactive community recycling drop-off maps.',
    features: [
      'Interactive geolocation map showing certified e-waste drop-off bins and collection drives.',
      'Component repurposing guide for old laptops, power supplies, and smartphones.',
      'Carbon offset estimator calculating precious metals diverted from landfills.',
      'Resource library with downloadable guides for schools and small offices.'
    ],
    challenges: 'Integrating dynamic lightweight maps without heavy third-party tracking or performance bottlenecks on slow cellular networks.',
    outcomes: 'Featured in the university green campus initiative newsletter and adopted as a reference guide by the environmental science department.'
  },
  shopsmart: {
    title: 'ShopSmart – Local Artisan Marketplace Prototype',
    type: 'E-Commerce Frontend Showcase',
    role: 'Frontend Developer',
    timeline: 'Web Systems Design Course',
    tech: ['HTML5', 'Bootstrap 5', 'JavaScript', 'CSS3 Transitions'],
    overview: 'A responsive digital storefront prototype created to support local neighborhood craft makers and student entrepreneurs during campus artisan fairs.',
    features: [
      'Dynamic product catalog with multi-category search and price range filters.',
      'Interactive shopping bag drawer with live subtotal calculation and promo code discounts.',
      'Mobile-first responsive checkout workflow with clear delivery address validation.',
      'High-performance image lazy loading and subtle hover micro-interactions.'
    ],
    challenges: 'Crafting clean, accessible component states for shopping cart mutations entirely with vanilla JavaScript while maintaining 60fps animations.',
    outcomes: 'Earned 98/100 in the final Web Development laboratory evaluation.'
  },
  devdocu: {
    title: 'DevDocu – Developer Cheat-Sheet & Code Snippet Vault',
    type: 'Developer Utility & Knowledge Base',
    role: 'Creator & Maintainer',
    timeline: 'Open Source / Ongoing',
    tech: ['HTML5', 'Bootstrap 5', 'JavaScript', 'Prism.js Syntax Highlighter'],
    overview: 'A lightning-fast, distraction-free reference hub for common Git commands, SQL queries, regex patterns, and Bootstrap utility snippets used daily by junior developers.',
    features: [
      'Instant fuzzy search across 100+ vetted code snippets and architectural patterns.',
      'One-click snippet copy with animated feedback.',
      'Dark and light reading modes optimized for extended coding sessions.',
      'Keyboard shortcuts (Press / to search, Esc to close) for developer efficiency.'
    ],
    challenges: 'Designing a modular markdown-to-DOM parser for fast rendering without third-party framework bloat.',
    outcomes: 'Starred by dozens of computer science classmates as their default browser bookmark during coding exams.'
  }
};

function initProjectModal() {
  const modalElem = document.getElementById('projectDetailModal');
  if (!modalElem) return;

  const buttons = document.querySelectorAll('.btn-view-project');
  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      const projectId = this.getAttribute('data-project-id');
      const data = projectsData[projectId];
      if (!data) return;

      document.getElementById('modalProjectTitle').textContent = data.title;
      document.getElementById('modalProjectType').textContent = data.type;
      document.getElementById('modalProjectOverview').textContent = data.overview;
      document.getElementById('modalProjectRole').textContent = data.role;
      document.getElementById('modalProjectTimeline').textContent = data.timeline;
      document.getElementById('modalProjectChallenges').textContent = data.challenges;
      document.getElementById('modalProjectOutcomes').textContent = data.outcomes;

      // Tech tags
      const techContainer = document.getElementById('modalProjectTech');
      techContainer.innerHTML = '';
      data.tech.forEach(t => {
        const badge = document.createElement('span');
        badge.className = 'badge-tag me-1 mb-1';
        badge.textContent = t;
        techContainer.appendChild(badge);
      });

      // Features
      const featuresList = document.getElementById('modalProjectFeatures');
      featuresList.innerHTML = '';
      data.features.forEach(f => {
        const li = document.createElement('li');
        li.className = 'mb-1 text-secondary';
        li.innerHTML = `<i class="bi bi-check2 text-primary me-2"></i>${f}`;
        featuresList.appendChild(li);
      });

      if (window.bootstrap) {
        const modal = new window.bootstrap.Modal(modalElem);
        modal.show();
      }
    });
  });
}

/**
 * Dynamic tour details modal population
 */
const tourData = {
  tour1: {
    title: 'National Technology Hub & Cloud Data Center Immersion',
    location: 'Cyberpark Innovation District, Metro Center',
    date: 'October 18, 2024 • 1-Day Educational Immersion',
    category: 'Industry Tour',
    badgeClass: 'badge-soft',
    narrative: 'Participated in a comprehensive educational tour inside a Tier-3 hyperscale data center facility. The technical delegation explored raised-floor server halls, precision cooling systems, redundant uninterruptible power supply (UPS) banks, and biometric security checkpoints.',
    takeaways: [
      'Gained first-hand understanding of high-availability infrastructure, disaster recovery failover pipelines, and network redundancy topologies.',
      'Observed enterprise fiber-optic routing protocols and cable management standards in operational production server racks.',
      'Engaged with Chief Infrastructure Engineers on zero-trust perimeter network defenses and green data center energy efficiency metrics.'
    ],
    reflection: 'Seeing cloud computing in physical, tangible form transformed my appreciation for server-side architecture. It reinforced the real-world significance of writing efficient code and optimizing database queries to reduce computing overhead.'
  },
  tour2: {
    title: 'Annual Youth in Technology Summit & Rapid Hackathon',
    location: 'Grand Convention Hall & Tech Innovation Center',
    date: 'August 24–25, 2024 • 2-Day Conference & Competition',
    category: 'Conference & Hackathon',
    badgeClass: 'badge-soft',
    narrative: 'Represented the university computer science society in a nationwide technology summit featuring keynote addresses from senior industry leaders, AI researchers, and startup founders. Collaborated with a 4-person student team in an overnight rapid prototyping hackathon.',
    takeaways: [
      'Attended deep-dive tracks on ethical artificial intelligence, full-stack software development best practices, and modern cloud deployment CI/CD pipelines.',
      'Co-developed a functional progressive web prototype for community emergency preparedness within a strict 24-hour sprint window.',
      'Practiced rapid design-to-code execution under time pressure while managing Git merge conflicts in a team setting.'
    ],
    reflection: 'The hackathon tested our endurance, technical adaptability, and communication. It solidified my confidence in frontend development and taught me how to articulate technical decisions concisely to non-technical judges.'
  },
  tour3: {
    title: 'Enterprise Software Solutions Company Office Visit',
    location: 'Global IT Outsourcing & Software Engineering Center',
    date: 'May 12, 2024 • Half-Day Industry Immersion',
    category: 'Industry Tour',
    badgeClass: 'badge-soft',
    narrative: 'Invited alongside selected departmental honors students to visit a global enterprise software development firm. The experience included shadowing a software engineering sprint planning session, touring open collaborative workspaces, and attending a panel with junior developers.',
    takeaways: [
      'Learned the day-to-day cadence of Agile/Scrum engineering teams, including daily stand-ups, backlog grooming, and code reviews.',
      'Discovered the vital role of automated unit testing, test-driven development (TDD), and continuous integration pipelines in enterprise software.',
      'Received constructive career mentorship on preparing technical resumes and handling live coding interviews.'
    ],
    reflection: 'This company tour helped demystify corporate software engineering. I realized that clear communication and willingness to learn are valued just as much as technical syntax knowledge.'
  },
  tour4: {
    title: 'Annual University IT Research Exhibition & Capstone Symposium',
    location: 'University Gymnasium & Engineering Auditorium',
    date: 'March 15, 2024 • Full-Day Academic Showcase',
    category: 'Academic Exhibition',
    badgeClass: 'badge-soft',
    narrative: 'Presented our team capstone project, "CampusPulse: Student Organization Management Portal," before a distinguished panel of industry evaluators, university faculty members, and fellow students.',
    takeaways: [
      'Delivered live software product demonstrations, effectively handling unexpected edge cases and answering rigorous technical questions.',
      'Constructed a scientific poster summarizing system architecture, database entity-relationship diagrams (ERD), and user acceptance testing (UAT) results.',
      'Received the "Distinguished Presentation & UI/UX Design" citation from the departmental evaluating committee.'
    ],
    reflection: 'Presenting technical systems to diverse audiences requires empathy and clarity. This symposium was a defining milestone that affirmed my enthusiasm for frontend engineering and product design.'
  },
  tour5: {
    title: 'Cybersecurity Network Defense & Safe Coding Workshop',
    location: 'College of Computer Studies Advanced Networking Laboratory',
    date: 'November 28, 2023 • 8-Hour Hands-On Laboratory',
    category: 'Hands-on Seminar',
    badgeClass: 'badge-soft',
    narrative: 'Participated in an intensive technical seminar organized in partnership with industry certified ethical hackers and security analysts, focusing on practical web vulnerability exploitation and defensive mitigation.',
    takeaways: [
      'Simulated SQL injection, Cross-Site Scripting (XSS), and Cross-Site Request Forgery (CSRF) exploits in a controlled sandbox environment.',
      'Implemented input sanitization, HTTP-only cookie headers, prepared statements, and password hashing using bcrypt.',
      'Mastered Wireshark packet analysis fundamentals and vulnerability scanning using automated tools.'
    ],
    reflection: 'Security is not an afterthought—it must be architected from the very first line of code. This workshop fundamentally shaped my approach to form validation and backend communication.'
  },
  tour6: {
    title: 'Community Digital Literacy Outreach & Computer Training Drive',
    location: 'Barangay Community Learning Center & Public High School',
    date: 'September 16, 2023 • Community Extension Service',
    category: 'Community Service',
    badgeClass: 'badge-soft',
    narrative: 'Volunteered as a student facilitator for our university extension service, conducting hands-on computer literacy, internet safety, and basic productivity software tutorials for public school students and local community leaders.',
    takeaways: [
      'Taught basic operating system navigation, word processing, spreadsheet formulas, and email communication fundamentals.',
      'Facilitated interactive discussions on recognizing phishing scams, social engineering tactics, and online privacy safeguards.',
      'Refurbished and re-imaged 15 donated desktop workstations for the community learning library.'
    ],
    reflection: 'Technology has the power to uplift communities. Teaching technical concepts to eager younger students was deeply fulfilling and deepened my patience and ability to explain complex topics simply.'
  }
};

function initTourModal() {
  const modalElem = document.getElementById('tourDetailModal');
  if (!modalElem) return;

  const buttons = document.querySelectorAll('.btn-view-tour');
  buttons.forEach(btn => {
    btn.addEventListener('click', function () {
      const tourId = this.getAttribute('data-tour-id');
      const data = tourData[tourId];
      if (!data) return;

      document.getElementById('modalTourTitle').textContent = data.title;
      document.getElementById('modalTourLocation').textContent = data.location;
      document.getElementById('modalTourDate').textContent = data.date;
      document.getElementById('modalTourCategory').textContent = data.category;
      document.getElementById('modalTourNarrative').textContent = data.narrative;
      document.getElementById('modalTourReflection').textContent = data.reflection;

      // Key takeaways
      const takeawaysList = document.getElementById('modalTourTakeaways');
      takeawaysList.innerHTML = '';
      data.takeaways.forEach(item => {
        const li = document.createElement('li');
        li.className = 'mb-2 text-secondary';
        li.innerHTML = `<i class="bi bi-mortarboard-fill text-primary me-2"></i>${item}`;
        takeawaysList.appendChild(li);
      });

      if (window.bootstrap) {
        const modal = new window.bootstrap.Modal(modalElem);
        modal.show();
      }
    });
  });
}
