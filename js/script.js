// ============================================================================
// PORTFOLIO JAVASCRIPT - FINAL CLEAN VERSION
// ============================================================================

document.addEventListener('DOMContentLoaded', init);

function init() {
    setupThemeToggle();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupCollapsibleProjects();
    displayGreeting();
    addInteractiveFeatures();
    triggerTypingEffect();
    setupContactForm();
    loadDynamicContent();
}

// ============================================================================
// THEME TOGGLE - LOCAL STORAGE
// ============================================================================

function setupThemeToggle() {
    const toggle = document.getElementById('themeToggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('portfolioTheme');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        toggle.checked = true;
    }
    
    toggle.addEventListener('change', () => {
        if (toggle.checked) {
            body.classList.add('dark');
            localStorage.setItem('portfolioTheme', 'dark');
        } else {
            body.classList.remove('dark');
            localStorage.setItem('portfolioTheme', 'light');
        }
    });
}

// ============================================================================
// GITHUB API INTEGRATION WITH LOADING & ERROR HANDLING
// ============================================================================

function loadDynamicContent() {
    fetchGitHubStats();
}

async function fetchGitHubStats() {
    const username = 'arway26';
    const container = createGitHubStatsSection();
    
    displayGitHubLoading(container);
    
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error('Failed to fetch');
        
        const data = await response.json();
        displayGitHubStats(container, data, username);
    } catch (error) {
        console.error('Error:', error);
        displayGitHubStatsFallback(container, username);
    }
}

function createGitHubStatsSection() {
    const contactSection = document.getElementById('contact');
    const contactContent = contactSection.querySelector('.contact-content ul');
    let container = document.querySelector('.github-stats-container');
    
    if (!container) {
        container = document.createElement('div');
        container.className = 'github-stats-container';
        
        const isDark = document.body.classList.contains('dark');
        const bgColor = isDark ? '#222' : 'white';
        
        container.style.cssText = `
            margin-top: 2rem; padding: 1.5rem; background: ${bgColor};
            border-radius: var(--radius); box-shadow: var(--shadow);
        `;
        contactContent.parentNode.insertBefore(container, contactContent.nextSibling);
    }
    return container;
}

function displayGitHubLoading(container) {
    container.innerHTML = `
        <div style="text-align: center; padding: 3rem; color: #666;">
            <div class="loading-spinner"></div>
            <p style="margin-top: 1rem; font-weight: 600; color: var(--primary);">Loading GitHub Stats...</p>
        </div>
    `;
}

function displayGitHubStats(container, data, username) {
    container.innerHTML = `
        <div style="text-align: center; margin-bottom: 1rem;">
            <h3 style="color: var(--primary); margin-bottom: 0.5rem;">Connect on GitHub</h3>
            <a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer" 
               style="color: var(--secondary); text-decoration: none; font-weight: 600; font-size: 1.1rem;">
                @${username} 🔗
            </a>
        </div>
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; text-align: center;">
            <div><div style="font-size: 2rem;">🎯</div><div style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">${data.public_repos}</div><div style="color: #666;">Repos</div></div>
            <div><div style="font-size: 2rem;">👥</div><div style="font-size: 1.5rem; font-weight: bold; color: var(--secondary);">${data.followers}</div><div style="color: #666;">Followers</div></div>
            <div><div style="font-size: 2rem;">✨</div><div style="font-size: 1.5rem; font-weight: bold; color: var(--primary);">${data.following}</div><div style="color: #666;">Following</div></div>
        </div>
    `;
    container.style.opacity = '0';
    setTimeout(() => {
        container.style.transition = 'opacity 0.6s ease';
        container.style.opacity = '1';
    }, 100);
}

function displayGitHubStatsFallback(container, username) {
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: #666;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">⚠️</div>
            <h3 style="color: var(--primary); margin-bottom: 1rem;">Unable to Load GitHub Stats</h3>
            <p style="margin-bottom: 1rem;">We couldn't fetch the latest data. This might be due to:</p>
            <ul style="text-align: left; display: inline-block; margin-bottom: 1.5rem;">
                <li>Network connection issues</li>
                <li>GitHub API rate limit</li>
                <li>Temporary server error</li>
            </ul>
            <div>
                <button onclick="window.location.reload()" style="
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    color: white; padding: 0.8rem 1.5rem; border: none;
                    border-radius: var(--radius); font-weight: 600;
                    cursor: pointer; margin-right: 0.5rem; transition: all 0.3s ease;
                ">
                    🔄 Retry
                </button>
                <a href="https://github.com/${username}" target="_blank" rel="noopener noreferrer" style="
                    display: inline-block; padding: 0.8rem 1.5rem;
                    background: #333; color: white; text-decoration: none;
                    border-radius: var(--radius); font-weight: 600; transition: all 0.3s ease;
                ">
                    Visit GitHub Profile →
                </a>
            </div>
        </div>
    `;
}

// ============================================================================
// CONTACT FORM WITH VALIDATION & ERROR HANDLING
// ============================================================================

function setupContactForm() {
    const form = document.querySelector('.contact-form form');
    if (!form) return;
    
    displaySubmissionCount();
    loadSavedFormData(form);
    setupFormAutoSave(form);
    addCharacterCounter(form);
    addAIAssistant(form);
    form.addEventListener('submit', handleFormSubmit);
}

function displaySubmissionCount() {
    const submissions = getFormSubmissions();
    const contactSection = document.getElementById('contact');
    let countDisplay = document.querySelector('.submission-count');
    
    if (countDisplay) countDisplay.remove();
    
    if (submissions.length === 0) {
        countDisplay = document.createElement('div');
        countDisplay.className = 'submission-count empty-state';
        countDisplay.style.cssText = `
            text-align: center; padding: 1.5rem;
            background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
            color: #666; border-radius: var(--radius); margin-bottom: 1rem;
            border: 2px dashed var(--primary);
        `;
        countDisplay.innerHTML = `
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">📭</div>
            <p style="margin: 0; font-weight: 600; color: var(--text);">No messages sent yet</p>
            <p style="margin: 0.5rem 0 0; font-size: 0.9rem;">Be the first to send a message using the form below!</p>
        `;
    } else {
        countDisplay = document.createElement('div');
        countDisplay.className = 'submission-count';
        countDisplay.style.cssText = `
            text-align: center; padding: 1rem;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white; border-radius: var(--radius); margin-bottom: 1rem; font-weight: 600;
        `;
        countDisplay.textContent = `📬 You've sent ${submissions.length} message${submissions.length !== 1 ? 's' : ''}!`;
    }
    
    const contactContent = contactSection.querySelector('.contact-content');
    contactContent.insertBefore(countDisplay, contactContent.firstChild);
}

function addCharacterCounter(form) {
    const messageInput = form.querySelector('#message');
    const formGroup = messageInput.closest('.form-group');
    
    const counter = document.createElement('div');
    counter.className = 'character-counter';
    counter.style.cssText = `
        text-align: right; font-size: 0.85rem;
        color: #666; margin-top: 0.3rem;
    `;
    
    formGroup.appendChild(counter);
    
    const updateCounter = () => {
        const length = messageInput.value.length;
        const min = 10;
        counter.textContent = `${length} characters`;
        
        if (length < min) {
            counter.style.color = '#e74c3c';
            counter.textContent = `${length} / ${min} characters (minimum)`;
        } else {
            counter.style.color = '#2ecc71';
        }
    };
    
    messageInput.addEventListener('input', updateCounter);
    updateCounter();
}

function getFormSubmissions() {
    try {
        const data = localStorage.getItem('contactFormSubmissions');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        return [];
    }
}

function loadSavedFormData(form) {
    try {
        const saved = localStorage.getItem('contactFormDraft');
        if (!saved) return;
        
        const data = JSON.parse(saved);
        if (data.name) form.querySelector('#name').value = data.name;
        if (data.email) form.querySelector('#email').value = data.email;
        if (data.message) form.querySelector('#message').value = data.message;
    } catch (error) {
        console.error('Error loading form data:', error);
    }
}

function setupFormAutoSave(form) {
    const inputs = form.querySelectorAll('#name, #email, #message');
    inputs.forEach(input => {
        input.addEventListener('input', debounce(() => {
            try {
                const formData = {
                    name: form.querySelector('#name').value,
                    email: form.querySelector('#email').value,
                    message: form.querySelector('#message').value
                };
                localStorage.setItem('contactFormDraft', JSON.stringify(formData));
            } catch (error) {
                console.error('Error saving draft:', error);
            }
            
            validateFieldRealtime(input);
        }, 500));
    });
}

function validateFieldRealtime(input) {
    const value = input.value.trim();
    const fieldName = input.id;
    
    const existingIcon = input.parentElement.querySelector('.validation-icon');
    if (existingIcon) existingIcon.remove();
    
    let isValid = false;
    
    if (fieldName === 'name' && value.length >= 2) {
        isValid = true;
    } else if (fieldName === 'email' && isValidEmail(value)) {
        isValid = true;
    } else if (fieldName === 'message' && value.length >= 10) {
        isValid = true;
    }
    
    if (value.length > 0) {
        const icon = document.createElement('span');
        icon.className = 'validation-icon';
        icon.textContent = isValid ? '✓' : '✗';
        icon.style.cssText = `
            position: absolute; right: 1rem; top: 50%;
            transform: translateY(-50%); font-size: 1.2rem;
            font-weight: bold; color: ${isValid ? '#2ecc71' : '#e74c3c'};
            pointer-events: none;
        `;
        
        const formGroup = input.closest('.form-group');
        formGroup.style.position = 'relative';
        formGroup.appendChild(icon);
        
        input.style.borderColor = isValid ? '#2ecc71' : '#ddd';
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const submitBtn = e.target.querySelector('.submit-btn');
    
    clearFormErrors();
    
    let isValid = true;
    
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showFieldError(nameInput, 'Name must be at least 2 characters');
        isValid = false;
    }
    
    if (!emailInput.value.trim() || !isValidEmail(emailInput.value.trim())) {
        showFieldError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        showFieldError(messageInput, 'Message must be at least 10 characters');
        isValid = false;
    }
    
    if (isValid) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '📤 Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.style.cursor = 'not-allowed';
        
        setTimeout(() => {
            try {
                saveFormSubmission(nameInput.value.trim(), emailInput.value.trim(), messageInput.value.trim());
                showSuccessMessage(nameInput.value.trim());
                e.target.reset();
                localStorage.removeItem('contactFormDraft');
                displaySubmissionCount();
            } catch (error) {
                showErrorMessage('Failed to save your message. Please try again.');
            } finally {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.cursor = 'pointer';
            }
        }, 1000);
    }
}

function saveFormSubmission(name, email, message) {
    const submission = { name, email, message, timestamp: new Date().toISOString() };
    const submissions = getFormSubmissions();
    submissions.push(submission);
    localStorage.setItem('contactFormSubmissions', JSON.stringify(submissions.slice(-10)));
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(input, message) {
    const formGroup = input.closest('.form-group');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    input.classList.add('error');
    formGroup.appendChild(errorDiv);
}

function clearFormErrors() {
    document.querySelectorAll('.field-error').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));
}

function showSuccessMessage(name) {
    const contactSection = document.getElementById('contact');
    const successDiv = document.createElement('div');
    
    successDiv.style.cssText = `
        background: linear-gradient(135deg, #2ecc71, #27ae60);
        color: white;
        padding: 2rem;
        border-radius: 10px;
        margin-bottom: 2rem;
        box-shadow: 0 8px 25px rgba(46, 204, 113, 0.4);
        animation: popIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    `;
    
    successDiv.innerHTML = `
        <span style="font-size: 4rem; margin-bottom: 1rem; display: block; animation: bounceIn 0.8s ease;">✓</span>
        <h3 style="margin: 0 0 0.8rem 0; font-size: 1.6rem; font-weight: 700; color: white;">Thank you, ${name}!</h3>
        <p style="margin: 0; font-size: 1.1rem; color: white;">Your message has been saved. I'll get back to you soon!</p>
    `;
    
    contactSection.insertBefore(successDiv, contactSection.firstChild);
    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    setTimeout(() => {
        successDiv.style.opacity = '0';
        successDiv.style.transition = 'opacity 0.3s ease';
        setTimeout(() => successDiv.remove(), 300);
    }, 5000);
}

function showErrorMessage(message) {
    const contactSection = document.getElementById('contact');
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
        background: linear-gradient(135deg, #e74c3c, #c0392b);
        color: white; padding: 1.5rem; border-radius: var(--radius);
        margin-bottom: 1rem; text-align: center;
    `;
    errorDiv.innerHTML = `<p style="margin: 0;">❌ ${message}</p>`;
    contactSection.insertBefore(errorDiv, contactSection.firstChild);
    setTimeout(() => errorDiv.remove(), 4000);
}

// ============================================================================
// AI WRITING ASSISTANT FOR CONTACT FORM
// ============================================================================

function addAIAssistant(form) {
    const messageGroup = form.querySelector('#message').closest('.form-group');
    
    const aiContainer = document.createElement('div');
    aiContainer.className = 'ai-assistant';
    aiContainer.style.cssText = `
        margin-top: 1rem; padding: 1rem;
        background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
        border-radius: var(--radius); border: 2px solid var(--primary);
    `;
    
    aiContainer.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
            <span style="font-size: 1.5rem;">✨</span>
            <strong style="color: var(--primary);">AI Writing Assistant</strong>
        </div>
        <div style="margin-bottom: 1rem;">
            <label style="display: block; margin-bottom: 0.5rem; font-size: 0.9rem; font-weight: 600;">What would you like help with?</label>
            <select id="aiPurpose" style="
                width: 100%; padding: 0.6rem; border: 2px solid var(--primary);
                border-radius: var(--radius); font-size: 0.9rem;
                background: white; cursor: pointer;
            ">
                <option value="">-- Select a purpose --</option>
                <option value="job">Job Inquiry / Opportunity</option>
                <option value="collaboration">Project Collaboration</option>
                <option value="question">General Question</option>
                <option value="feedback">Feedback / Suggestion</option>
            </select>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <button type="button" id="generateMessage" style="
                background: linear-gradient(135deg, var(--primary), var(--secondary));
                color: white; padding: 0.6rem 1.2rem; border: none;
                border-radius: var(--radius); font-weight: 600;
                cursor: pointer; transition: all 0.3s ease; font-size: 0.9rem;
            ">
                🤖 Generate Message
            </button>
            <button type="button" id="improveMessage" style="
                background: white; color: var(--primary);
                padding: 0.6rem 1.2rem; border: 2px solid var(--primary);
                border-radius: var(--radius); font-weight: 600;
                cursor: pointer; transition: all 0.3s ease; font-size: 0.9rem;
            ">
                ✍️ Improve My Message
            </button>
        </div>
    `;
    
    messageGroup.appendChild(aiContainer);
    
    document.getElementById('generateMessage').addEventListener('click', generateAIMessage);
    document.getElementById('improveMessage').addEventListener('click', improveAIMessage);
}

function generateAIMessage() {
    const purpose = document.getElementById('aiPurpose').value;
    const messageField = document.getElementById('message');
    const nameField = document.getElementById('name');
    const name = nameField.value.trim() || 'there';
    
    if (!purpose) {
        showAIFeedback('Please select a purpose first!', 'warning');
        return;
    }
    
    const btn = document.getElementById('generateMessage');
    const originalText = btn.textContent;
    btn.textContent = '⏳ Generating...';
    btn.disabled = true;
    
    setTimeout(() => {
        const message = getAITemplate(purpose, name);
        messageField.value = message;
        messageField.style.borderColor = '#2ecc71';
        
        messageField.dispatchEvent(new Event('input'));
        
        btn.textContent = originalText;
        btn.disabled = false;
        
        showAIFeedback('Message generated! Feel free to customize it.', 'success');
    }, 1500);
}

function improveAIMessage() {
    const messageField = document.getElementById('message');
    const currentMessage = messageField.value.trim();
    
    if (!currentMessage || currentMessage.length < 10) {
        showAIFeedback('Please write a message first, then I can improve it!', 'warning');
        return;
    }
    
    const btn = document.getElementById('improveMessage');
    const originalText = btn.textContent;
    btn.textContent = '⏳ Improving...';
    btn.disabled = true;
    
    setTimeout(() => {
        const improved = improveMessageText(currentMessage);
        messageField.value = improved;
        messageField.style.borderColor = '#2ecc71';
        
        messageField.dispatchEvent(new Event('input'));
        
        btn.textContent = originalText;
        btn.disabled = false;
        
        showAIFeedback('Message improved! More professional and clear.', 'success');
    }, 1500);
}

function getAITemplate(purpose, name) {
    const templates = {
        job: `Hello Arwa,

I hope this message finds you well. I came across your portfolio and was impressed by your skills in computer science and web development.

I'm reaching out to discuss potential opportunities where your expertise could be valuable. I believe your experience with ${['Python', 'Java', 'web technologies'][Math.floor(Math.random() * 3)]} would be a great fit.

Would you be available for a brief conversation to explore this further?

Best regards,
${name}`,
        
        collaboration: `Hi Arwa,

I've been exploring your portfolio and I'm really impressed by your projects, particularly your ${['software engineering', 'data science', 'web development'][Math.floor(Math.random() * 3)]} work.

I'm working on an exciting project and I think your skills could add tremendous value. Would you be interested in collaborating?

I'd love to discuss the details and see if this aligns with your interests.

Looking forward to hearing from you!
${name}`,
        
        question: `Hello Arwa,

I came across your portfolio and I'm curious about your experience in ${['AI and machine learning', 'web development', 'software engineering'][Math.floor(Math.random() * 3)]}.

I have a few questions about your approach and methodology, and I'd appreciate your insights.

Would you have time for a quick chat?

Thanks in advance,
${name}`,
        
        feedback: `Hi Arwa,

I recently visited your portfolio and wanted to share some thoughts. Your work showcases impressive technical skills and creativity.

I particularly appreciated ${['your project presentations', 'your clean design approach', 'your diverse skill set'][Math.floor(Math.random() * 3)]}.

I thought you might find this feedback helpful as you continue developing your portfolio.

Best wishes,
${name}`
    };
    
    return templates[purpose] || templates.question;
}

function improveMessageText(message) {
    let improved = message.trim();
    
    improved = improved.charAt(0).toUpperCase() + improved.slice(1);
    
    if (!improved.match(/[.!?]$/)) {
        improved += '.';
    }
    
    const replacements = {
        'hey': 'Hello',
        'hi': 'Hello',
        'wanna': 'would like to',
        'gonna': 'going to',
        'ur': 'your',
        'u': 'you',
        'plz': 'please',
        'thx': 'thank you',
        'thanks': 'thank you'
    };
    
    Object.keys(replacements).forEach(casual => {
        const regex = new RegExp(`\\b${casual}\\b`, 'gi');
        improved = improved.replace(regex, replacements[casual]);
    });
    
    if (!improved.match(/^(Hello|Hi|Dear|Greetings)/i)) {
        improved = 'Hello,\n\n' + improved;
    }
    
    if (!improved.match(/(regards|sincerely|thanks|cheers)/i)) {
        improved += '\n\nBest regards';
    }
    
    return improved;
}

function showAIFeedback(message, type) {
    const existingFeedback = document.querySelector('.ai-feedback');
    if (existingFeedback) existingFeedback.remove();
    
    const feedback = document.createElement('div');
    feedback.className = 'ai-feedback';
    
    const colors = {
        success: '#2ecc71',
        warning: '#f39c12',
        error: '#e74c3c'
    };
    
    const icons = {
        success: '✓',
        warning: '⚠️',
        error: '✗'
    };
    
    feedback.style.cssText = `
        margin-top: 0.5rem; padding: 0.8rem;
        background: ${colors[type]}; color: white;
        border-radius: var(--radius); font-size: 0.9rem;
        font-weight: 600; animation: slideInDown 0.3s ease;
    `;
    
    feedback.textContent = `${icons[type]} ${message}`;
    
    const aiContainer = document.querySelector('.ai-assistant');
    aiContainer.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateY(-10px)';
        setTimeout(() => feedback.remove(), 300);
    }, 4000);
}

// ============================================================================
// UI FEATURES
// ============================================================================

function setupSmoothScrolling() {
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('header').offsetHeight;
                window.scrollTo({ top: target.offsetTop - headerHeight - 20, behavior: 'smooth' });
                updateActiveNavLink(this);
            }
        });
    });
    window.addEventListener('scroll', debounce(updateActiveNavOnScroll, 10));
}

function updateActiveNavLink(activeLink) {
    document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
    activeLink.classList.add('active');
}

function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const headerHeight = document.querySelector('header').offsetHeight;
    const scrollPos = window.scrollY + headerHeight + 100;
    
    sections.forEach(section => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        const navLink = document.querySelector(`nav a[href="#${section.id}"]`);
        
        if (scrollPos >= top && scrollPos < bottom && navLink) {
            document.querySelectorAll('nav a').forEach(link => link.classList.remove('active'));
            navLink.classList.add('active');
        }
    });
}

function setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                if (entry.target.id === 'about') triggerTypingEffect();
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('section').forEach(section => observer.observe(section));
}

function setupCollapsibleProjects() {
    document.querySelectorAll('.project-card.collapsible').forEach(card => {
        card.classList.add('collapsed');
        
        card.addEventListener('click', function(e) {
            if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') return;
            this.classList.toggle('collapsed');
        });
    });
}

function displayGreeting() {
    const greeting = document.getElementById('greeting');
    if (greeting) {
        const hour = new Date().getHours();
        const message = hour < 12 ? "Good morning ☀️" : hour < 18 ? "Good afternoon 🌤️" : "Good evening 🌙";
        greeting.textContent = message + " I'm glad you're here!";
    }
}

function addInteractiveFeatures() {
    document.querySelectorAll('.project-card, .hobby-card, .achievement-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('collapsed')) {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.15)';
            }
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
    
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        headerTitle.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
}

function triggerTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (tagline && !tagline.classList.contains('typed')) {
        tagline.classList.add('typed');
        const text = tagline.textContent;
        tagline.textContent = '';
        let i = 0;
        const type = () => {
            if (i < text.length) {
                tagline.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        };
        setTimeout(type, 500);
    }
}

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}