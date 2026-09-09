/**
 * SAPIRA PORTFOLIO — CLIENT-SIDE JAVASCRIPT
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Navigation Handler
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('open');
      if (isOpen) {
        mobileNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      } else {
        mobileNav.classList.add('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
      }
    });

    // Close mobile nav when clicking a link
    const mobileLinks = mobileNav.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 2. Contact Form AJAX Submission
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Reset status UI
      formStatus.className = 'form-status';
      formStatus.style.display = 'none';
      formStatus.textContent = '';

      const nameInput = document.getElementById('form-name');
      const emailInput = document.getElementById('form-email');
      const subjectInput = document.getElementById('form-subject');
      const messageInput = document.getElementById('form-message');

      const name = nameInput.value.trim();
      const email = emailInput.value.trim();
      const subject = subjectInput.value.trim();
      const message = messageInput.value.trim();

      // Client-side quick validation
      if (!name || !email || !subject || !message) {
        showStatus('Please complete all form fields before submitting.', 'error');
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showStatus('Please enter a valid email address.', 'error');
        return;
      }

      // Set Loading state
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending Message...';

      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ name, email, subject, message })
        });

        const data = await response.json();

        if (response.ok && data.success) {
          showStatus(data.message || 'Thank you! Your message has been sent.', 'success');
          contactForm.reset();
        } else {
          showStatus(data.error || 'Failed to send message. Please try again.', 'error');
        }
      } catch (err) {
        console.error('Contact Form Error:', err);
        showStatus('Network error occurred. Please try again later or contact directly via WhatsApp.', 'error');
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    });
  }

  function showStatus(msg, type) {
    if (!formStatus) return;
    formStatus.textContent = msg;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
  }

  // 4. Interactive Project Detail Modal
  const modal = document.getElementById('project-modal');
  const modalBackdrop = document.getElementById('project-modal-backdrop');
  const modalClose = document.getElementById('project-modal-close');
  const openModalBtns = document.querySelectorAll('.btn-open-modal');

  if (modal && openModalBtns.length > 0) {
    openModalBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.getAttribute('data-project-index'), 10);
        const projects = window.PORTFOLIO_PROJECTS || [];
        const project = projects[index];

        if (project) {
          openProjectModal(project);
        }
      });
    });

    if (modalClose) {
      modalClose.addEventListener('click', closeModal);
    }
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });
  }

  function openProjectModal(project) {
    document.getElementById('modal-project-number').textContent = project.number || '01';
    document.getElementById('modal-project-type').textContent = project.type || project.category || 'PROJECT';
    document.getElementById('modal-project-category').textContent = project.category || '';
    document.getElementById('modal-project-date').textContent = project.date || '';
    document.getElementById('modal-project-title').textContent = project.title || '';
    document.getElementById('modal-project-subtitle').textContent = project.subtitle || '';
    document.getElementById('modal-project-summary').textContent = project.summary || '';

    // Image
    const imgEl = document.getElementById('modal-project-img');
    imgEl.src = project.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop';
    imgEl.alt = project.title || 'Project Preview';

    // Problem & Solution
    const psContainer = document.getElementById('modal-problem-solution-container');
    psContainer.innerHTML = '';
    if (project.problem || project.solution) {
      let psHtml = '<div class="stacked-problem-solution-grid">';
      if (project.problem) {
        psHtml += `<div class="stacked-info-box problem-box"><div class="box-label">// PROBLEM</div><div class="box-text">${project.problem}</div></div>`;
      }
      if (project.solution) {
        psHtml += `<div class="stacked-info-box solution-box"><div class="box-label">// SOLUTION</div><div class="box-text">${project.solution}</div></div>`;
      }
      psHtml += '</div>';
      psContainer.innerHTML = psHtml;
    }

    // Key Features
    const featuresEl = document.getElementById('modal-project-features');
    featuresEl.innerHTML = '';
    if (project.features && project.features.length > 0) {
      project.features.forEach(feat => {
        const item = document.createElement('div');
        item.className = 'stacked-feature-item';
        item.innerHTML = `<span class="feature-bullet">&bull;</span><span>${feat}</span>`;
        featuresEl.appendChild(item);
      });
    }

    // Tools
    const toolsEl = document.getElementById('modal-project-tools');
    toolsEl.innerHTML = '';
    if (project.tools && project.tools.length > 0) {
      project.tools.forEach(tool => {
        const chip = document.createElement('span');
        chip.className = 'tool-chip';
        chip.textContent = tool;
        toolsEl.appendChild(chip);
      });
    }

    // Action Links
    const githubBtn = document.getElementById('modal-github-btn');
    const liveBtn = document.getElementById('modal-live-btn');

    if (githubBtn) {
      githubBtn.href = project.githubUrl || 'https://github.com/sapira8130-sketch';
    }
    if (liveBtn) {
      liveBtn.href = project.liveUrl && project.liveUrl !== '#' ? project.liveUrl : (project.githubUrl || 'https://github.com/sapira8130-sketch');
    }

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modal) return;
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
});

