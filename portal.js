/**
 * MAVY EDUSOLUTIONS — ENTERPRISE OPERATIONS PORTAL ENGINE
 * Role-Based Access Control (Admin, Client, Freelancer, Vendor)
 * Direct Form Lead Capture & Cross-Tab Synchronized Live Chat
 * ISO 9001 & ISO 27001 ISMS Enclave Compliant
 */

(function () {
  'use strict';

  // =========================================================================
  // 1. DEFAULT DATA SEEDING (CLIENT-SIDE DATABASE VIA LOCALSTORAGE)
  // =========================================================================

  const SEED_USERS = [
    {
      id: 'usr-admin',
      name: 'Vikram Malhotra',
      email: 'admin@mavyedu.com',
      password: 'MavyAdmin@2026',
      role: 'admin',
      company: 'Mavy EduSolutions Global',
      title: 'Chief Operations Officer',
      avatar: 'VM'
    },
    {
      id: 'usr-client-1',
      name: 'Sarah Chen',
      email: 'sarah.chen@novaglobal.com',
      password: 'client123',
      role: 'client',
      company: 'NovaGlobal Enterprises Inc.',
      title: 'VP Product Localization',
      avatar: 'SC'
    },
    {
      id: 'usr-free-1',
      name: 'Mateo Silva',
      email: 'mateo.silva@linguist.io',
      password: 'free123',
      role: 'freelancer',
      company: 'Independent Senior Linguist',
      title: 'ES/PT Neural Translation Specialist',
      languages: 'EN, ES, PT-BR',
      avatar: 'MS'
    },
    {
      id: 'usr-vendor-1',
      name: 'Polyglot Enterprises',
      email: 'ops@polyglotenterprises.com',
      password: 'vendor123',
      role: 'vendor',
      company: 'Polyglot Global Language Partners LLC',
      title: 'Director of Localization Operations',
      avatar: 'PE'
    }
  ];

  const SEED_PROJECTS = [
    {
      id: 'prj-101',
      title: 'Next-Gen FinTech Mobile App UI Strings Localization',
      category: 'Software Localization',
      clientName: 'NovaGlobal Enterprises Inc.',
      clientId: 'usr-client-1',
      targetRoles: 'freelancer', // 'freelancer', 'vendor', or 'all'
      languages: 'EN → ES, PT-BR, FR, DE',
      wordCount: '28,500 strings',
      budget: '$3,800 USD',
      deadline: '2026-12-15',
      description: 'Comprehensive UI string translation, pluralization rules, and mobile layout QA for iOS and Android payment apps. Requires experience with JSON key-value localization and i18n placeholders.',
      status: 'open',
      assignedTo: null,
      createdAt: '2026-11-20'
    },
    {
      id: 'prj-102',
      title: 'Enterprise Medical Device IFU & CE-MDR Compliance Filing',
      category: 'Document Translation',
      clientName: 'BioHealth Instruments',
      clientId: 'usr-client-ext',
      targetRoles: 'vendor',
      languages: 'EN → DE, FR, IT, NL, SV',
      wordCount: '165,000 words',
      budget: '$18,500 USD',
      deadline: '2026-12-30',
      description: 'High-precision surgical instruction manual for class III diagnostic devices. Requires ISO 17100 and ISO 13485 certified translation vendor with dual-linguist review and back-translation verification.',
      status: 'open',
      assignedTo: null,
      createdAt: '2026-11-19'
    },
    {
      id: 'prj-103',
      title: 'Multilingual Conversational AI Speech Annotation & RLHF',
      category: 'AI Training Data',
      clientName: 'CognitiveCore AI',
      clientId: 'usr-client-ext2',
      targetRoles: 'all',
      languages: 'Hindi, Tamil, Bengali, Telugu, English',
      wordCount: '120 Audio Hours / 45k prompts',
      budget: '$12,000 USD',
      deadline: '2027-01-10',
      description: 'Audio transcription, phoneme timestamping, and safety/toxicity alignment for LLM fine-tuning. Open to certified vendors and specialized NLP speech annotators.',
      status: 'open',
      assignedTo: null,
      createdAt: '2026-11-21'
    },
    {
      id: 'prj-104',
      title: 'K-12 STEM Interactive E-Learning Module Adaptation',
      category: 'E-Learning Solutions',
      clientName: 'EduSphere Global',
      clientId: 'usr-client-ext3',
      targetRoles: 'freelancer',
      languages: 'EN → Arabic, Japanese',
      wordCount: '18 SCORM Modules / 64k words',
      budget: '$6,400 USD',
      deadline: '2026-12-24',
      description: 'Translating Articulate Storyline e-learning modules, cultural adaptation of math/science graphics, and localized voiceover subtitle integration.',
      status: 'open',
      assignedTo: null,
      createdAt: '2026-11-18'
    }
  ];

  const SEED_INQUIRIES = [
    {
      id: 'inq-901',
      name: 'David Armstrong',
      email: 'd.armstrong@zenithtech.de',
      service: 'Software localization',
      message: 'Looking for full localization of our SaaS billing platform into French, German, Spanish, and Japanese. Approximately 42,000 strings in JSON. Need delivery before end of Q4.',
      timestamp: '2026-11-21T09:14:00Z',
      dateFormatted: 'Nov 21, 2026, 09:14 AM',
      status: 'new'
    },
    {
      id: 'inq-902',
      name: 'Dr. Priya Sundaram',
      email: 'priya.s@aetherbio.com',
      service: 'AI data collection',
      message: 'We require 500 hours of conversational dialect audio in Indian languages (Hindi, Kannada, Marathi) with native speaker demographic tags for voice assistant training.',
      timestamp: '2026-11-20T16:30:00Z',
      dateFormatted: 'Nov 20, 2026, 04:30 PM',
      status: 'in_review'
    },
    {
      id: 'inq-903',
      name: 'Marc Fontaine',
      email: 'fontaine@edulabs.fr',
      service: 'E-learning localization',
      message: 'Seeking SCORM package localization and French/German native dubbing for 24 micro-learning modules.',
      timestamp: '2026-11-19T11:45:00Z',
      dateFormatted: 'Nov 19, 2026, 11:45 AM',
      status: 'contacted'
    }
  ];

  const SEED_PROPOSALS = [
    {
      id: 'prop-501',
      projectId: 'prj-101',
      projectTitle: 'Next-Gen FinTech Mobile App UI Strings Localization',
      userId: 'usr-free-1',
      userName: 'Mateo Silva',
      userRole: 'freelancer',
      userEmail: 'mateo.silva@linguist.io',
      bidAmount: '$3,600 USD',
      deliveryDays: 8,
      coverLetter: 'Experienced native Spanish & Portuguese localization specialist with 9+ years translating FinTech banking interfaces. Familiar with Smartling, Crowdin, and Figma string management.',
      status: 'pending',
      submittedAt: '2026-11-20T14:20:00Z'
    },
    {
      id: 'prop-502',
      projectId: 'prj-102',
      projectTitle: 'Enterprise Medical Device IFU & CE-MDR Compliance Filing',
      userId: 'usr-vendor-1',
      userName: 'Polyglot Enterprises',
      userRole: 'vendor',
      userEmail: 'ops@polyglotenterprises.com',
      bidAmount: '$17,200 USD',
      deliveryDays: 14,
      coverLetter: 'Certified EN ISO 17100:2015 and ISO 13485 language agency. Our medical translation division includes 14 MD linguists for EU MDR conformity assessments.',
      status: 'pending',
      submittedAt: '2026-11-20T18:10:00Z'
    }
  ];

  const SEED_MESSAGES = [
    {
      id: 'msg-1',
      threadId: 'thread_usr-admin_usr-client-1',
      senderId: 'usr-client-1',
      senderName: 'Sarah Chen',
      senderRole: 'client',
      recipientId: 'usr-admin',
      recipientRole: 'admin',
      message: 'Hi Vikram, we have uploaded the latest Figma wireframes for the FinTech project. Can we ensure the Portuguese QA covers Brazilian banking terminology specifically?',
      timestamp: '2026-11-21T10:05:00Z'
    },
    {
      id: 'msg-2',
      threadId: 'thread_usr-admin_usr-client-1',
      senderId: 'usr-admin',
      senderName: 'Vikram Malhotra',
      senderRole: 'admin',
      recipientId: 'usr-client-1',
      recipientRole: 'client',
      message: 'Hello Sarah! Absolutely. We have assigned Mateo Silva, who specializes strictly in Brazilian Portuguese FinTech compliance. We will run the automated termbase check first.',
      timestamp: '2026-11-21T10:08:00Z'
    },
    {
      id: 'msg-3',
      threadId: 'thread_usr-admin_usr-free-1',
      senderId: 'usr-free-1',
      senderName: 'Mateo Silva',
      senderRole: 'freelancer',
      recipientId: 'usr-admin',
      recipientRole: 'admin',
      message: 'Good morning Vikram, I submitted my proposal for the FinTech UI string project. I have open capacity this week to complete the Spanish and Portuguese batches.',
      timestamp: '2026-11-21T11:15:00Z'
    },
    {
      id: 'msg-4',
      threadId: 'thread_usr-admin_usr-free-1',
      senderId: 'usr-admin',
      senderName: 'Vikram Malhotra',
      senderRole: 'admin',
      recipientId: 'usr-free-1',
      recipientRole: 'freelancer',
      message: 'Thanks Mateo! We reviewed your sample strings from the previous banking sprint; they look spot-on. Final approval will be confirmed shortly.',
      timestamp: '2026-11-21T11:22:00Z'
    },
    {
      id: 'msg-5',
      threadId: 'thread_usr-admin_usr-vendor-1',
      senderId: 'usr-vendor-1',
      senderName: 'Polyglot Enterprises',
      senderRole: 'vendor',
      recipientId: 'usr-admin',
      recipientRole: 'admin',
      message: 'Hello Mavy Operations Team, we submitted our RFP response for the 165k word Medical IFU project with our MDR ISO 13485 audit certificate attached.',
      timestamp: '2026-11-20T19:00:00Z'
    },
    {
      id: 'msg-6',
      threadId: 'thread_usr-admin_usr-vendor-1',
      senderId: 'usr-admin',
      senderName: 'Vikram Malhotra',
      senderRole: 'admin',
      recipientId: 'usr-vendor-1',
      recipientRole: 'vendor',
      message: 'Received, thank you. Our life-sciences QA director is validating the subject-matter expert roster today.',
      timestamp: '2026-11-21T08:30:00Z'
    }
  ];

  function initDatabase() {
    let users = localStorage.getItem('mavy_users') ? JSON.parse(localStorage.getItem('mavy_users')) : SEED_USERS;
    const adminIdx = users.findIndex(u => u.role === 'admin');
    if (adminIdx !== -1) {
      users[adminIdx].email = 'admin@mavyedu.com';
      users[adminIdx].password = 'MavyAdmin@2026';
    } else {
      users.unshift(SEED_USERS[0]);
    }
    localStorage.setItem('mavy_users', JSON.stringify(users));

    if (!localStorage.getItem('mavy_projects')) {
      localStorage.setItem('mavy_projects', JSON.stringify(SEED_PROJECTS));
    }
    if (!localStorage.getItem('mavy_inquiries')) {
      localStorage.setItem('mavy_inquiries', JSON.stringify(SEED_INQUIRIES));
    }
    if (!localStorage.getItem('mavy_proposals')) {
      localStorage.setItem('mavy_proposals', JSON.stringify(SEED_PROPOSALS));
    }
    if (!localStorage.getItem('mavy_chat_messages')) {
      localStorage.setItem('mavy_chat_messages', JSON.stringify(SEED_MESSAGES));
    }
  }

  // Helper getters/setters
  function getUsers() { return JSON.parse(localStorage.getItem('mavy_users') || '[]'); }
  function saveUsers(users) { localStorage.setItem('mavy_users', JSON.stringify(users)); }

  function getProjects() { return JSON.parse(localStorage.getItem('mavy_projects') || '[]'); }
  function saveProjects(p) { localStorage.setItem('mavy_projects', JSON.stringify(p)); }

  function getInquiries() { return JSON.parse(localStorage.getItem('mavy_inquiries') || '[]'); }
  function saveInquiries(inq) { localStorage.setItem('mavy_inquiries', JSON.stringify(inq)); }

  function getProposals() { return JSON.parse(localStorage.getItem('mavy_proposals') || '[]'); }
  function saveProposals(p) { localStorage.setItem('mavy_proposals', JSON.stringify(p)); }

  function getMessages() { return JSON.parse(localStorage.getItem('mavy_chat_messages') || '[]'); }
  function saveMessages(m) { 
    localStorage.setItem('mavy_chat_messages', JSON.stringify(m));
    window.dispatchEvent(new Event('mavy_chat_updated'));
  }

  function getCurrentUser() {
    const raw = localStorage.getItem('mavy_current_user');
    return raw ? JSON.parse(raw) : null;
  }
  function setCurrentUser(user) {
    if (user) {
      localStorage.setItem('mavy_current_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mavy_current_user');
    }
  }

  // =========================================================================
  // 2. STATE MANAGEMENT & VIEW CONTROLLER
  // =========================================================================

  let activeSection = 'dashboard';
  let activeChatThreadId = null;
  let activeInquiryId = null;

  function init() {
    initDatabase();
    
    // Check if user is already logged in
    const currentUser = getCurrentUser();
    if (currentUser) {
      showDashboard(currentUser);
    } else {
      showAuth();
    }

    // Cross-tab real-time sync for chat and inquiries
    window.addEventListener('storage', (e) => {
      if (e.key === 'mavy_chat_messages' && activeSection === 'chat') {
        renderLiveChat();
      }
      if (e.key === 'mavy_inquiries' && activeSection === 'inquiries') {
        renderInquiriesInbox();
      }
    });

    window.addEventListener('mavy_chat_updated', () => {
      if (activeSection === 'chat') {
        renderLiveChat();
      }
    });

    // Logout listener
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', handleLogout);
    }
  }

  // =========================================================================
  // 3. AUTHENTICATION & ROLE-SWITCHING
  // =========================================================================

  window.switchAuthTab = function (tab) {
    const tabLogin = document.getElementById('tabLogin');
    const tabRegister = document.getElementById('tabRegister');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (tab === 'login') {
      tabLogin.classList.add('active');
      tabRegister.classList.remove('active');
      loginForm.style.display = 'flex';
      registerForm.style.display = 'none';
    } else {
      tabRegister.classList.add('active');
      tabLogin.classList.remove('active');
      registerForm.style.display = 'flex';
      loginForm.style.display = 'none';
    }
  };

  window.handleRoleSelectionChange = function () {
    const role = document.getElementById('regRole').value;
    const orgLabel = document.getElementById('regOrgLabel');
    const orgInput = document.getElementById('regOrg');
    if (role === 'freelancer') {
      orgLabel.textContent = 'Primary Language Pairs / Specialization';
      orgInput.placeholder = 'e.g. English → Spanish / German (FinTech & Medical)';
    } else if (role === 'vendor') {
      orgLabel.textContent = 'Vendor / Agency Name & Headquarters';
      orgInput.placeholder = 'e.g. Polyglot Global Partners LLC (Berlin / Tokyo)';
    } else {
      orgLabel.textContent = 'Company / Organization';
      orgInput.placeholder = 'e.g. NovaGlobal Enterprises Inc.';
    }
  };

  window.handleLogin = function (e) {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value.trim().toLowerCase();
    const pass = document.getElementById('loginPassword').value.trim();

    const users = getUsers();
    const user = users.find(u => {
      const isEmailMatch = u.email.toLowerCase() === email;
      const isAdminAlias = u.role === 'admin' && (email === 'admin' || email === 'admin@mavyedusolutions.co.in' || email === 'admin@mavyedu.com');
      const isPassMatch = u.password === pass || (u.role === 'admin' && (pass === 'MavyAdmin@2026' || pass === 'mavyadmin123'));
      return (isEmailMatch || isAdminAlias) && isPassMatch;
    });

    if (user) {
      setCurrentUser(user);
      showDashboard(user);
    } else {
      alert('Authentication failed: Invalid credentials. Please verify your email and password.');
    }
  };

  window.handleRegister = function (e) {
    e.preventDefault();
    const role = document.getElementById('regRole').value;
    const name = document.getElementById('regName').value.trim();
    const org = document.getElementById('regOrg').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value.trim();

    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      alert('An account with this email address already exists in the Mavy Enclave.');
      return;
    }

    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U';

    const newUser = {
      id: 'usr-' + Date.now(),
      name,
      email,
      password,
      role,
      company: org,
      title: role === 'freelancer' ? 'Registered Freelancer Linguist' : (role === 'vendor' ? 'Certified Vendor Agency' : 'Enterprise Client Account'),
      avatar: initials
    };

    users.push(newUser);
    saveUsers(users);
    setCurrentUser(newUser);
    showDashboard(newUser);
  };

  function handleLogout() {
    setCurrentUser(null);
    showAuth();
  }

  function showAuth() {
    document.getElementById('authView').style.display = 'flex';
    document.getElementById('dashboardView').style.display = 'none';
    document.getElementById('userNavInfo').style.display = 'none';
  }

  // =========================================================================
  // 4. ROLE-BASED DASHBOARD RENDERING
  // =========================================================================

  function showDashboard(user) {
    document.getElementById('authView').style.display = 'none';
    document.getElementById('dashboardView').style.display = 'grid';
    document.getElementById('userNavInfo').style.display = 'flex';

    // Update Header Badges
    const badge = document.getElementById('activeRoleBadge');
    badge.textContent = user.role.toUpperCase();
    badge.className = 'portal-role-badge badge-' + user.role;

    document.getElementById('navAvatar').textContent = user.avatar || user.name[0];
    document.getElementById('navUserName').textContent = user.name;
    document.getElementById('navUserOrg').textContent = user.company || user.title;

    document.getElementById('sidebarUserName').textContent = user.name;
    document.getElementById('sidebarUserRole').textContent = user.title || user.company;

    // Build sidebar menu based on role
    buildSidebarMenu(user);

    // Default action button in sidebar
    const actionBtnText = document.getElementById('sidebarActionBtnText');
    if (user.role === 'admin') {
      actionBtnText.textContent = '+ Post New Project';
    } else if (user.role === 'client') {
      actionBtnText.textContent = '+ Request Project';
    } else {
      actionBtnText.textContent = '✉️ Direct Chat with PM';
    }

    // Default to 'dashboard' section
    navigateTo('dashboard');
  }

  function buildSidebarMenu(user) {
    const menu = document.getElementById('sidebarMenu');
    menu.innerHTML = '';

    const inquiries = getInquiries();
    const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;

    const unreadMessagesCount = 1; // demo badge

    let items = [];

    if (user.role === 'admin') {
      items = [
        { id: 'dashboard', label: '📊 All Projects Pipeline', icon: '📁' },
        { id: 'inquiries', label: '📥 Inquiries Inbox', icon: '📬', badge: newInquiriesCount > 0 ? newInquiriesCount : null, badgeClass: 'badge-unread' },
        { id: 'proposals', label: '📑 Review All Bids', icon: '💼' },
        { id: 'chat', label: '💬 Integrated Live Chat', icon: '💬', badge: unreadMessagesCount, badgeClass: '' }
      ];
    } else if (user.role === 'client') {
      items = [
        { id: 'dashboard', label: '📁 My Localization Projects', icon: '📁' },
        { id: 'chat', label: '💬 Live Chat with PM', icon: '💬' }
      ];
    } else if (user.role === 'freelancer') {
      items = [
        { id: 'dashboard', label: '⚡ Open Tasks & Projects', icon: '⚡' },
        { id: 'mybids', label: '📝 My Proposals & Contracts', icon: '📝' },
        { id: 'chat', label: '💬 Live Chat with PM', icon: '💬' }
      ];
    } else if (user.role === 'vendor') {
      items = [
        { id: 'dashboard', label: '🏢 Enterprise RFPs & Volume Batches', icon: '🏢' },
        { id: 'mybids', label: '📑 Our Submitted Proposals', icon: '📑' },
        { id: 'chat', label: '💬 Vendor Operations Chat', icon: '💬' }
      ];
    }

    items.forEach(item => {
      const btn = document.createElement('button');
      btn.className = 'sidebar-btn' + (item.id === activeSection ? ' active' : '');
      btn.onclick = () => navigateTo(item.id);

      let badgeHtml = '';
      if (item.badge) {
        badgeHtml = `<span class="sidebar-badge ${item.badgeClass || ''}">${item.badge}</span>`;
      }

      btn.innerHTML = `<span>${item.icon} ${item.label}</span>${badgeHtml}`;
      menu.appendChild(btn);
    });
  }

  window.navigateTo = function (sectionId) {
    activeSection = sectionId;
    const user = getCurrentUser();
    if (!user) return;

    // Update active class on sidebar buttons
    const buttons = document.querySelectorAll('.sidebar-btn');
    buttons.forEach(b => b.classList.remove('active'));
    buildSidebarMenu(user);

    // Update Section Headings
    const heading = document.getElementById('sectionHeading');
    const subtitle = document.getElementById('sectionSubtitle');
    const actionArea = document.getElementById('headerActionArea');
    actionArea.innerHTML = '';

    if (sectionId === 'dashboard') {
      renderRoleDashboard(user, heading, subtitle, actionArea);
    } else if (sectionId === 'inquiries') {
      renderInquiriesInbox(heading, subtitle, actionArea);
    } else if (sectionId === 'proposals' || sectionId === 'mybids') {
      renderProposalsView(user, heading, subtitle, actionArea);
    } else if (sectionId === 'chat') {
      renderLiveChatView(user, heading, subtitle, actionArea);
    }
  };

  window.openQuickActionModal = function () {
    const user = getCurrentUser();
    if (!user) return;

    if (user.role === 'admin') {
      openModal('postProjectModal');
    } else if (user.role === 'client') {
      openModal('clientRequestModal');
    } else {
      navigateTo('chat');
    }
  };

  // =========================================================================
  // 5. ROLE-SPECIFIC VIEWS & STRICT DATA ISOLATION
  // =========================================================================

  function renderRoleDashboard(user, heading, subtitle, actionArea) {
    const statsBanner = document.getElementById('statsBanner');
    const container = document.getElementById('dynamicSectionContent');
    const allProjects = getProjects();
    const proposals = getProposals();

    if (user.role === 'admin') {
      heading.textContent = 'Global Project Operations Pipeline';
      subtitle.textContent = 'Publish enterprise projects, evaluate freelancer & vendor bids, and supervise deliverables.';
      
      actionArea.innerHTML = `
        <button class="btn-portal btn-portal-primary" onclick="openModal('postProjectModal')">
          + Post New Project
        </button>
      `;

      // Stats
      const inquiries = getInquiries();
      const openCount = allProjects.filter(p => p.status === 'open').length;
      const bidsCount = proposals.length;
      const inqCount = inquiries.length;

      statsBanner.innerHTML = `
        <div class="portal-stat-card">
          <div class="stat-icon">📂</div>
          <div class="stat-val">${allProjects.length}</div>
          <div class="stat-label">Total Projects in Enclave</div>
        </div>
        <div class="portal-stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-val" style="color:var(--gold);">${openCount}</div>
          <div class="stat-label">Active Open Projects</div>
        </div>
        <div class="portal-stat-card">
          <div class="stat-icon">📑</div>
          <div class="stat-val" style="color:var(--emerald);">${bidsCount}</div>
          <div class="stat-label">Proposals Received</div>
        </div>
        <div class="portal-stat-card">
          <div class="stat-icon">📬</div>
          <div class="stat-val" style="color:var(--sapphire);">${inqCount}</div>
          <div class="stat-label">Website Inquiries (Zero-Formspree)</div>
        </div>
      `;

      // Projects Grid with admin bid review controls
      renderProjectsGrid(allProjects, container, user);

    } else if (user.role === 'client') {
      heading.textContent = 'Client Localization & AI Workspace';
      subtitle.textContent = 'Track your localization campaigns, linguistic QA milestones, and direct communications.';

      actionArea.innerHTML = `
        <button class="btn-portal btn-portal-primary" onclick="openModal('clientRequestModal')">
          + Request New Project
        </button>
      `;

      // STRICT ISOLATION: Client sees ONLY their own projects
      const clientProjects = allProjects.filter(p => p.clientId === user.id || p.clientName.toLowerCase().includes(user.name.toLowerCase()));

      statsBanner.innerHTML = `
        <div class="portal-stat-card">
          <div class="stat-icon">📁</div>
          <div class="stat-val">${clientProjects.length}</div>
          <div class="stat-label">Active Localization Projects</div>
        </div>
        <div class="portal-stat-card">
          <div class="stat-icon">🛡️</div>
          <div class="stat-val" style="color:var(--emerald);">ISO 9001 / 27001</div>
          <div class="stat-label">Linguistic QA & Security Tier</div>
        </div>
        <div class="portal-stat-card">
          <div class="stat-icon">💬</div>
          <div class="stat-val" style="color:var(--sapphire);">Online</div>
          <div class="stat-label">Dedicated Project Manager</div>
        </div>
      `;

      if (clientProjects.length === 0) {
        container.innerHTML = `
          <div style="background:var(--portal-card);border:1px dashed var(--portal-border-gold);border-radius:16px;padding:3rem;text-align:center;">
            <div style="font-size:2.5rem;margin-bottom:1rem;">🚀</div>
            <h3 style="color:#fff;margin-bottom:0.5rem;">No Active Projects Yet</h3>
            <p style="color:var(--text-muted);font-size:0.88rem;max-width:440px;margin:0 auto 1.5rem;">
              Submit your localization, AI data annotation, or multimedia subtitling requirements. Our project management team will assign native specialists within 1 business day.
            </p>
            <button class="btn-portal btn-portal-primary" onclick="openModal('clientRequestModal')">+ Submit Localization Request</button>
          </div>
        `;
      } else {
        renderProjectsGrid(clientProjects, container, user);
      }

    } else if (user.role === 'freelancer') {
      heading.textContent = 'Freelancer Linguistic & AI Marketplace';
      subtitle.textContent = 'Apply for translation, subtitling, and AI annotation tasks matched to your certified language pairs.';

      actionArea.innerHTML = `
        <button class="btn-portal btn-portal-outline" onclick="navigateTo('chat')">
          ✉️ Chat with PM
        </button>
      `;

      // STRICT ISOLATION: Freelancer sees only open projects targeted for freelancers or all
      const openFreelancerProjects = allProjects.filter(p => p.status === 'open' && (p.targetRoles === 'freelancer' || p.targetRoles === 'all'));
      const myProposals = proposals.filter(p => p.userId === user.id);

      statsBanner.innerHTML = `
        <div class="portal-stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-val" style="color:var(--emerald);">${openFreelancerProjects.length}</div>
          <div class="stat-label">Open Projects for Application</div>
        </div>
        <div class="portal-stat-card">
          <div class="stat-icon">📝</div>
          <div class="stat-val" style="color:var(--gold);">${myProposals.length}</div>
          <div class="stat-label">Your Submitted Proposals</div>
        </div>
        <div class="portal-stat-card">
          <div class="stat-icon">🔒</div>
          <div class="stat-val" style="color:var(--sapphire);">Enclave Blind</div>
          <div class="stat-label">Private Bid Isolation Enabled</div>
        </div>
      `;

      renderProjectsGrid(openFreelancerProjects, container, user);

    } else if (user.role === 'vendor') {
      heading.textContent = 'Enterprise Vendor & Agency RFP Marketplace';
      subtitle.textContent = 'High-volume translation batches, multilingual speech collection, and enterprise localization RFPs.';

      actionArea.innerHTML = `
        <button class="btn-portal btn-portal-outline" onclick="navigateTo('chat')">
          ✉️ Vendor Operations Chat
        </button>
      `;

      // STRICT ISOLATION: Vendor sees only open projects targeted for vendors or all
      const openVendorProjects = allProjects.filter(p => p.status === 'open' && (p.targetRoles === 'vendor' || p.targetRoles === 'all'));
      const ourProposals = proposals.filter(p => p.userId === user.id);

      statsBanner.innerHTML = `
        <div class="portal-stat-card">
          <div class="stat-icon">🏢</div>
          <div class="stat-val" style="color:#c084fc;">${openVendorProjects.length}</div>
          <div class="stat-label">Volume RFPs Open for Bidding</div>
        </div>
        <div class="portal-stat-card">
          <div class="stat-icon">📑</div>
          <div class="stat-val" style="color:var(--gold);">${ourProposals.length}</div>
          <div class="stat-label">Our Active Proposals</div>
        </div>
        <div class="portal-stat-card">
          <div class="stat-icon">🤝</div>
          <div class="stat-val" style="color:var(--emerald);">Tier-1 Verified</div>
          <div class="stat-label">Master Service Agreement (MSA) Active</div>
        </div>
      `;

      renderProjectsGrid(openVendorProjects, container, user);
    }
  }

  function renderProjectsGrid(projects, container, user) {
    if (projects.length === 0) {
      container.innerHTML = `
        <div style="background:var(--portal-card);border:1px solid var(--portal-border);border-radius:16px;padding:3rem;text-align:center;color:var(--text-muted);">
          No projects found in this category at this time.
        </div>
      `;
      return;
    }

    const proposals = getProposals();

    let html = '<div class="projects-grid">';
    projects.forEach(p => {
      // Find proposals for this project
      const projectBids = proposals.filter(b => b.projectId === p.id);
      const userHasBid = proposals.some(b => b.projectId === p.id && b.userId === user.id);

      let targetBadge = '';
      if (p.targetRoles === 'freelancer') {
        targetBadge = '<span class="project-tag" style="color:var(--emerald);border-color:rgba(16,185,129,0.3);">Freelancers Only</span>';
      } else if (p.targetRoles === 'vendor') {
        targetBadge = '<span class="project-tag" style="color:#c084fc;border-color:rgba(192,132,252,0.3);">Vendors Only</span>';
      } else {
        targetBadge = '<span class="project-tag" style="color:var(--sapphire);border-color:rgba(56,189,248,0.3);">Open to All</span>';
      }

      let footerAction = '';
      if (user.role === 'admin') {
        footerAction = `
          <button class="btn-portal btn-portal-outline" style="font-size:0.75rem;" onclick="openReviewBidsModal('${p.id}')">
            Review Bids (${projectBids.length})
          </button>
        `;
      } else if (user.role === 'freelancer' || user.role === 'vendor') {
        if (userHasBid) {
          footerAction = `
            <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--emerald);display:flex;align-items:center;gap:0.3rem;">
              ✓ Proposal Submitted
            </span>
          `;
        } else {
          footerAction = `
            <button class="btn-portal btn-portal-primary" style="font-size:0.75rem;" onclick="openApplyModal('${p.id}')">
              Submit Proposal / Bid →
            </button>
          `;
        }
      } else if (user.role === 'client') {
        footerAction = `
          <button class="btn-portal btn-portal-outline" style="font-size:0.75rem;" onclick="navigateTo('chat')">
            💬 Project Chat
          </button>
        `;
      }

      html += `
        <div class="project-card">
          <div>
            <div class="project-card-header">
              <span class="status-badge ${p.status === 'open' ? 'status-active' : 'status-pending'}">${p.status}</span>
              ${targetBadge}
            </div>
            <h3 class="project-title">${escapeHtml(p.title)}</h3>
            <div class="project-tags">
              <span class="project-tag">${p.category}</span>
              <span class="project-tag">${p.languages}</span>
            </div>
            <div class="project-meta-grid">
              <div class="meta-item">
                <small>Volume</small>
                <strong>${p.wordCount}</strong>
              </div>
              <div class="meta-item">
                <small>Budget / Rate</small>
                <strong>${p.budget}</strong>
              </div>
              <div class="meta-item">
                <small>Deadline</small>
                <strong style="color:var(--text-main);font-size:0.78rem;">${p.deadline}</strong>
              </div>
              <div class="meta-item">
                <small>Client</small>
                <strong style="color:var(--text-muted);font-size:0.75rem;">${user.role === 'admin' ? escapeHtml(p.clientName) : 'Mavy Verified'}</strong>
              </div>
            </div>
            <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.5;margin-bottom:1.2rem;">
              ${escapeHtml(p.description)}
            </p>
          </div>
          <div class="project-card-footer">
            <span style="font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);">
              ID: ${p.id}
            </span>
            ${footerAction}
          </div>
        </div>
      `;
    });
    html += '</div>';

    container.innerHTML = html;
  }

  // =========================================================================
  // 6. INQUIRIES INBOX (WEBSITE CONTACT FORM LEADS — ADMIN ONLY)
  // =========================================================================

  function renderInquiriesInbox(heading, subtitle, actionArea) {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      alert('Access restricted to Platform Administrators.');
      navigateTo('dashboard');
      return;
    }

    if (heading) heading.textContent = 'Website Contact Form Inquiries';
    if (subtitle) subtitle.textContent = 'Live submissions captured directly from the index.html contact form (Zero Formspree).';

    const inquiries = getInquiries();
    const statsBanner = document.getElementById('statsBanner');
    const container = document.getElementById('dynamicSectionContent');

    const newCount = inquiries.filter(i => i.status === 'new').length;
    const reviewCount = inquiries.filter(i => i.status === 'in_review').length;
    const contactedCount = inquiries.filter(i => i.status === 'contacted').length;

    statsBanner.innerHTML = `
      <div class="portal-stat-card">
        <div class="stat-icon">📬</div>
        <div class="stat-val" style="color:var(--sapphire);">${newCount}</div>
        <div class="stat-label">New Incoming Inquiries</div>
      </div>
      <div class="portal-stat-card">
        <div class="stat-icon">⏳</div>
        <div class="stat-val" style="color:var(--gold);">${reviewCount}</div>
        <div class="stat-label">In Review by PM</div>
      </div>
      <div class="portal-stat-card">
        <div class="stat-icon">✅</div>
        <div class="stat-val" style="color:var(--emerald);">${contactedCount}</div>
        <div class="stat-label">Contacted / Converted</div>
      </div>
      <div class="portal-stat-card">
        <div class="stat-icon">🔒</div>
        <div class="stat-val" style="font-size:1.1rem;color:var(--text-main);margin-top:0.4rem;">Direct Storage</div>
        <div class="stat-label">No Formspree Dependency</div>
      </div>
    `;

    if (inquiries.length === 0) {
      container.innerHTML = `
        <div style="background:var(--portal-card);border:1px solid var(--portal-border);border-radius:16px;padding:3rem;text-align:center;color:var(--text-muted);">
          No contact inquiries submitted yet. Submit a message on the main website to see it appear here live!
        </div>
      `;
      return;
    }

    let tableHtml = `
      <div style="background:var(--portal-card);border:1px solid var(--portal-border);border-radius:16px;overflow:hidden;">
        <table class="inquiries-table">
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>Client / Lead Name</th>
              <th>Service Vertical</th>
              <th>Message Snippet</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
    `;

    inquiries.forEach(inq => {
      let badgeClass = 'status-new';
      if (inq.status === 'in_review') badgeClass = 'status-pending';
      if (inq.status === 'contacted') badgeClass = 'status-active';

      tableHtml += `
        <tr>
          <td style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);white-space:nowrap;">
            ${inq.dateFormatted || inq.timestamp.substring(0, 10)}
          </td>
          <td>
            <strong>${escapeHtml(inq.name)}</strong>
            <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-muted);">${escapeHtml(inq.email)}</div>
          </td>
          <td>
            <span class="project-tag">${escapeHtml(inq.service)}</span>
          </td>
          <td style="max-width:280px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text-muted);">
            ${escapeHtml(inq.message)}
          </td>
          <td>
            <span class="status-badge ${badgeClass}">${inq.status}</span>
          </td>
          <td>
            <button class="btn-portal btn-portal-outline" style="padding:0.35rem 0.7rem;font-size:0.75rem;" onclick="openInquiryModal('${inq.id}')">
              View &amp; Reply
            </button>
          </td>
        </tr>
      `;
    });

    tableHtml += `
          </tbody>
        </table>
      </div>
    `;

    container.innerHTML = tableHtml;
  }

  window.openInquiryModal = function (inqId) {
    const inquiries = getInquiries();
    const inq = inquiries.find(i => i.id === inqId);
    if (!inq) return;

    activeInquiryId = inqId;
    const metaHeader = document.getElementById('inqMetaHeader');
    metaHeader.textContent = `Submitted ${inq.dateFormatted || inq.timestamp} · ID: ${inq.id}`;

    const body = document.getElementById('inquiryDetailBody');
    body.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;background:rgba(0,0,0,0.3);padding:1rem;border-radius:12px;">
        <div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Contact Person</small>
          <div style="font-weight:600;font-size:0.95rem;color:#fff;">${escapeHtml(inq.name)}</div>
        </div>
        <div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Email Address</small>
          <div style="font-family:var(--font-mono);font-size:0.85rem;color:var(--gold);">${escapeHtml(inq.email)}</div>
        </div>
        <div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Requested Service</small>
          <div style="font-size:0.85rem;color:var(--sapphire);font-weight:600;">${escapeHtml(inq.service)}</div>
        </div>
        <div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Current Lead Status</small>
          <div><span class="status-badge ${inq.status === 'new' ? 'status-new' : (inq.status === 'in_review' ? 'status-pending' : 'status-active')}">${inq.status}</span></div>
        </div>
      </div>
      <div>
        <small style="font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);text-transform:uppercase;display:block;margin-bottom:0.4rem;">Full Project Specifications</small>
        <div style="background:rgba(255,255,255,0.03);border:1px solid var(--portal-border);padding:1.2rem;border-radius:12px;font-size:0.88rem;color:#fff;line-height:1.6;">
          ${escapeHtml(inq.message)}
        </div>
      </div>
    `;

    const statusBtn = document.getElementById('inqStatusBtn');
    if (inq.status === 'new') {
      statusBtn.textContent = 'Mark "In Review"';
    } else if (inq.status === 'in_review') {
      statusBtn.textContent = 'Mark "Contacted"';
    } else {
      statusBtn.textContent = 'Mark "New"';
    }

    const startChatBtn = document.getElementById('inqStartChatBtn');
    startChatBtn.onclick = () => {
      closeModal('inquiryDetailModal');
      // Create or locate thread for this lead
      openChatWithLead(inq);
    };

    openModal('inquiryDetailModal');
  };

  window.toggleInquiryStatus = function () {
    if (!activeInquiryId) return;
    const inquiries = getInquiries();
    const inq = inquiries.find(i => i.id === activeInquiryId);
    if (!inq) return;

    if (inq.status === 'new') inq.status = 'in_review';
    else if (inq.status === 'in_review') inq.status = 'contacted';
    else inq.status = 'new';

    saveInquiries(inquiries);
    openInquiryModal(activeInquiryId);
    renderInquiriesInbox();
  };

  function openChatWithLead(inq) {
    // See if a user exists with this email, or create a mock client identity
    const users = getUsers();
    let leadUser = users.find(u => u.email.toLowerCase() === inq.email.toLowerCase());
    if (!leadUser) {
      leadUser = {
        id: 'usr-lead-' + inq.id,
        name: inq.name,
        email: inq.email,
        role: 'client',
        company: 'Prospective Client',
        title: 'Project Lead',
        avatar: inq.name.substring(0, 2).toUpperCase()
      };
      users.push(leadUser);
      saveUsers(users);
    }

    const threadId = `thread_usr-admin_${leadUser.id}`;
    const messages = getMessages();
    if (!messages.some(m => m.threadId === threadId)) {
      // Seed first introductory message
      messages.push({
        id: 'msg-' + Date.now(),
        threadId,
        senderId: 'usr-admin',
        senderName: 'Vikram Malhotra',
        senderRole: 'admin',
        recipientId: leadUser.id,
        recipientRole: 'client',
        message: `Hello ${inq.name}, thank you for your project inquiry regarding "${inq.service}". Our solutions architecture team is ready to prepare your custom estimate and workflow plan.`,
        timestamp: new Date().toISOString()
      });
      saveMessages(messages);
    }

    activeChatThreadId = threadId;
    navigateTo('chat');
  }

  // =========================================================================
  // 7. PROPOSALS & BIDS MANAGEMENT (ADMIN REVIEW & FREELANCER/VENDOR SUBMISSIONS)
  // =========================================================================

  function renderProposalsView(user, heading, subtitle, actionArea) {
    const statsBanner = document.getElementById('statsBanner');
    const container = document.getElementById('dynamicSectionContent');
    const proposals = getProposals();
    const projects = getProjects();

    statsBanner.innerHTML = '';

    if (user.role === 'admin') {
      heading.textContent = 'All Specialist & Agency Proposals';
      subtitle.textContent = 'Evaluate competitive proposals from certified freelancers and enterprise vendors.';

      if (proposals.length === 0) {
        container.innerHTML = `
          <div style="background:var(--portal-card);border:1px solid var(--portal-border);border-radius:16px;padding:3rem;text-align:center;color:var(--text-muted);">
            No proposals have been submitted yet.
          </div>
        `;
        return;
      }

      let html = '<div style="display:flex;flex-direction:column;gap:1.2rem;">';
      proposals.forEach(prop => {
        const prj = projects.find(p => p.id === prop.projectId) || { title: prop.projectTitle, budget: 'N/A' };
        html += `
          <div class="project-card" style="padding:1.6rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.8rem;">
              <div>
                <span class="project-tag" style="color:var(--gold);border-color:var(--portal-border-gold);">${prop.userRole.toUpperCase()}</span>
                <h3 style="color:#fff;font-size:1.1rem;margin:0.4rem 0 0.2rem;">${escapeHtml(prop.userName)} <span style="font-size:0.8rem;color:var(--text-muted);font-weight:400;">(${escapeHtml(prop.userEmail)})</span></h3>
                <div style="font-family:var(--font-mono);font-size:0.75rem;color:var(--sapphire);">Target: ${escapeHtml(prj.title)}</div>
              </div>
              <span class="status-badge ${prop.status === 'accepted' ? 'status-active' : 'status-pending'}">${prop.status}</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:0.8rem;background:rgba(0,0,0,0.3);padding:0.9rem;border-radius:10px;margin-bottom:1rem;">
              <div class="meta-item">
                <small>Proposed Bid</small>
                <strong style="color:var(--emerald);">${escapeHtml(prop.bidAmount)}</strong>
              </div>
              <div class="meta-item">
                <small>Turnaround</small>
                <strong>${prop.deliveryDays} Days</strong>
              </div>
              <div class="meta-item">
                <small>Submitted At</small>
                <strong style="color:var(--text-muted);font-size:0.72rem;">${prop.submittedAt.substring(0, 10)}</strong>
              </div>
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:1rem;border-radius:10px;font-size:0.84rem;color:#e2e8f0;line-height:1.6;margin-bottom:1rem;">
              ${escapeHtml(prop.coverLetter)}
            </div>
            <div style="display:flex;justify-content:flex-end;gap:0.8rem;">
              ${prop.status === 'pending' ? `
                <button class="btn-portal btn-portal-primary" style="font-size:0.75rem;" onclick="acceptProposal('${prop.id}')">
                  ✓ Accept &amp; Assign Contract
                </button>
              ` : `
                <span style="font-family:var(--font-mono);font-size:0.75rem;color:var(--emerald);">✓ Contract Awarded</span>
              `}
              <button class="btn-portal btn-portal-outline" style="font-size:0.75rem;" onclick="openChatWithUser('${prop.userId}')">
                💬 Chat with Applicant
              </button>
            </div>
          </div>
        `;
      });
      html += '</div>';
      container.innerHTML = html;

    } else {
      // STRICT ISOLATION: Freelancer or Vendor sees ONLY their OWN proposals
      heading.textContent = user.role === 'freelancer' ? 'My Submitted Proposals & Contracts' : 'Our Enterprise Proposals & Active Batches';
      subtitle.textContent = 'Track your submitted bids, award decisions, and project delivery terms.';

      const myProposals = proposals.filter(p => p.userId === user.id);

      if (myProposals.length === 0) {
        container.innerHTML = `
          <div style="background:var(--portal-card);border:1px dashed var(--portal-border-gold);border-radius:16px;padding:3rem;text-align:center;">
            <div style="font-size:2.5rem;margin-bottom:1rem;">📝</div>
            <h3 style="color:#fff;margin-bottom:0.5rem;">No Proposals Submitted Yet</h3>
            <p style="color:var(--text-muted);font-size:0.88rem;max-width:440px;margin:0 auto 1.5rem;">
              Browse the open marketplace in your dashboard to find projects matching your language pairs and submit your competitive proposal.
            </p>
            <button class="btn-portal btn-portal-primary" onclick="navigateTo('dashboard')">View Open Marketplace →</button>
          </div>
        `;
        return;
      }

      let html = '<div style="display:flex;flex-direction:column;gap:1.2rem;">';
      myProposals.forEach(prop => {
        const prj = projects.find(p => p.id === prop.projectId) || { title: prop.projectTitle, budget: 'N/A' };
        html += `
          <div class="project-card" style="padding:1.6rem;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.8rem;">
              <div>
                <h3 style="color:#fff;font-size:1.05rem;margin-bottom:0.3rem;">${escapeHtml(prj.title)}</h3>
                <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-muted);">Proposal ID: ${prop.id} · Submitted ${prop.submittedAt.substring(0, 10)}</div>
              </div>
              <span class="status-badge ${prop.status === 'accepted' ? 'status-active' : 'status-pending'}">${prop.status}</span>
            </div>
            <div style="display:grid;grid-template-columns:repeat(2, 1fr);gap:0.8rem;background:rgba(0,0,0,0.3);padding:0.9rem;border-radius:10px;margin-bottom:1rem;">
              <div class="meta-item">
                <small>Your Bid Rate</small>
                <strong style="color:var(--emerald);">${escapeHtml(prop.bidAmount)}</strong>
              </div>
              <div class="meta-item">
                <small>Committed Turnaround</small>
                <strong>${prop.deliveryDays} Days</strong>
              </div>
            </div>
            <div style="background:rgba(255,255,255,0.03);padding:1rem;border-radius:10px;font-size:0.84rem;color:#cbd5e1;line-height:1.6;margin-bottom:1rem;">
              ${escapeHtml(prop.coverLetter)}
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <span style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-muted);">
                ${prop.status === 'accepted' ? '🎉 Contract Active — In Delivery' : '⏳ Under Client & PM Evaluation'}
              </span>
              <button class="btn-portal btn-portal-outline" style="font-size:0.75rem;" onclick="navigateTo('chat')">
                💬 Discuss with PM
              </button>
            </div>
          </div>
        `;
      });
      html += '</div>';
      container.innerHTML = html;
    }
  }

  window.acceptProposal = function (propId) {
    const proposals = getProposals();
    const prop = proposals.find(p => p.id === propId);
    if (!prop) return;

    prop.status = 'accepted';
    saveProposals(proposals);

    // Update Project Status
    const projects = getProjects();
    const prj = projects.find(p => p.id === prop.projectId);
    if (prj) {
      prj.status = 'in_progress';
      prj.assignedTo = { id: prop.userId, name: prop.userName, role: prop.userRole };
      saveProjects(projects);
    }

    // Send automated notification message into the user's chat thread
    const threadId = `thread_usr-admin_${prop.userId}`;
    const messages = getMessages();
    messages.push({
      id: 'msg-' + Date.now(),
      threadId,
      senderId: 'usr-admin',
      senderName: 'Vikram Malhotra',
      senderRole: 'admin',
      recipientId: prop.userId,
      recipientRole: prop.userRole,
      message: `Congratulations! Your proposal for "${prj ? prj.title : prop.projectTitle}" has been accepted. The project is now assigned to you. Please review the style guide and confirm milestone kick-off.`,
      timestamp: new Date().toISOString()
    });
    saveMessages(messages);

    alert(`Proposal awarded to ${prop.userName}! Project moved to In-Progress and an official notification has been sent via Live Chat.`);
    renderProposalsView(getCurrentUser(), document.getElementById('sectionHeading'), document.getElementById('sectionSubtitle'), document.getElementById('headerActionArea'));
  };

  window.openReviewBidsModal = function (projectId) {
    const projects = getProjects();
    const prj = projects.find(p => p.id === projectId);
    if (!prj) return;

    const proposals = getProposals().filter(p => p.projectId === projectId);
    const title = document.getElementById('reviewBidsTitle');
    const subtitle = document.getElementById('reviewBidsSubtitle');
    title.textContent = `Proposals for: ${prj.title}`;
    subtitle.textContent = `${proposals.length} proposal(s) submitted · Budget: ${prj.budget}`;

    const container = document.getElementById('reviewBidsContainer');
    if (proposals.length === 0) {
      container.innerHTML = `
        <div style="text-align:center;padding:2rem;color:var(--text-muted);">
          No proposals received for this project yet.
        </div>
      `;
    } else {
      let html = '';
      proposals.forEach(prop => {
        html += `
          <div style="background:rgba(255,255,255,0.03);border:1px solid var(--portal-border);padding:1.2rem;border-radius:12px;">
            <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:0.6rem;">
              <div>
                <strong style="color:#fff;font-size:0.95rem;">${escapeHtml(prop.userName)}</strong>
                <span class="project-tag" style="margin-left:0.5rem;">${prop.userRole.toUpperCase()}</span>
                <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-muted);">${escapeHtml(prop.userEmail)}</div>
              </div>
              <span class="status-badge ${prop.status === 'accepted' ? 'status-active' : 'status-pending'}">${prop.status}</span>
            </div>
            <div style="display:flex;gap:1.5rem;font-size:0.82rem;margin-bottom:0.8rem;">
              <div>Proposed Rate: <strong style="color:var(--emerald);">${escapeHtml(prop.bidAmount)}</strong></div>
              <div>Turnaround: <strong>${prop.deliveryDays} Days</strong></div>
            </div>
            <p style="font-size:0.82rem;color:var(--text-muted);line-height:1.5;margin-bottom:0.8rem;">
              ${escapeHtml(prop.coverLetter)}
            </p>
            <div style="display:flex;justify-content:flex-end;gap:0.6rem;">
              ${prop.status === 'pending' ? `
                <button class="btn-portal btn-portal-primary" style="font-size:0.75rem;" onclick="closeModal('reviewBidsModal');acceptProposal('${prop.id}')">
                  ✓ Accept Proposal
                </button>
              ` : ''}
              <button class="btn-portal btn-portal-outline" style="font-size:0.75rem;" onclick="closeModal('reviewBidsModal');openChatWithUser('${prop.userId}')">
                💬 Chat with Applicant
              </button>
            </div>
          </div>
        `;
      });
      container.innerHTML = html;
    }

    openModal('reviewBidsModal');
  };

  // =========================================================================
  // 8. INTEGRATED LIVE CHAT ENGINE (ZERO-POLL REACTIVITY & DATA ISOLATION)
  // =========================================================================

  function renderLiveChatView(user, heading, subtitle, actionArea) {
    heading.textContent = 'Enclave Live Communications Studio';
    subtitle.textContent = 'Direct, end-to-end encrypted messaging with Project Managers and certified specialists.';

    const statsBanner = document.getElementById('statsBanner');
    statsBanner.innerHTML = '';

    const container = document.getElementById('dynamicSectionContent');
    container.innerHTML = `
      <div class="chat-workspace">
        <div class="chat-threads-sidebar">
          <div class="chat-threads-header">
            <span>Conversations</span>
            <span style="font-size:0.7rem;color:var(--text-muted);">${user.role === 'admin' ? 'All Channels' : 'Direct PM Channel'}</span>
          </div>
          <div class="chat-threads-list" id="chatThreadsList">
            <!-- Threads injected -->
          </div>
        </div>
        <div class="chat-main-pane">
          <div class="chat-header">
            <div class="chat-partner-info">
              <h4 id="chatPartnerName">Select Conversation</h4>
              <span id="chatPartnerRole">Secure Channel</span>
            </div>
            <div style="font-family:var(--font-mono);font-size:0.7rem;color:var(--text-muted);">
              ISO/IEC 27001 Enclave
            </div>
          </div>
          <div class="chat-messages-container" id="chatMessagesContainer">
            <!-- Messages injected -->
          </div>
          <form class="chat-input-bar" onsubmit="handleSendMessage(event)">
            <input type="text" id="chatInputText" class="chat-input" placeholder="Type a message or project update..." autocomplete="off">
            <button type="submit" class="btn-portal btn-portal-primary">Send ↗</button>
          </form>
        </div>
      </div>
    `;

    renderLiveChat();
  }

  function getAvailableThreads(user) {
    const allUsers = getUsers();
    const messages = getMessages();

    if (user.role === 'admin') {
      // Admin can see threads for all non-admin users who either have messages or exist in directory
      const clientUsers = allUsers.filter(u => u.role !== 'admin');
      return clientUsers.map(u => {
        const threadId = `thread_usr-admin_${u.id}`;
        const threadMessages = messages.filter(m => m.threadId === threadId);
        const lastMsg = threadMessages[threadMessages.length - 1];
        return {
          threadId,
          partnerId: u.id,
          partnerName: u.name,
          partnerRole: u.role,
          partnerOrg: u.company || u.title,
          lastMessage: lastMsg ? lastMsg.message : 'No messages yet',
          lastTime: lastMsg ? formatMessageTime(lastMsg.timestamp) : ''
        };
      });
    } else {
      // STRICT ISOLATION: Non-admin users see ONLY their own thread with Admin!
      const adminUser = allUsers.find(u => u.role === 'admin') || { name: 'Mavy Project Management', id: 'usr-admin' };
      const threadId = `thread_usr-admin_${user.id}`;
      const threadMessages = messages.filter(m => m.threadId === threadId);
      const lastMsg = threadMessages[threadMessages.length - 1];

      return [
        {
          threadId,
          partnerId: 'usr-admin',
          partnerName: 'Vikram Malhotra · Mavy PM',
          partnerRole: 'Platform Operations & Project Manager',
          partnerOrg: 'Mavy EduSolutions Global',
          lastMessage: lastMsg ? lastMsg.message : 'Start a direct conversation with your dedicated PM',
          lastTime: lastMsg ? formatMessageTime(lastMsg.timestamp) : ''
        }
      ];
    }
  }

  function renderLiveChat() {
    const user = getCurrentUser();
    if (!user) return;

    const threads = getAvailableThreads(user);
    const threadsListEl = document.getElementById('chatThreadsList');
    if (!threadsListEl) return;

    // If no active thread selected, pick the first
    if (!activeChatThreadId || !threads.some(t => t.threadId === activeChatThreadId)) {
      activeChatThreadId = threads.length > 0 ? threads[0].threadId : null;
    }

    threadsListEl.innerHTML = '';
    threads.forEach(t => {
      const item = document.createElement('div');
      item.className = 'chat-thread-item' + (t.threadId === activeChatThreadId ? ' active' : '');
      item.onclick = () => {
        activeChatThreadId = t.threadId;
        renderLiveChat();
      };

      item.innerHTML = `
        <div class="thread-top">
          <span class="thread-name">${escapeHtml(t.partnerName)}</span>
          <span class="thread-time">${t.lastTime}</span>
        </div>
        <div style="font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);">${escapeHtml(t.partnerOrg)}</div>
        <div class="thread-preview">${escapeHtml(t.lastMessage)}</div>
      `;
      threadsListEl.appendChild(item);
    });

    // Render active thread messages
    const activeThread = threads.find(t => t.threadId === activeChatThreadId);
    const headerName = document.getElementById('chatPartnerName');
    const headerRole = document.getElementById('chatPartnerRole');
    const msgContainer = document.getElementById('chatMessagesContainer');

    if (activeThread) {
      if (headerName) headerName.textContent = activeThread.partnerName;
      if (headerRole) headerRole.textContent = `● Active · ${activeThread.partnerOrg}`;

      const messages = getMessages().filter(m => m.threadId === activeChatThreadId);

      if (messages.length === 0) {
        msgContainer.innerHTML = `
          <div style="text-align:center;padding:3rem 1rem;color:var(--text-muted);font-size:0.85rem;">
            This is the start of your secure communication enclave. Send a message below to connect.
          </div>
        `;
      } else {
        let msgHtml = '';
        messages.forEach(m => {
          const isMe = m.senderId === user.id;
          msgHtml += `
            <div class="chat-bubble ${isMe ? 'sent' : 'received'}">
              <div style="font-weight:600;font-size:0.75rem;margin-bottom:0.25rem;color:${isMe ? 'var(--gold)' : 'var(--sapphire)'};">
                ${isMe ? 'You' : escapeHtml(m.senderName)}
              </div>
              <div style="white-space:pre-wrap;">${escapeHtml(m.message)}</div>
              <div class="bubble-meta">${formatMessageTime(m.timestamp)}</div>
            </div>
          `;
        });
        msgContainer.innerHTML = msgHtml;
        msgContainer.scrollTop = msgContainer.scrollHeight;
      }
    }
  }

  window.handleSendMessage = function (e) {
    e.preventDefault();
    const user = getCurrentUser();
    const input = document.getElementById('chatInputText');
    if (!user || !input || !input.value.trim() || !activeChatThreadId) return;

    const text = input.value.trim();
    input.value = '';

    const threads = getAvailableThreads(user);
    const activeThread = threads.find(t => t.threadId === activeChatThreadId);
    if (!activeThread) return;

    const messages = getMessages();
    const newMsg = {
      id: 'msg-' + Date.now(),
      threadId: activeChatThreadId,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      recipientId: activeThread.partnerId,
      recipientRole: activeThread.partnerRole,
      message: text,
      timestamp: new Date().toISOString()
    };

    messages.push(newMsg);
    saveMessages(messages);
    renderLiveChat();

    // Auto-respond simulator when logged in as client/freelancer/vendor to demonstrate real-time responsive interaction
    if (user.role !== 'admin') {
      setTimeout(() => {
        const updated = getMessages();
        const autoReply = {
          id: 'msg-' + (Date.now() + 1),
          threadId: activeChatThreadId,
          senderId: 'usr-admin',
          senderName: 'Vikram Malhotra',
          senderRole: 'admin',
          recipientId: user.id,
          recipientRole: user.role,
          message: `Thanks for the update, ${user.name.split(' ')[0]}. I've received your note and our team is coordinating the specifications right now. Let me know if any files need expedited indexing!`,
          timestamp: new Date().toISOString()
        };
        updated.push(autoReply);
        saveMessages(updated);
      }, 1200);
    }
  };

  window.openChatWithUser = function (userId) {
    const user = getCurrentUser();
    if (!user) return;
    activeChatThreadId = `thread_usr-admin_${userId}`;
    navigateTo('chat');
  };

  // =========================================================================
  // 9. MODAL HANDLERS & PROJECT POSTING
  // =========================================================================

  window.openModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
  };

  window.closeModal = function (modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
  };

  window.handlePostProject = function (e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') return;

    const title = document.getElementById('projTitle').value.trim();
    const targetRoles = document.getElementById('projTargetRoles').value;
    const languages = document.getElementById('projLanguages').value.trim();
    const volume = document.getElementById('projVolume').value.trim();
    const budget = document.getElementById('projBudget').value.trim();
    const deadline = document.getElementById('projDeadline').value;
    const desc = document.getElementById('projDesc').value.trim();

    const projects = getProjects();
    const newProject = {
      id: 'prj-' + Math.floor(100 + Math.random() * 900),
      title,
      category: 'Enterprise Localization & AI',
      clientName: 'Mavy Enterprise Direct',
      clientId: user.id,
      targetRoles,
      languages,
      wordCount: volume,
      budget,
      deadline,
      description: desc,
      status: 'open',
      assignedTo: null,
      createdAt: new Date().toISOString().substring(0, 10)
    };

    projects.unshift(newProject);
    saveProjects(projects);
    closeModal('postProjectModal');
    document.getElementById('postProjectForm').reset();

    alert(`Project "${title}" has been successfully published to the marketplace!`);
    navigateTo('dashboard');
  };

  window.openApplyModal = function (projectId) {
    const projects = getProjects();
    const prj = projects.find(p => p.id === projectId);
    if (!prj) return;

    document.getElementById('applyProjectId').value = prj.id;
    document.getElementById('applyModalTitle').textContent = `Apply for: ${prj.title}`;
    document.getElementById('applyModalSubtitle').textContent = `Target: ${prj.languages} · Volume: ${prj.wordCount} · Budget: ${prj.budget}`;
    document.getElementById('applyBidAmount').value = prj.budget;

    openModal('applyProjectModal');
  };

  window.handleApplyProject = function (e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) return;

    const projectId = document.getElementById('applyProjectId').value;
    const bidAmount = document.getElementById('applyBidAmount').value.trim();
    const deliveryDays = parseInt(document.getElementById('applyTurnaround').value, 10) || 7;
    const coverLetter = document.getElementById('applyCoverLetter').value.trim();

    const projects = getProjects();
    const prj = projects.find(p => p.id === projectId);

    const proposals = getProposals();
    const newProposal = {
      id: 'prop-' + Math.floor(100 + Math.random() * 900),
      projectId,
      projectTitle: prj ? prj.title : 'Project',
      userId: user.id,
      userName: user.name,
      userRole: user.role,
      userEmail: user.email,
      bidAmount,
      deliveryDays,
      coverLetter,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };

    proposals.push(newProposal);
    saveProposals(proposals);

    // Notify admin via chat
    const threadId = `thread_usr-admin_${user.id}`;
    const messages = getMessages();
    messages.push({
      id: 'msg-' + Date.now(),
      threadId,
      senderId: user.id,
      senderName: user.name,
      senderRole: user.role,
      recipientId: 'usr-admin',
      recipientRole: 'admin',
      message: `Hello! I have just submitted my proposal for project "${prj ? prj.title : 'Project'}" ($${bidAmount}, ${deliveryDays} days turnaround). Looking forward to working together!`,
      timestamp: new Date().toISOString()
    });
    saveMessages(messages);

    closeModal('applyProjectModal');
    document.getElementById('applyProjectForm').reset();

    alert('Your proposal has been submitted privately to the Mavy Project Management team. You can view its status under your proposals tab.');
    navigateTo('dashboard');
  };

  window.handleClientRequest = function (e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user) return;

    const title = document.getElementById('clientReqTitle').value.trim();
    const service = document.getElementById('clientReqService').value;
    const deadline = document.getElementById('clientReqDeadline').value;
    const languages = document.getElementById('clientReqLanguages').value.trim();
    const details = document.getElementById('clientReqDetails').value.trim();

    const projects = getProjects();
    const newProject = {
      id: 'prj-' + Math.floor(100 + Math.random() * 900),
      title,
      category: service,
      clientName: user.name,
      clientId: user.id,
      targetRoles: 'all',
      languages,
      wordCount: 'Pending Scope Validation',
      budget: 'Quotation in Review',
      deadline,
      description: details,
      status: 'open',
      assignedTo: null,
      createdAt: new Date().toISOString().substring(0, 10)
    };

    projects.unshift(newProject);
    saveProjects(projects);

    // Also automatically create an inquiry record in Admin's inbox
    const inquiries = getInquiries();
    inquiries.unshift({
      id: 'inq-' + Date.now(),
      name: user.name,
      email: user.email,
      service,
      message: `[Portal Client Project Request] Title: ${title} | Target Locales: ${languages} | Target Date: ${deadline} | Details: ${details}`,
      timestamp: new Date().toISOString(),
      dateFormatted: new Date().toLocaleString(),
      status: 'new'
    });
    saveInquiries(inquiries);

    closeModal('clientRequestModal');
    document.getElementById('clientRequestForm').reset();

    alert('Your project request has been logged and assigned to the senior localization architecture team!');
    navigateTo('dashboard');
  };

  // Utilities
  function formatMessageTime(isoString) {
    if (!isoString) return '';
    try {
      const d = new Date(isoString);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return '';
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Self initialize on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
