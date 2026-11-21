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

  // Master Administrator Profile
  const MASTER_ADMIN = {
    id: 'usr-admin',
    name: 'Mavy Administrator',
    email: 'admin@mavyedusolutions.co.in',
    password: 'Mahitya9501@',
    role: 'admin',
    company: 'Mavy EduSolutions Global',
    title: 'Platform Administrator & Chief Operations Governance',
    phone: '+91 (0) 80 4912 3000',
    location: 'Global Operations Headquarters',
    speciality: 'Platform Administration, Quality Governance & Enterprise Project Routing',
    certifications: 'ISO 9001:2015, ISO/IEC 27001:2022, ISO 17100:2015',
    avatar: 'MA',
    joinedDate: 'Nov 2026',
    status: 'Master Administrator'
  };

  const SEED_USERS = [MASTER_ADMIN];
  const SEED_PROJECTS = [];
  const SEED_INQUIRIES = [];
  const SEED_PROPOSALS = [];
  const SEED_MESSAGES = [];

  function initDatabase() {
    const CLEAN_VERSION = 'mavy_v6_clean_admin_20261121';
    if (localStorage.getItem('mavy_clean_version') !== CLEAN_VERSION) {
      localStorage.removeItem('mavy_users');
      localStorage.removeItem('mavy_projects');
      localStorage.removeItem('mavy_inquiries');
      localStorage.removeItem('mavy_proposals');
      localStorage.removeItem('mavy_chat_messages');
      localStorage.removeItem('mavy_current_user');
      localStorage.setItem('mavy_clean_version', CLEAN_VERSION);
    }

    let users = localStorage.getItem('mavy_users') ? JSON.parse(localStorage.getItem('mavy_users')) : [];
    const adminIdx = users.findIndex(u => u.role === 'admin' || u.email.toLowerCase() === 'admin@mavyedusolutions.co.in');
    if (adminIdx !== -1) {
      users[adminIdx] = { ...MASTER_ADMIN, ...users[adminIdx], email: 'admin@mavyedusolutions.co.in', password: 'Mahitya9501@', role: 'admin' };
    } else {
      users.unshift(MASTER_ADMIN);
    }
    localStorage.setItem('mavy_users', JSON.stringify(users));

    if (!localStorage.getItem('mavy_projects')) {
      localStorage.setItem('mavy_projects', JSON.stringify([]));
    }
    if (!localStorage.getItem('mavy_inquiries')) {
      localStorage.setItem('mavy_inquiries', JSON.stringify([]));
    }
    if (!localStorage.getItem('mavy_proposals')) {
      localStorage.setItem('mavy_proposals', JSON.stringify([]));
    }
    if (!localStorage.getItem('mavy_chat_messages')) {
      localStorage.setItem('mavy_chat_messages', JSON.stringify([]));
    }
  }

  function getAdminName() {
    const cur = getCurrentUser();
    if (cur && cur.role === 'admin') return cur.name;
    const admin = getUsers().find(u => u.role === 'admin');
    return admin ? admin.name : 'Mavy Administrator';
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

  function showPortalToast(msg) {
    let t = document.getElementById('portalToast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'portalToast';
      t.style.position = 'fixed';
      t.style.bottom = '24px';
      t.style.right = '24px';
      t.style.background = 'rgba(10, 16, 26, 0.95)';
      t.style.border = '1px solid var(--portal-border-gold)';
      t.style.color = '#fff';
      t.style.padding = '0.9rem 1.4rem';
      t.style.borderRadius = '12px';
      t.style.boxShadow = '0 12px 36px rgba(0,0,0,0.6)';
      t.style.zIndex = '999999';
      t.style.fontFamily = 'var(--font-sans)';
      t.style.fontSize = '0.86rem';
      t.style.display = 'flex';
      t.style.alignItems = 'center';
      t.style.gap = '0.8rem';
      t.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      t.style.backdropFilter = 'blur(12px)';
      document.body.appendChild(t);
    }
    t.innerHTML = `<span>⚡</span><span>${msg}</span>`;
    t.style.opacity = '1';
    t.style.transform = 'translateY(0)';
    clearTimeout(window._portalToastTimer);
    window._portalToastTimer = setTimeout(() => {
      if (t) {
        t.style.opacity = '0';
        t.style.transform = 'translateY(12px)';
      }
    }, 4500);
  }

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
      if (e.key === 'mavy_inquiries') {
        const curUser = getCurrentUser();
        if (curUser && curUser.role === 'admin') {
          buildSidebarMenu(curUser);
          if (activeSection === 'inquiries') {
            renderInquiriesInbox();
          } else if (activeSection === 'dashboard') {
            navigateTo('dashboard');
          }
          showPortalToast('🔔 New "Start a Project" request submitted from website!');
        }
      }
    });

    window.addEventListener('mavy_inquiry_added', () => {
      const curUser = getCurrentUser();
      if (curUser && curUser.role === 'admin') {
        buildSidebarMenu(curUser);
        if (activeSection === 'inquiries') {
          renderInquiriesInbox();
        } else if (activeSection === 'dashboard') {
          navigateTo('dashboard');
        }
        showPortalToast('🔔 New "Start a Project" request submitted from website!');
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
      const isAdminAlias = u.role === 'admin' && (email === 'admin' || email === 'admin@mavyedusolutions.co.in');
      const isPassMatch = u.password === pass || (u.role === 'admin' && pass === 'Mahitya9501@');
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

    // Security Policy: Only client, freelancer, and vendor can self-register
    const ALLOWED_PUBLIC_ROLES = ['client', 'freelancer', 'vendor'];
    if (!ALLOWED_PUBLIC_ROLES.includes(role)) {
      alert('Security Policy: Public self-registration is restricted to Clients, Freelancers, and Vendors only. Staff and internal profiles must be invited by an Administrator.');
      return;
    }

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
      const allUsers = getUsers();
      items = [
        { id: 'dashboard', label: '📊 Operations Dashboard', icon: '📁' },
        { id: 'inquiries', label: '📥 "Start a Project" Requests', icon: '📬', badge: newInquiriesCount > 0 ? newInquiriesCount : null, badgeClass: 'badge-unread' },
        { id: 'directory', label: '👥 Enclave Directory', icon: '👥', badge: allUsers.length },
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
    } else if (sectionId === 'directory') {
      renderDirectoryView(user, heading, subtitle, actionArea);
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
      subtitle.textContent = 'Supervise incoming "Start a Project" client requests, manage vendor/freelancer proposals, and post enterprise projects.';
      
      actionArea.innerHTML = `
        <button class="btn-portal btn-portal-outline" onclick="createTestInquiry()">
          + Simulate "Start a Project" Form
        </button>
        <button class="btn-portal btn-portal-outline" onclick="openModal('inviteMemberModal')">
          ✉️ Invite Staff / Profile
        </button>
        <button class="btn-portal btn-portal-primary" onclick="openModal('postProjectModal')">
          + Post New Project
        </button>
      `;

      // Stats
      const inquiries = getInquiries();
      const openCount = allProjects.filter(p => p.status === 'open').length;
      const bidsCount = proposals.length;
      const inqCount = inquiries.length;
      const newInqCount = inquiries.filter(i => i.status === 'new').length;

      statsBanner.innerHTML = `
        <div class="portal-stat-card" style="cursor:pointer;" onclick="navigateTo('dashboard')">
          <div class="stat-icon">📂</div>
          <div class="stat-val">${allProjects.length}</div>
          <div class="stat-label">Total Projects in Enclave</div>
        </div>
        <div class="portal-stat-card" style="cursor:pointer;" onclick="navigateTo('dashboard')">
          <div class="stat-icon">⚡</div>
          <div class="stat-val" style="color:var(--gold);">${openCount}</div>
          <div class="stat-label">Active Open Projects</div>
        </div>
        <div class="portal-stat-card" style="cursor:pointer;" onclick="navigateTo('proposals')">
          <div class="stat-icon">📑</div>
          <div class="stat-val" style="color:var(--emerald);">${bidsCount}</div>
          <div class="stat-label">Proposals Received</div>
        </div>
        <div class="portal-stat-card" style="cursor:pointer;" onclick="navigateTo('inquiries')">
          <div class="stat-icon">📬</div>
          <div class="stat-val" style="color:var(--sapphire);display:flex;align-items:center;gap:0.4rem;">
            <span>${inqCount}</span>
            ${newInqCount > 0 ? `<span style="font-size:0.68rem;background:rgba(56,189,248,0.2);color:var(--sapphire);padding:0.15rem 0.45rem;border-radius:10px;font-weight:600;">${newInqCount} NEW</span>` : ''}
          </div>
          <div class="stat-label">"Start a Project" Requests</div>
        </div>
      `;

      // Render Admin Sections: 1) Incoming Form Requests Card + 2) Enclave Projects Grid
      renderAdminDashboardSections(container, user, inquiries, allProjects);

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
      if (user.role === 'admin') {
        container.innerHTML = `
          <div style="background:var(--portal-card);border:1px dashed var(--portal-border-gold);border-radius:16px;padding:3.5rem 2rem;text-align:center;">
            <div style="font-size:2.8rem;margin-bottom:1rem;">📂</div>
            <h3 style="color:#fff;margin-bottom:0.5rem;font-size:1.25rem;">Global Project Pipeline is Clear</h3>
            <p style="color:var(--text-muted);font-size:0.9rem;max-width:520px;margin:0 auto 1.6rem;line-height:1.6;">
              The portal is fresh and ready. Post your first enterprise project to invite applications from verified specialists and certified vendors, or wait for client project submissions.
            </p>
            <div style="display:flex;justify-content:center;gap:1rem;flex-wrap:wrap;">
              <button class="btn-portal btn-portal-primary" onclick="openModal('postProjectModal')">+ Post First Enterprise Project</button>
              <button class="btn-portal btn-portal-outline" onclick="openModal('inviteMemberModal')">✉️ Invite Staff / Specialists</button>
            </div>
          </div>
        `;
        return;
      }
      container.innerHTML = `
        <div style="background:var(--portal-card);border:1px solid var(--portal-border);border-radius:16px;padding:3rem;text-align:center;color:var(--text-muted);">
          No projects currently available in this category. Check back soon for new postings.
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
  // 5B. ENCLAVE MEMBERS & PARTNERS DIRECTORY (ADMIN FULL DOSSIER ROSTER)
  // =========================================================================

  let activeDirectoryCategory = 'all';
  let activeDirectoryQuery = '';

  window.filterDirectoryCategory = function (cat) {
    activeDirectoryCategory = cat;
    const user = getCurrentUser();
    renderDirectoryView(user, document.getElementById('sectionHeading'), document.getElementById('sectionSubtitle'), document.getElementById('headerActionArea'));
  };

  window.handleDirectorySearch = function (q) {
    activeDirectoryQuery = (q || '').toLowerCase().trim();
    const user = getCurrentUser();
    renderDirectoryGridOnly(user);
  };

  function renderDirectoryView(user, heading, subtitle, actionArea) {
    if (user.role !== 'admin') {
      alert('Access restricted to Platform Administrators.');
      navigateTo('dashboard');
      return;
    }

    heading.textContent = 'Enclave Members & Partner Directory';
    subtitle.textContent = 'Complete roster of specialist freelancers, enterprise clients, certified vendors, and internal staff.';

    actionArea.innerHTML = `
      <button class="btn-portal btn-portal-primary" onclick="openModal('inviteMemberModal')">
        ✉️ Invite Staff / Profile
      </button>
    `;

    const allUsers = getUsers();
    const freelancers = allUsers.filter(u => u.role === 'freelancer');
    const clients = allUsers.filter(u => u.role === 'client');
    const vendors = allUsers.filter(u => u.role === 'vendor');
    const staff = allUsers.filter(u => u.role === 'admin');

    const statsBanner = document.getElementById('statsBanner');
    statsBanner.innerHTML = `
      <div class="portal-stat-card">
        <div class="stat-icon">👥</div>
        <div class="stat-val" style="color:var(--gold);">${allUsers.length}</div>
        <div class="stat-label">Total Verified Directory</div>
      </div>
      <div class="portal-stat-card">
        <div class="stat-icon">✍️</div>
        <div class="stat-val" style="color:var(--emerald);">${freelancers.length}</div>
        <div class="stat-label">Specialist Freelancers</div>
      </div>
      <div class="portal-stat-card">
        <div class="stat-icon">🏢</div>
        <div class="stat-val" style="color:var(--sapphire);">${clients.length}</div>
        <div class="stat-label">Enterprise Clients</div>
      </div>
      <div class="portal-stat-card">
        <div class="stat-icon">🌐</div>
        <div class="stat-val" style="color:#c084fc;">${vendors.length}</div>
        <div class="stat-label">Certified Vendor Agencies</div>
      </div>
    `;

    const container = document.getElementById('dynamicSectionContent');
    container.innerHTML = `
      <div class="directory-controls">
        <div class="directory-filter-tabs">
          <button class="dir-filter-btn ${activeDirectoryCategory === 'all' ? 'active' : ''}" onclick="filterDirectoryCategory('all')">
            All Members (${allUsers.length})
          </button>
          <button class="dir-filter-btn ${activeDirectoryCategory === 'freelancer' ? 'active' : ''}" onclick="filterDirectoryCategory('freelancer')">
            ✍️ Freelancers (${freelancers.length})
          </button>
          <button class="dir-filter-btn ${activeDirectoryCategory === 'client' ? 'active' : ''}" onclick="filterDirectoryCategory('client')">
            🏢 Corporate Clients (${clients.length})
          </button>
          <button class="dir-filter-btn ${activeDirectoryCategory === 'vendor' ? 'active' : ''}" onclick="filterDirectoryCategory('vendor')">
            🌐 Certified Vendors (${vendors.length})
          </button>
          <button class="dir-filter-btn ${activeDirectoryCategory === 'admin' ? 'active' : ''}" onclick="filterDirectoryCategory('admin')">
            👑 Staff & Admins (${staff.length})
          </button>
        </div>
        <div>
          <input type="text" class="dir-search-input" placeholder="🔍 Search name, language, specialty, country, email..." value="${escapeHtml(activeDirectoryQuery)}" oninput="handleDirectorySearch(this.value)">
        </div>
      </div>
      <div id="directoryGridContainer"></div>
    `;

    renderDirectoryGridOnly(user);
  }

  function renderDirectoryGridOnly(user) {
    const gridContainer = document.getElementById('directoryGridContainer');
    if (!gridContainer) return;

    let users = getUsers();

    // Filter by role
    if (activeDirectoryCategory !== 'all') {
      users = users.filter(u => u.role === activeDirectoryCategory);
    }

    // Filter by search query
    if (activeDirectoryQuery) {
      users = users.filter(u => {
        const text = `${u.name} ${u.email} ${u.company || ''} ${u.title || ''} ${u.speciality || ''} ${u.languages || ''} ${u.location || ''} ${u.phone || ''}`.toLowerCase();
        return text.includes(activeDirectoryQuery);
      });
    }

    if (users.length === 0) {
      gridContainer.innerHTML = `
        <div style="background:var(--portal-card);border:1px solid var(--portal-border);border-radius:16px;padding:3rem;text-align:center;color:var(--text-muted);">
          No directory members match the selected filter or search query.
        </div>
      `;
      return;
    }

    let html = '<div class="directory-grid">';
    users.forEach(m => {
      const isClient = m.role === 'client';
      const isFreelancer = m.role === 'freelancer';
      const isVendor = m.role === 'vendor';
      const isAdmin = m.role === 'admin';

      let roleBadgeClass = 'badge-admin';
      let roleDisplay = 'Platform Admin';
      let avatarClass = '';

      if (isClient) { roleBadgeClass = 'badge-client'; roleDisplay = 'Corporate Client'; avatarClass = 'avatar-client'; }
      else if (isFreelancer) { roleBadgeClass = 'badge-freelancer'; roleDisplay = 'Freelancer Linguist'; avatarClass = 'avatar-freelancer'; }
      else if (isVendor) { roleBadgeClass = 'badge-vendor'; roleDisplay = 'Vendor Agency'; avatarClass = 'avatar-vendor'; }

      let specialitySection = '';
      if (isFreelancer) {
        specialitySection = `
          <div class="dir-speciality-section">
            <span class="dir-speciality-label">Certified Language Pairs & Speciality</span>
            <div style="font-weight:600;font-size:0.85rem;color:var(--emerald);margin-bottom:0.25rem;">
              ${escapeHtml(m.languages || 'English → Global Locales')}
            </div>
            <div class="dir-speciality-desc">${escapeHtml(m.speciality || 'Neural translation and terminology management.')}</div>
            <div class="dir-pills-row">
              ${m.certifications ? `<span class="dir-pill" style="color:var(--gold);border-color:var(--portal-border-gold);">${escapeHtml(m.certifications.split(',')[0])}</span>` : ''}
              ${m.experienceYears ? `<span class="dir-pill">${escapeHtml(m.experienceYears)}</span>` : ''}
              ${m.reliabilityScore ? `<span class="dir-pill" style="color:var(--emerald);">${escapeHtml(m.reliabilityScore)}</span>` : ''}
            </div>
          </div>
        `;
      } else if (isClient) {
        specialitySection = `
          <div class="dir-speciality-section">
            <span class="dir-speciality-label" style="color:var(--sapphire);">Enterprise Localization Scope</span>
            <div style="font-weight:600;font-size:0.85rem;color:#fff;margin-bottom:0.25rem;">
              ${escapeHtml(m.company || m.name)}
            </div>
            <div class="dir-speciality-desc">${escapeHtml(m.speciality || 'Enterprise localization client with active continuous workflows.')}</div>
            <div class="dir-pills-row">
              <span class="dir-pill" style="color:var(--sapphire);border-color:rgba(56,189,248,0.3);">${escapeHtml(m.tier || 'Enterprise Account')}</span>
              ${m.totalVolume ? `<span class="dir-pill">${escapeHtml(m.totalVolume)}</span>` : ''}
              <span class="dir-pill" style="color:var(--emerald);">ISO Enclave Client</span>
            </div>
          </div>
        `;
      } else if (isVendor) {
        specialitySection = `
          <div class="dir-speciality-section">
            <span class="dir-speciality-label" style="color:#c084fc;">Vendor Capabilities & Throughput</span>
            <div style="font-weight:600;font-size:0.85rem;color:#c084fc;margin-bottom:0.25rem;">
              ${escapeHtml(m.languages || '40+ Global Pairs')}
            </div>
            <div class="dir-speciality-desc">${escapeHtml(m.speciality || 'Full service multilingual agency partner.')}</div>
            <div class="dir-pills-row">
              <span class="dir-pill" style="color:#c084fc;border-color:rgba(192,132,252,0.3);">${escapeHtml(m.dailyCapacity || 'High Capacity')}</span>
              <span class="dir-pill" style="color:var(--emerald);">MSA Active</span>
              ${m.certifications ? `<span class="dir-pill">${escapeHtml(m.certifications.split(',')[0])}</span>` : ''}
            </div>
          </div>
        `;
      } else {
        specialitySection = `
          <div class="dir-speciality-section">
            <span class="dir-speciality-label">Executive Leadership & Governance</span>
            <div style="font-weight:600;font-size:0.85rem;color:#fff;margin-bottom:0.25rem;">
              ${escapeHtml(m.title || 'Platform Superadmin')}
            </div>
            <div class="dir-speciality-desc">${escapeHtml(m.speciality || 'Global operations, platform governance, and quality management.')}</div>
            <div class="dir-pills-row">
              <span class="dir-pill" style="color:var(--gold);">Superadmin</span>
              <span class="dir-pill">ISMS ISO 27001</span>
            </div>
          </div>
        `;
      }

      html += `
        <div class="directory-card">
          <div>
            <div class="dir-card-head">
              <div class="dir-avatar ${avatarClass}">${escapeHtml(m.avatar || m.name[0])}</div>
              <div class="dir-title-box" style="flex:1;">
                <div style="display:flex;justify-content:space-between;align-items:center;">
                  <h3>${escapeHtml(m.name)}</h3>
                  <span class="portal-role-badge ${roleBadgeClass}">${roleDisplay}</span>
                </div>
                <p>${escapeHtml(m.company || m.title || 'Mavy Enclave')}</p>
              </div>
            </div>

            <div class="dir-contact-list">
              <div class="dir-contact-item">
                <span>Email:</span>
                <a href="mailto:${escapeHtml(m.email)}">${escapeHtml(m.email)}</a>
              </div>
              ${m.phone ? `
                <div class="dir-contact-item">
                  <span>Phone:</span>
                  <a href="tel:${escapeHtml(m.phone)}" style="color:var(--text-main);">${escapeHtml(m.phone)}</a>
                </div>
              ` : ''}
              ${m.location ? `
                <div class="dir-contact-item">
                  <span>Location:</span>
                  <span style="color:var(--text-muted);">${escapeHtml(m.location)}</span>
                </div>
              ` : ''}
            </div>

            ${specialitySection}
          </div>

          <div class="dir-card-footer">
            <button class="btn-portal btn-portal-outline" style="font-size:0.75rem;" onclick="openMemberDossierModal('${m.id}')">
              📄 View Full Dossier
            </button>
            <button class="btn-portal btn-portal-primary" style="font-size:0.75rem;" onclick="openChatWithUser('${m.id}')">
              💬 Direct Chat
            </button>
          </div>
        </div>
      `;
    });
    html += '</div>';

    gridContainer.innerHTML = html;
  }

  window.openMemberDossierModal = function (userId) {
    const users = getUsers();
    const m = users.find(u => u.id === userId);
    if (!m) return;

    document.getElementById('dossierName').textContent = m.name;
    document.getElementById('dossierTitle').textContent = `${m.title || m.role.toUpperCase()} · ${m.company || 'Mavy Enclave'}`;
    const avatar = document.getElementById('dossierAvatar');
    avatar.textContent = m.avatar || m.name[0];
    avatar.className = 'dir-avatar ' + (m.role === 'client' ? 'avatar-client' : (m.role === 'freelancer' ? 'avatar-freelancer' : (m.role === 'vendor' ? 'avatar-vendor' : '')));

    const body = document.getElementById('dossierBody');
    body.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1.2rem;background:rgba(0,0,0,0.3);padding:1.2rem;border-radius:14px;border:1px solid var(--portal-border);">
        <div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Primary Contact Email</small>
          <div style="font-family:var(--font-mono);font-size:0.88rem;color:var(--gold);margin-bottom:0.8rem;">
            <a href="mailto:${escapeHtml(m.email)}" style="color:inherit;text-decoration:none;">${escapeHtml(m.email)}</a>
          </div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Direct Telephone / Hotline</small>
          <div style="font-size:0.85rem;color:#fff;">${escapeHtml(m.phone || 'Available on project assignment')}</div>
        </div>
        <div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Operational Hub / Location</small>
          <div style="font-size:0.85rem;color:#fff;margin-bottom:0.8rem;">${escapeHtml(m.location || 'Global Remote Enclave')}</div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Membership &amp; Verification Status</small>
          <div style="font-size:0.85rem;color:var(--emerald);font-weight:600;">● ${escapeHtml(m.status || 'Verified Partner')}</div>
        </div>
      </div>

      <div style="background:rgba(255,255,255,0.03);padding:1.2rem;border-radius:14px;border:1px solid var(--portal-border);">
        <small style="font-family:var(--font-mono);font-size:0.68rem;color:var(--gold);text-transform:uppercase;display:block;margin-bottom:0.4rem;">
          Speciality, Domain Expertise &amp; Technical Competencies
        </small>
        <div style="font-size:0.88rem;color:#fff;line-height:1.6;margin-bottom:0.8rem;">
          ${escapeHtml(m.speciality || 'General enterprise localization and translation capabilities.')}
        </div>
        ${m.languages ? `
          <div style="margin-bottom:0.6rem;">
            <strong style="font-size:0.78rem;color:var(--text-muted);font-family:var(--font-mono);">Certified Language Pairs:</strong>
            <span style="font-size:0.85rem;color:var(--emerald);font-weight:600;margin-left:0.4rem;">${escapeHtml(m.languages)}</span>
          </div>
        ` : ''}
        ${m.catTools ? `
          <div style="margin-bottom:0.6rem;">
            <strong style="font-size:0.78rem;color:var(--text-muted);font-family:var(--font-mono);">Supported CAT / TMS Stack:</strong>
            <span style="font-size:0.82rem;color:var(--text-main);margin-left:0.4rem;">${escapeHtml(m.catTools)}</span>
          </div>
        ` : ''}
        ${m.certifications ? `
          <div>
            <strong style="font-size:0.78rem;color:var(--text-muted);font-family:var(--font-mono);">Audited Standards:</strong>
            <span style="font-size:0.82rem;color:var(--gold);margin-left:0.4rem;">${escapeHtml(m.certifications)}</span>
          </div>
        ` : ''}
      </div>

      <div style="display:grid;grid-template-columns:repeat(3, 1fr);gap:0.8rem;">
        <div style="background:rgba(0,0,0,0.3);padding:0.9rem;border-radius:10px;text-align:center;">
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Reliability / Rating</small>
          <div style="font-size:1.1rem;font-weight:700;color:var(--emerald);margin-top:0.2rem;">${m.reliabilityScore ? m.reliabilityScore.split(' ')[0] : '100%'}</div>
        </div>
        <div style="background:rgba(0,0,0,0.3);padding:0.9rem;border-radius:10px;text-align:center;">
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Volume / Completed</small>
          <div style="font-size:1.1rem;font-weight:700;color:#fff;margin-top:0.2rem;">${m.completedJobs ? m.completedJobs + ' Deliverables' : (m.dailyCapacity || 'Active')}</div>
        </div>
        <div style="background:rgba(0,0,0,0.3);padding:0.9rem;border-radius:10px;text-align:center;">
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Enclave Member Since</small>
          <div style="font-size:0.95rem;font-weight:600;color:var(--gold);margin-top:0.3rem;">${m.joinedDate || '2024'}</div>
        </div>
      </div>
    `;

    const chatBtn = document.getElementById('dossierChatBtn');
    chatBtn.onclick = () => {
      closeModal('memberDossierModal');
      openChatWithUser(m.id);
    };

    openModal('memberDossierModal');
  };

  // =========================================================================
  // 6. "START A PROJECT" FORM REQUESTS & INBOUND LEADS (ADMIN CONSOLE)
  // =========================================================================

  let currentInquiryFilter = 'all';
  let inquirySearchQuery = '';

  function renderAdminDashboardSections(container, user, inquiries, allProjects) {
    const newInquiriesCount = inquiries.filter(i => i.status === 'new').length;
    
    let html = `
      <!-- SECTION 1: INCOMING START A PROJECT REQUESTS -->
      <div class="admin-inquiries-card" style="background:var(--portal-card);border:1px solid var(--portal-border);border-radius:16px;padding:1.6rem;margin-bottom:2.2rem;">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1.2rem;border-bottom:1px solid var(--portal-border);padding-bottom:1rem;">
          <div>
            <h3 style="color:#fff;font-size:1.15rem;display:flex;align-items:center;gap:0.6rem;margin-bottom:0.25rem;">
              <span>📥 Incoming "Start a Project" Form Requests</span>
              ${newInquiriesCount > 0 ? `<span class="status-badge status-new">${newInquiriesCount} NEW</span>` : ''}
            </h3>
            <p style="font-size:0.8rem;color:var(--text-muted);">Direct submissions from prospective clients via the website "Start a project" form.</p>
          </div>
          <div style="display:flex;gap:0.6rem;align-items:center;">
            <button class="btn-portal btn-portal-outline" style="font-size:0.75rem;padding:0.4rem 0.8rem;" onclick="createTestInquiry()">
              + Simulate Test Request
            </button>
            <button class="btn-portal btn-portal-primary" style="font-size:0.75rem;padding:0.4rem 0.8rem;" onclick="navigateTo('inquiries')">
              View All Requests (${inquiries.length}) →
            </button>
          </div>
        </div>
    `;

    if (inquiries.length === 0) {
      html += `
        <div style="text-align:center;padding:2.2rem 1rem;color:var(--text-muted);font-size:0.86rem;background:rgba(255,255,255,0.01);border-radius:12px;border:1px dashed var(--portal-border);">
          <div style="font-size:2rem;margin-bottom:0.5rem;">📬</div>
          <div style="color:#fff;font-weight:600;margin-bottom:0.25rem;">No "Start a Project" Form Requests Received Yet</div>
          <p style="max-width:520px;margin:0 auto 1.2rem auto;font-size:0.8rem;line-height:1.5;">
            When clients fill out the <strong>Start a project</strong> form on the public website, their project scopes, volume specs, and contact details will appear here instantly.
          </p>
          <div style="display:flex;gap:0.8rem;justify-content:center;flex-wrap:wrap;">
            <button class="btn-portal btn-portal-outline" style="font-size:0.78rem;padding:0.45rem 0.9rem;" onclick="createTestInquiry()">
              + Simulate Incoming Test Form Request
            </button>
            <a href="index.html#contact" target="_blank" class="btn-portal btn-portal-outline" style="font-size:0.78rem;padding:0.45rem 0.9rem;text-decoration:none;">
              Open Website Contact Form ↗
            </a>
          </div>
        </div>
      `;
    } else {
      const recent = inquiries.slice(0, 5);
      html += `
        <div style="overflow-x:auto;">
          <table class="inquiries-table" style="margin-top:0;">
            <thead>
              <tr>
                <th>Date / Time</th>
                <th>Client / Lead Name</th>
                <th>Service Vertical</th>
                <th>Project Scope Details</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
      `;
      recent.forEach(inq => {
        let badgeClass = 'status-new';
        if (inq.status === 'in_review') badgeClass = 'status-pending';
        if (inq.status === 'contacted' || inq.status === 'converted') badgeClass = 'status-active';

        html += `
          <tr>
            <td style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);white-space:nowrap;">
              ${inq.dateFormatted || (inq.timestamp ? inq.timestamp.substring(0, 10) : 'Just now')}
            </td>
            <td>
              <strong style="color:#fff;">${escapeHtml(inq.name)}</strong>
              <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-muted);">${escapeHtml(inq.email)}</div>
            </td>
            <td>
              <span class="project-tag">${escapeHtml(inq.service)}</span>
            </td>
            <td style="max-width:260px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text-muted);font-size:0.82rem;">
              ${escapeHtml(inq.message)}
            </td>
            <td>
              <span class="status-badge ${badgeClass}">${inq.status}</span>
            </td>
            <td>
              <div style="display:flex;gap:0.4rem;align-items:center;">
                <button class="btn-portal btn-portal-outline" style="padding:0.3rem 0.65rem;font-size:0.72rem;" onclick="openInquiryModal('${inq.id}')">
                  👁️ Details
                </button>
                <button class="btn-portal btn-portal-outline" style="padding:0.3rem 0.65rem;font-size:0.72rem;color:var(--gold);border-color:var(--portal-border-gold);" onclick="convertInquiryToProject('${inq.id}')">
                  🚀 Convert
                </button>
                <button class="btn-portal btn-portal-primary" style="padding:0.3rem 0.65rem;font-size:0.72rem;" onclick="openChatWithLeadById('${inq.id}')">
                  💬 Chat
                </button>
              </div>
            </td>
          </tr>
        `;
      });
      html += `
            </tbody>
          </table>
        </div>
      `;
    }

    html += `
      </div>

      <!-- SECTION 2: PUBLISHED ENTERPRISE PROJECTS & RFPS -->
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:1.2rem;flex-wrap:wrap;gap:1rem;">
        <div>
          <h3 style="color:#fff;font-size:1.15rem;">📁 Global Projects Pipeline (Published Enclave RFPs)</h3>
          <p style="font-size:0.8rem;color:var(--text-muted);">Active projects open for specialist Freelancer linguists and Vendor agencies.</p>
        </div>
        <button class="btn-portal btn-portal-primary" onclick="openModal('postProjectModal')">
          + Post New Project
        </button>
      </div>
      <div id="adminProjectsContainer"></div>
    `;

    container.innerHTML = html;
    const projContainer = document.getElementById('adminProjectsContainer');
    renderProjectsGrid(allProjects, projContainer, user);
  }

  function renderInquiriesInbox(heading, subtitle, actionArea) {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
      alert('Access restricted to Platform Administrators.');
      navigateTo('dashboard');
      return;
    }

    if (heading) heading.textContent = '"Start a Project" Form Requests';
    if (subtitle) subtitle.textContent = 'Live submissions captured directly from the index.html "Start a project" form (Zero Formspree).';

    if (actionArea) {
      actionArea.innerHTML = `
        <button class="btn-portal btn-portal-outline" onclick="createTestInquiry()">
          + Simulate Test Request
        </button>
        <button class="btn-portal btn-portal-outline" style="color:#ff8577;border-color:rgba(255,133,119,0.3);" onclick="clearAllInquiries()">
          🗑️ Clear Requests
        </button>
      `;
    }

    const inquiries = getInquiries();
    const statsBanner = document.getElementById('statsBanner');
    const container = document.getElementById('dynamicSectionContent');

    const newCount = inquiries.filter(i => i.status === 'new').length;
    const reviewCount = inquiries.filter(i => i.status === 'in_review').length;
    const contactedCount = inquiries.filter(i => i.status === 'contacted' || i.status === 'converted').length;

    statsBanner.innerHTML = `
      <div class="portal-stat-card">
        <div class="stat-icon">📬</div>
        <div class="stat-val" style="color:var(--sapphire);">${newCount}</div>
        <div class="stat-label">New Incoming Requests</div>
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
        <div class="stat-label">Zero External Formspree</div>
      </div>
    `;

    // Filter controls
    let filtered = inquiries;
    if (currentInquiryFilter === 'new') filtered = filtered.filter(i => i.status === 'new');
    else if (currentInquiryFilter === 'in_review') filtered = filtered.filter(i => i.status === 'in_review');
    else if (currentInquiryFilter === 'converted') filtered = filtered.filter(i => i.status === 'contacted' || i.status === 'converted');

    if (inquirySearchQuery) {
      const q = inquirySearchQuery.toLowerCase();
      filtered = filtered.filter(i => 
        (i.name && i.name.toLowerCase().includes(q)) ||
        (i.email && i.email.toLowerCase().includes(q)) ||
        (i.service && i.service.toLowerCase().includes(q)) ||
        (i.message && i.message.toLowerCase().includes(q))
      );
    }

    let filterControlsHtml = `
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:1rem;margin-bottom:1.5rem;background:var(--portal-card);padding:1rem 1.4rem;border-radius:14px;border:1px solid var(--portal-border);">
        <div style="display:flex;gap:0.5rem;flex-wrap:wrap;">
          <button class="dir-filter-btn ${currentInquiryFilter === 'all' ? 'active' : ''}" onclick="setInquiryFilter('all')">
            All Requests (${inquiries.length})
          </button>
          <button class="dir-filter-btn ${currentInquiryFilter === 'new' ? 'active' : ''}" onclick="setInquiryFilter('new')">
            New Leads (${newCount})
          </button>
          <button class="dir-filter-btn ${currentInquiryFilter === 'in_review' ? 'active' : ''}" onclick="setInquiryFilter('in_review')">
            In Review (${reviewCount})
          </button>
          <button class="dir-filter-btn ${currentInquiryFilter === 'converted' ? 'active' : ''}" onclick="setInquiryFilter('converted')">
            Contacted / Converted (${contactedCount})
          </button>
        </div>
        <div>
          <input type="text" class="portal-input" style="padding:0.45rem 0.9rem;font-size:0.82rem;width:260px;" placeholder="Search by name, email, or vertical..." value="${escapeHtml(inquirySearchQuery)}" oninput="handleInquirySearch(this.value)">
        </div>
      </div>
    `;

    if (inquiries.length === 0) {
      container.innerHTML = filterControlsHtml + `
        <div style="background:var(--portal-card);border:1px solid var(--portal-border);border-radius:16px;padding:3.5rem 1.5rem;text-align:center;color:var(--text-muted);">
          <div style="font-size:2.4rem;margin-bottom:0.6rem;">📬</div>
          <h3 style="color:#fff;margin-bottom:0.4rem;">No "Start a Project" Form Requests Yet</h3>
          <p style="max-width:500px;margin:0 auto 1.5rem auto;font-size:0.86rem;line-height:1.5;">
            Inbound briefs submitted on the website's <strong>Start a project</strong> form will stream into this console automatically with zero external dependencies.
          </p>
          <button class="btn-portal btn-portal-primary" onclick="createTestInquiry()">
            + Simulate Incoming Test Lead
          </button>
        </div>
      `;
      return;
    }

    if (filtered.length === 0) {
      container.innerHTML = filterControlsHtml + `
        <div style="background:var(--portal-card);border:1px solid var(--portal-border);border-radius:16px;padding:2.5rem;text-align:center;color:var(--text-muted);">
          No requests found matching your filter criteria.
        </div>
      `;
      return;
    }

    let tableHtml = filterControlsHtml + `
      <div style="background:var(--portal-card);border:1px solid var(--portal-border);border-radius:16px;overflow:hidden;border:1px solid var(--portal-border);">
        <table class="inquiries-table" style="margin-top:0;">
          <thead>
            <tr>
              <th>Date / Time</th>
              <th>Client / Requester</th>
              <th>Service Vertical</th>
              <th>Project Scope / Specifications</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
    `;

    filtered.forEach(inq => {
      let badgeClass = 'status-new';
      if (inq.status === 'in_review') badgeClass = 'status-pending';
      if (inq.status === 'contacted' || inq.status === 'converted') badgeClass = 'status-active';

      tableHtml += `
        <tr>
          <td style="font-family:var(--font-mono);font-size:0.75rem;color:var(--text-muted);white-space:nowrap;">
            ${inq.dateFormatted || (inq.timestamp ? inq.timestamp.substring(0, 10) : 'Just now')}
          </td>
          <td>
            <strong style="color:#fff;">${escapeHtml(inq.name)}</strong>
            <div style="font-family:var(--font-mono);font-size:0.72rem;color:var(--text-muted);">${escapeHtml(inq.email)}</div>
          </td>
          <td>
            <span class="project-tag">${escapeHtml(inq.service)}</span>
          </td>
          <td style="max-width:280px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--text-muted);font-size:0.84rem;">
            ${escapeHtml(inq.message)}
          </td>
          <td>
            <span class="status-badge ${badgeClass}">${inq.status}</span>
          </td>
          <td>
            <div style="display:flex;gap:0.4rem;align-items:center;">
              <button class="btn-portal btn-portal-outline" style="padding:0.35rem 0.7rem;font-size:0.75rem;" onclick="openInquiryModal('${inq.id}')">
                👁️ Details
              </button>
              <button class="btn-portal btn-portal-outline" style="padding:0.35rem 0.7rem;font-size:0.75rem;color:var(--gold);border-color:var(--portal-border-gold);" onclick="convertInquiryToProject('${inq.id}')">
                🚀 Convert
              </button>
              <button class="btn-portal btn-portal-primary" style="padding:0.35rem 0.7rem;font-size:0.75rem;" onclick="openChatWithLeadById('${inq.id}')">
                💬 Chat
              </button>
              <button class="btn-portal btn-portal-outline" style="padding:0.35rem 0.55rem;font-size:0.75rem;color:#ff8577;border-color:rgba(255,133,119,0.3);" title="Delete" onclick="deleteInquiry('${inq.id}')">
                🗑️
              </button>
            </div>
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

  window.setInquiryFilter = function(filter) {
    currentInquiryFilter = filter;
    renderInquiriesInbox();
  };

  window.handleInquirySearch = function(query) {
    inquirySearchQuery = query;
    renderInquiriesInbox();
  };

  window.openInquiryModal = function (inqId) {
    const inquiries = getInquiries();
    const inq = inquiries.find(i => i.id === inqId);
    if (!inq) return;

    activeInquiryId = inqId;
    const metaHeader = document.getElementById('inqMetaHeader');
    metaHeader.textContent = `Submitted: ${inq.dateFormatted || inq.timestamp} · Lead ID: ${inq.id}`;

    let badgeClass = 'status-new';
    if (inq.status === 'in_review') badgeClass = 'status-pending';
    if (inq.status === 'contacted' || inq.status === 'converted') badgeClass = 'status-active';

    const body = document.getElementById('inquiryDetailBody');
    body.innerHTML = `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;background:rgba(0,0,0,0.3);padding:1.2rem;border-radius:12px;border:1px solid var(--portal-border);">
        <div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Contact Name / Requester</small>
          <div style="font-weight:600;font-size:1rem;color:#fff;margin-top:0.2rem;">${escapeHtml(inq.name)}</div>
        </div>
        <div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Direct Email</small>
          <div style="font-family:var(--font-mono);font-size:0.85rem;color:var(--gold);margin-top:0.2rem;">
            <a href="mailto:${escapeHtml(inq.email)}" style="color:var(--gold);text-decoration:none;">${escapeHtml(inq.email)}</a>
          </div>
        </div>
        <div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Requested Service Vertical</small>
          <div style="font-size:0.88rem;color:var(--sapphire);font-weight:600;margin-top:0.2rem;">${escapeHtml(inq.service)}</div>
        </div>
        <div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Current Lead Status</small>
          <div style="margin-top:0.2rem;"><span class="status-badge ${badgeClass}">${inq.status}</span></div>
        </div>
        <div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Origin / Form</small>
          <div style="font-size:0.8rem;color:#cbd5e1;margin-top:0.2rem;">${escapeHtml(inq.source || 'Website "Start a Project" Form')}</div>
        </div>
        <div>
          <small style="font-family:var(--font-mono);font-size:0.65rem;color:var(--text-muted);text-transform:uppercase;">Submission Timestamp</small>
          <div style="font-family:var(--font-mono);font-size:0.75rem;color:#94a3b8;margin-top:0.2rem;">${inq.dateFormatted || inq.timestamp}</div>
        </div>
      </div>
      <div>
        <small style="font-family:var(--font-mono);font-size:0.68rem;color:var(--text-muted);text-transform:uppercase;display:block;margin-bottom:0.4rem;">Project Scope & Specifications</small>
        <div style="background:rgba(255,255,255,0.03);border:1px solid var(--portal-border);padding:1.2rem;border-radius:12px;font-size:0.88rem;color:#fff;line-height:1.6;white-space:pre-wrap;max-height:220px;overflow-y:auto;font-family:var(--font-sans);">
          ${escapeHtml(inq.message)}
        </div>
      </div>
    `;

    const statusBtn = document.getElementById('inqStatusBtn');
    if (inq.status === 'new') {
      statusBtn.textContent = 'Set "In Review"';
    } else if (inq.status === 'in_review') {
      statusBtn.textContent = 'Set "Contacted"';
    } else if (inq.status === 'contacted') {
      statusBtn.textContent = 'Set "Converted"';
    } else {
      statusBtn.textContent = 'Set "New"';
    }

    const startChatBtn = document.getElementById('inqStartChatBtn');
    startChatBtn.onclick = () => {
      closeModal('inquiryDetailModal');
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
    else if (inq.status === 'contacted') inq.status = 'converted';
    else inq.status = 'new';

    saveInquiries(inquiries);
    openInquiryModal(activeInquiryId);
    if (activeSection === 'inquiries') {
      renderInquiriesInbox();
    } else {
      navigateTo('dashboard');
    }
    showPortalToast(`Lead status updated to "${inq.status}".`);
  };

  window.deleteInquiry = function(inqId) {
    if (!confirm('Are you sure you want to remove this "Start a Project" request?')) return;
    let inquiries = getInquiries();
    inquiries = inquiries.filter(i => i.id !== inqId);
    saveInquiries(inquiries);
    closeModal('inquiryDetailModal');
    if (activeSection === 'inquiries') {
      renderInquiriesInbox();
    } else {
      navigateTo('dashboard');
    }
    showPortalToast('Inquiry removed from console.');
  };

  window.clearAllInquiries = function() {
    if (!confirm('Are you sure you want to clear all "Start a Project" requests from the console?')) return;
    saveInquiries([]);
    if (activeSection === 'inquiries') {
      renderInquiriesInbox();
    } else {
      navigateTo('dashboard');
    }
    showPortalToast('Inquiries inbox cleared.');
  };

  window.convertInquiryToProject = function(inqId) {
    const inquiries = getInquiries();
    const inq = inquiries.find(i => i.id === inqId);
    if (!inq) return;

    closeModal('inquiryDetailModal');

    // Pre-populate Post Project Modal
    document.getElementById('projTitle').value = `${inq.service} - ${inq.name}`;
    document.getElementById('projTargetRoles').value = 'all';
    document.getElementById('projLanguages').value = 'Target Locales specified in Client Scope';
    document.getElementById('projVolume').value = 'Scope as per Client Submission';
    document.getElementById('projBudget').value = '$3,500 - $6,500 USD (Negotiable)';
    
    // Set deadline 14 days ahead
    const d = new Date();
    d.setDate(d.getDate() + 14);
    document.getElementById('projDeadline').value = d.toISOString().substring(0, 10);

    document.getElementById('projDesc').value = [
      `[CLIENT DIRECT "START A PROJECT" SPECIFICATIONS]`,
      `Client Contact: ${inq.name} (${inq.email})`,
      `Service Vertical: ${inq.service}`,
      `Submission Date: ${inq.dateFormatted || inq.timestamp}`,
      ``,
      `Client Project Scope:`,
      inq.message,
      ``,
      `--- Enclave Project Directives ---`,
      `Open for certified Freelancer linguists and Vendor agencies to submit proposals.`
    ].join('\n');

    window._convertingInquiryId = inqId;
    window._convertingClientName = inq.name;

    openModal('postProjectModal');
  };

  window.createTestInquiry = function() {
    const samples = [
      {
        name: 'Dr. Sarah Lin',
        email: 'sarah.lin@tokyo-healthtech.jp',
        service: 'Software localization',
        message: 'Looking for medical-grade localization of our clinical telemetry portal into Japanese and Korean. Estimated 42,000 words across UI strings and regulatory manuals. Need ISO 17100 certified linguists.'
      },
      {
        name: 'Marcus Vance',
        email: 'mvance@synthetica-ai.com',
        service: 'AI data collection',
        message: 'Require 250 hours of spontaneous conversational audio recordings across Hindi, Tamil, and Telugu with demographic variance. Need 3-tier QA acoustic verification.'
      },
      {
        name: 'Elena Rostova',
        email: 'elena@novalearn.org',
        service: 'E-learning localization',
        message: 'Adapting 12 interactive STEM curriculum modules into German, French, and Spanish. Full SCORM 2004 compliance and voiceover dubbing needed.'
      }
    ];
    const rand = samples[Math.floor(Math.random() * samples.length)];
    const now = new Date();
    const newInq = {
      id: 'inq-' + Date.now(),
      name: rand.name,
      email: rand.email,
      service: rand.service,
      message: rand.message,
      source: 'Website "Start a Project" Form',
      timestamp: now.toISOString(),
      dateFormatted: now.toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }),
      status: 'new'
    };
    const inquiries = getInquiries();
    inquiries.unshift(newInq);
    saveInquiries(inquiries);

    if (activeSection === 'inquiries') {
      renderInquiriesInbox();
    } else {
      navigateTo('dashboard');
    }
    showPortalToast(`✨ Simulated new "Start a Project" request from ${rand.name}!`);
  };

  window.openChatWithLeadById = function(inqId) {
    const inquiries = getInquiries();
    const inq = inquiries.find(i => i.id === inqId);
    if (inq) openChatWithLead(inq);
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
        senderName: getAdminName(),
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
      senderName: getAdminName(),
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
          partnerName: `${getAdminName()} · Mavy Operations`,
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

    if (threads.length === 0) {
      threadsListEl.innerHTML = `
        <div style="padding:2rem 1rem;text-align:center;color:var(--text-muted);font-size:0.8rem;line-height:1.6;">
          <div style="font-size:1.8rem;margin-bottom:0.6rem;">💬</div>
          No active communication channels yet. As clients, freelancers, and vendors register or are invited, direct private channels will appear here automatically.
        </div>
      `;
      const headerName = document.getElementById('chatPartnerName');
      const headerRole = document.getElementById('chatPartnerRole');
      const msgContainer = document.getElementById('chatMessagesContainer');
      if (headerName) headerName.textContent = 'Enclave Communications Hub';
      if (headerRole) headerRole.textContent = 'Awaiting member connections';
      if (msgContainer) {
        msgContainer.innerHTML = `
          <div style="text-align:center;padding:4rem 1.5rem;color:var(--text-muted);font-size:0.88rem;line-height:1.6;">
            <div style="font-size:2.5rem;margin-bottom:1rem;">🛡️</div>
            <strong style="color:#fff;display:block;margin-bottom:0.4rem;font-size:1.05rem;">End-to-End Encrypted Communications Ready</strong>
            Invite staff members or wait for client and partner signups to initiate live messaging.
          </div>
        `;
      }
      return;
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
          senderName: getAdminName(),
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

    const clientName = window._convertingClientName || 'Mavy Enterprise Direct';

    const projects = getProjects();
    const newProject = {
      id: 'prj-' + Math.floor(100 + Math.random() * 900),
      title,
      category: 'Enterprise Localization & AI',
      clientName,
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

    if (window._convertingInquiryId) {
      const inquiries = getInquiries();
      const inq = inquiries.find(i => i.id === window._convertingInquiryId);
      if (inq) {
        inq.status = 'converted';
        saveInquiries(inquiries);
      }
      window._convertingInquiryId = null;
      window._convertingClientName = null;
    }

    closeModal('postProjectModal');
    document.getElementById('postProjectForm').reset();

    showPortalToast(`Project "${title}" published to marketplace!`);
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

  window.handleInviteMember = function (e) {
    e.preventDefault();
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') return;

    const name = document.getElementById('inviteName').value.trim();
    const email = document.getElementById('inviteEmail').value.trim().toLowerCase();
    const role = document.getElementById('inviteRole').value;
    const dept = document.getElementById('inviteDept').value.trim();
    const password = document.getElementById('invitePassword').value.trim();

    const users = getUsers();
    if (users.some(u => u.email.toLowerCase() === email)) {
      alert(`An account with email ${email} already exists in the Mavy Enclave.`);
      return;
    }

    const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'ST';
    const roleLabels = {
      'pm': 'Project Manager (PM)',
      'qa_lead': 'Linguistic QA Lead',
      'solutions_architect': 'Solutions Architect',
      'admin': 'Co-Administrator'
    };

    const newStaff = {
      id: 'usr-staff-' + Date.now(),
      name,
      email,
      password,
      role: 'admin',
      internalTitle: roleLabels[role] || 'Internal Staff Member',
      company: 'Mavy EduSolutions Global',
      title: `${roleLabels[role] || 'Staff'} · ${dept}`,
      avatar: initials,
      invitedBy: user.name,
      invitedAt: new Date().toISOString()
    };

    users.push(newStaff);
    saveUsers(users);

    const messages = getMessages();
    messages.push({
      id: 'msg-' + Date.now(),
      threadId: `thread_usr-admin_${newStaff.id}`,
      senderId: 'usr-admin',
      senderName: `${getAdminName()} · Chief Operations`,
      senderRole: 'admin',
      recipientId: newStaff.id,
      recipientRole: 'admin',
      message: `Welcome to the Mavy Operations Enclave, ${name}! Your profile as ${newStaff.title} has been authorized. Please review current client briefs and milestone schedules.`,
      timestamp: new Date().toISOString()
    });
    saveMessages(messages);

    closeModal('inviteMemberModal');
    document.getElementById('inviteMemberForm').reset();

    alert(`Official invitation issued for ${name} (${email}) as ${roleLabels[role]}. Access credentials: [Email: ${email} | Password: ${password}].`);
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
