// script.js - TransCoope (Versión Corregida)
document.addEventListener('DOMContentLoaded', function() {
    // Estado de la aplicación
    const appState = {
        currentUser: null,
        userGenres: [],
        isLoggedIn: false,
        currentSection: 'transcripcion',
        posts: [],
        projects: [],
        rankings: {
            weekly: [],
            monthly: [],
            alltime: []
        }
    };

    // Elementos DOM principales
    const elements = {
        loginScreen: document.getElementById('login-screen'),
        registerScreen: document.getElementById('register-screen'),
        appScreen: document.getElementById('app-screen'),
        loginForm: document.getElementById('login-form'),
        registerForm: document.getElementById('register-form'),
        showRegister: document.getElementById('show-register'),
        showLogin: document.getElementById('show-login'),
        logoutBtn: document.getElementById('logout-btn'),
        navLinks: document.querySelectorAll('.nav-link'),
        contentSections: document.querySelectorAll('.content-section'),
        userName: document.getElementById('user-name')
    };

    // Inicialización
    init();

    function init() {
        setupEventListeners();
        loadSampleData();
        checkLoginStatus();
    }

    function setupEventListeners() {
        // Navegación entre pantallas de login/registro
        elements.showRegister.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen('register');
        });

        elements.showLogin.addEventListener('click', (e) => {
            e.preventDefault();
            showScreen('login');
        });

        // Formularios de login y registro
        elements.loginForm.addEventListener('submit', handleLogin);
        elements.registerForm.addEventListener('submit', handleRegister);
        elements.logoutBtn.addEventListener('click', handleLogout);

        // Navegación entre secciones
        elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const section = e.target.getAttribute('data-section');
                showSection(section);
                
                // Actualizar navegación
                elements.navLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });

        // Transcripción de audio
        setupTranscriptionListeners();
        
        // Comunidad
        setupCommunityListeners();
        
        // Proyectos
        setupProjectsListeners();
        
        // Ranking
        setupRankingListeners();

        // Cerrar modales al hacer clic fuera
        setupModalListeners();
    }

    function setupModalListeners() {
        // Cerrar modales al hacer clic fuera
        window.addEventListener('click', (e) => {
            const modals = document.querySelectorAll('.modal');
            modals.forEach(modal => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });

        // Cerrar modales con botones de cerrar
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
    }

    // Gestión de pantallas
    function showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        if (screenName === 'login') {
            elements.loginScreen.classList.add('active');
        } else if (screenName === 'register') {
            elements.registerScreen.classList.add('active');
        }
