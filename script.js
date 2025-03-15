// Dados do portfólio
const portfolioItems = [
    {
        title: 'JK Engenharia',
        description: 'Identidade visual e branding para empresa de engenharia e construção civil',
        images: [
            'JK Engenharia/(1).png',
            'JK Engenharia/(2).png',
            'JK Engenharia/(3).png',
            'JK Engenharia/(4).png',
            'JK Engenharia/(5).png',
            'JK Engenharia/(6).png',
            'JK Engenharia/(7).png',
            'JK Engenharia/(8).png',
            'JK Engenharia/(9).png',
            'JK Engenharia/(10).png',
            'JK Engenharia/(11).png',
            'JK Engenharia/(12).png',
            'JK Engenharia/(13).png',
            'JK Engenharia/(14).png',
            'JK Engenharia/(15).png',
            'JK Engenharia/(16).png',
            'JK Engenharia/(17).png',
            'JK Engenharia/(18).png',
            'JK Engenharia/(19).png'
        ],
        category: 'Branding & Identidade Visual',
        type: 'images'
    },
    {
        title: 'Clínica Lora',
        description: 'Projeto de identidade visual para clínica especializada em psicologia infantil, criando um ambiente acolhedor e lúdico para as crianças',
        images: [
            'Clinica Lora/  (1).png',
            'Clinica Lora/  (2).png',
            'Clinica Lora/  (3).png',
            'Clinica Lora/  (4).png',
            'Clinica Lora/  (5).png',
            'Clinica Lora/  (6).png',
            'Clinica Lora/  (7).png',
            'Clinica Lora/  (8).png',
            'Clinica Lora/  (9).png',
            'Clinica Lora/  (10).png'
        ],
        category: 'Branding & Identidade Visual',
        type: 'images'
    },
    {
        title: 'Projeto de Design Editorial',
        description: 'Uma série de designs editoriais modernos e impactantes',
        images: [
            'Regina\'s/1.png',
            'Regina\'s/2.png',
            'Regina\'s/3.png',
            'Regina\'s/4.png',
            'Regina\'s/5.png',
            'Regina\'s/6.png'
        ],
        category: 'Design Editorial',
        type: 'images'
    },
    {
        title: 'Amor e Açaí',
        description: 'Identidade visual e branding para uma marca de açaí artesanal',
        images: [
            'Amoremaçaí/1.png',
            'Amoremaçaí/2.png',
            'Amoremaçaí/3.png',
            'Amoremaçaí/4.png',
            'Amoremaçaí/5.png'
        ],
        category: 'Branding',
        type: 'images'
    },
    {
        title: 'Gorillão Fast Food',
        description: 'Design de identidade visual para rede de fast food',
        images: [
            'Gorilão/1.png',
            'Gorilão/2.png',
            'Gorilão/3.png'
        ],
        category: 'Branding & Identidade Visual',
        type: 'images'
    },
    {
        title: 'Beatriz Moura',
        description: 'Identidade visual para escritório de advocacia especializado em Direito de Família e Sucessões',
        images: [
            'Beatriz Moura Direirto de Família e Sucessões/1.jpg',
            'Beatriz Moura Direirto de Família e Sucessões/2.jpg'
        ],
        category: 'Branding & Identidade Visual',
        type: 'images'
    },
    {
        title: 'Sol Atacadista - História',
        description: 'Vídeo institucional que conta a história e trajetória dos colaboradores da empresa',
        video: 'Sol Atacadista da Tecnologia/Somos feitos de história.mp4',
        thumbnail: 'Sol Atacadista da Tecnologia/somos-feitos-de-historias.jpg',
        category: 'Motion Design',
        type: 'video'
    },
    {
        title: 'Sol Atacadista - Rebranding',
        description: 'Projeto de renovação da identidade visual do Sol Atacadista da Tecnologia',
        video: 'Sol Atacadista da Tecnologia - rebranding/Sol Atacadista da Teconologia - Rebranding.mp4',
        thumbnail: 'Sol Atacadista da Tecnologia - rebranding/Sol Atacadista da Teconologia.jpg',
        category: 'Motion Design & Branding',
        type: 'video'
    }
];

// Carregar projetos do portfólio
function loadPortfolio() {
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    portfolioItems.forEach((item, index) => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item fade-in';
        portfolioItem.setAttribute('data-type', item.type);
        
        // Verifica se é um projeto de vídeo, imagem ou link
        const thumbnailSrc = item.type === 'video' ? item.thumbnail : (item.type === 'images' ? item.images[0] : item.thumbnail);
        
        portfolioItem.innerHTML = `
            <img src="${thumbnailSrc}" alt="${item.title}">
            <div class="portfolio-item-info">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="category">${item.category}</span>
            </div>
        `;
        
        // Adiciona o evento de clique apropriado baseado no tipo
        if (item.type === 'link') {
            portfolioItem.addEventListener('click', () => window.open(item.url, '_blank'));
        } else {
            portfolioItem.addEventListener('click', () => openModal(index));
        }
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Modal
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-header">
                <h2></h2>
                <p class="modal-description"></p>
                <span class="modal-category"></span>
            </div>
            <div class="modal-media-container">
                <!-- Conteúdo será adicionado dinamicamente -->
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Adicionar listener para a tecla ESC
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    return modal;
}

let currentModalIndex = 0;
let modal;

function openModal(index) {
    if (!modal) {
        modal = createModal();
    }
    
    currentModalIndex = index;
    updateModalContent();
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function updateModalContent() {
    const item = portfolioItems[currentModalIndex];
    const modalTitle = modal.querySelector('h2');
    const modalDescription = modal.querySelector('.modal-description');
    const modalCategory = modal.querySelector('.modal-category');
    const modalMediaContainer = modal.querySelector('.modal-media-container');

    modalTitle.textContent = item.title;
    modalDescription.textContent = item.description;
    modalCategory.textContent = item.category;

    // Limpar container
    modalMediaContainer.innerHTML = '';

    if (item.type === 'video') {
        // Adicionar vídeo
        modalMediaContainer.innerHTML = `
            <div class="video-wrapper">
                <video controls>
                    <source src="${item.video}" type="video/mp4">
                    Seu navegador não suporta o elemento de vídeo.
                </video>
            </div>
        `;
    } else {
        // Adicionar imagens
        item.images.forEach(imageUrl => {
            const imgContainer = document.createElement('div');
            imgContainer.className = 'modal-image-wrapper fade-in';
            imgContainer.innerHTML = `<img src="${imageUrl}" alt="${item.title}">`;
            modalMediaContainer.appendChild(imgContainer);
        });
    }
}

// Menu mobile
function setupMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    let menuOpen = false;

    menuBtn.addEventListener('click', () => {
        if (!menuOpen) {
            menuBtn.classList.add('open');
            navLinks.style.display = 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.backgroundColor = 'white';
            navLinks.style.padding = '1rem';
            menuOpen = true;
        } else {
            menuBtn.classList.remove('open');
            navLinks.style.display = 'none';
            menuOpen = false;
        }
    });
}

// Smooth scroll para links de navegação
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

// Formulário de contato
function setupContactForm() {
    const form = document.getElementById('contato-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Aqui você pode adicionar a lógica para enviar o formulário
        alert('Mensagem enviada com sucesso!');
        form.reset();
    });
}

// Animação de scroll
function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    });

    document.querySelectorAll('section').forEach((section) => {
        observer.observe(section);
    });
}

// Duplicar imagens do grid para criar efeito infinito
function setupBackgroundGrid() {
    const rows = document.querySelectorAll('.grid-row');
    rows.forEach(row => {
        const items = row.innerHTML;
        row.innerHTML = items + items; // Duplica os itens para criar um efeito contínuo
    });
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    loadPortfolio();
    setupMobileMenu();
    setupSmoothScroll();
    setupBackgroundGrid();
    setupContactForm();
    setupScrollAnimation();
}); 