// Main tournament details functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const tournamentId = urlParams.get('id') || '1'; // Default to first tournament if no ID is provided
  
  // Mock tournament data - in a real app this would come from an API
  const mockTournaments = [
    {
      id: "1",
      title: "Battle Royale Championship",
      gameType: "battle-royale",
      entryFee: "₹500",
      status: "upcoming",
      startDate: "2025-05-20",
      endDate: "2025-05-22",
      format: "5v5 Teams",
      prizePool: "₹50,000",
      participantsCount: 42,
      maxParticipants: 64,
      region: "Asia",
      image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Join the ultimate Battle Royale tournament and compete against the best teams in Asia. Form your squad of 5 and battle for glory and prizes!",
      rules: "Standard battle royale rules apply. Teams of 5 will compete in multiple rounds. Points are awarded for placement and eliminations.",
      schedule: [
        { name: "Registration Deadline", date: "2025-05-18" },
        { name: "Group Stage", date: "2025-05-20" },
        { name: "Semifinals", date: "2025-05-21" },
        { name: "Finals", date: "2025-05-22" }
      ],
      organizer: "GamersHub Asia"
    },
    {
      id: "2",
      title: "MOBA Masters Tournament",
      gameType: "moba",
      entryFee: "",
      status: "ongoing",
      startDate: "2025-05-10",
      endDate: "2025-05-15",
      format: "5v5 Teams",
      prizePool: "₹100,000",
      participantsCount: 32,
      maxParticipants: 32,
      region: "Global",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "The biggest MOBA tournament of the year with teams from around the world competing for the championship title and prize pool.",
      rules: "Double elimination bracket. Best-of-three matches in early rounds, best-of-five for semifinals and finals.",
      schedule: [
        { name: "Group Stage", date: "2025-05-10 to 2025-05-12" },
        { name: "Quarterfinals", date: "2025-05-13" },
        { name: "Semifinals", date: "2025-05-14" },
        { name: "Finals", date: "2025-05-15" }
      ],
      organizer: "World Esports Federation"
    }
  ];
  
  // Find the tournament by ID
  const tournament = mockTournaments.find(t => t.id === tournamentId);
  
  // Handle tournament not found
  if (!tournament) {
    document.querySelector('.container').innerHTML = `
      <div class="text-center py-12">
        <div class="flex flex-col items-center justify-center min-h-[50vh]">
          <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-esports-purple mb-4"></div>
          <h2 class="text-xl font-semibold">Tournament not found</h2>
        </div>
      </div>
    `;
    return;
  }
  
  // Populate tournament data
  populateTournamentData(tournament);
  
  // Setup tab navigation
  setupTabs();
  
  // Setup registration button
  setupRegistrationButton(tournament);
});

// Format date function
function formatDate(dateString) {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

// Populate tournament data
function populateTournamentData(tournament) {
  // Set document title
  document.title = `${tournament.title} | Tournament Details`;
  
  // Hero section
  document.getElementById('tournament-image').src = tournament.image;
  document.getElementById('tournament-image').alt = tournament.title;
  
  // Status badge
  const statusBadge = document.getElementById('status-badge');
  statusBadge.textContent = tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1);
  statusBadge.className = `status-badge ${tournament.status}`;
  
  // Status badge in sidebar
  const statusBadgeSidebar = document.getElementById('status-badge-sidebar');
  statusBadgeSidebar.textContent = tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1);
  statusBadgeSidebar.className = `status-badge ${tournament.status}`;
  
  // Game type badge
  document.getElementById('game-type-badge').textContent = tournament.gameType;
  
  // Tournament title and meta
  document.getElementById('tournament-title').textContent = tournament.title;
  document.getElementById('format').textContent = tournament.format;
  document.getElementById('region').textContent = tournament.region;
  document.getElementById('dates').textContent = `${formatDate(tournament.startDate)} - ${formatDate(tournament.endDate)}`;
  
  // Overview tab
  document.getElementById('description').textContent = tournament.description;
  document.getElementById('organizer').textContent = tournament.organizer;
  document.getElementById('format-detail').textContent = tournament.format;
  document.getElementById('region-detail').textContent = tournament.region;
  document.getElementById('entry-fee').textContent = tournament.entryFee || 'Free Entry';
  
  // Schedule tab
  const scheduleContainer = document.getElementById('schedule-container');
  if (tournament.schedule && tournament.schedule.length > 0) {
    scheduleContainer.innerHTML = '';
    
    tournament.schedule.forEach(event => {
      const eventDate = event.date.split(' ')[0]; // Get first date if range
      const date = new Date(eventDate);
      
      const scheduleItem = document.createElement('div');
      scheduleItem.className = 'schedule-item';
      scheduleItem.innerHTML = `
        <div class="schedule-date">
          <span class="schedule-day">${date.getDate()}</span>
          <span class="schedule-month">${date.toLocaleString('default', { month: 'short' })}</span>
        </div>
        <div class="schedule-details">
          <h3>${event.name}</h3>
          <p class="schedule-time">${event.date}</p>
        </div>
      `;
      
      scheduleContainer.appendChild(scheduleItem);
    });
  } else {
    scheduleContainer.innerHTML = '<p class="text-center py-8 text-gray-400">No schedule information available</p>';
  }
  
  // Rules tab
  document.getElementById('rules-text').textContent = tournament.rules || 'Rules not available';
  
  // Participants tab
  document.getElementById('current-participants').textContent = tournament.participantsCount;
  document.getElementById('max-participants').textContent = tournament.maxParticipants;
  
  // Set progress bar width
  const progressPercentage = (tournament.participantsCount / tournament.maxParticipants) * 100;
  document.getElementById('progress-bar').style.width = `${progressPercentage}%`;
  
  // Status card
  document.getElementById('start-date').textContent = formatDate(tournament.startDate);
  document.getElementById('end-date').textContent = formatDate(tournament.endDate);
  
  // Registration countdown
  const registrationDeadline = tournament.schedule ? 
    new Date(tournament.schedule.find(s => s.name.includes('Registration'))?.date || tournament.startDate) : 
    new Date(tournament.startDate);
  
  const today = new Date();
  const daysLeft = Math.ceil((registrationDeadline - today) / (1000 * 60 * 60 * 24));
  
  if (tournament.status === 'upcoming' && daysLeft > 0) {
    document.getElementById('registration-countdown').style.display = 'block';
    document.getElementById('days-left').textContent = `${daysLeft} days`;
  } else {
    document.getElementById('registration-countdown').style.display = 'none';
  }
  
  // Prize pool
  document.getElementById('prize-pool').textContent = tournament.prizePool;
  
  // Registration card
  if (tournament.status !== 'upcoming') {
    document.getElementById('registration-card').style.display = 'none';
  } else {
    document.getElementById('filled-slots').textContent = tournament.participantsCount;
    document.getElementById('total-slots').textContent = tournament.maxParticipants;
    document.getElementById('slots-left').textContent = `${tournament.maxParticipants - tournament.participantsCount} slots left`;
    
    // Set slots progress bar width
    document.getElementById('slots-progress-bar').style.width = `${progressPercentage}%`;
    
    // Entry fee
    if (tournament.entryFee) {
      document.getElementById('entry-fee-display').style.display = 'block';
      document.getElementById('entry-fee-value').textContent = tournament.entryFee;
    } else {
      document.getElementById('entry-fee-display').style.display = 'none';
    }
  }
}

// Setup tab navigation
function setupTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Show corresponding content
      const tabId = button.id.replace('-tab', '-content');
      document.getElementById(tabId).classList.add('active');
    });
  });
}

// Setup registration button
function setupRegistrationButton(tournament) {
  const registerButton = document.getElementById('register-button');
  
  // Check if registration is open
  const today = new Date();
  const startDate = new Date(tournament.startDate);
  const registrationDeadline = tournament.schedule ? 
    new Date(tournament.schedule.find(s => s.name.includes('Registration'))?.date || tournament.startDate) : 
    startDate;
  
  const isRegistrationOpen = today < registrationDeadline;
  
  // Disable button if registration is closed
  if (!isRegistrationOpen) {
    registerButton.disabled = true;
    registerButton.textContent = 'Registration Closed';
  }
  
  registerButton.addEventListener('click', function() {
    // Check if registration is open
    if (!isRegistrationOpen) {
      return;
    }
    
    // Show loading state
    registerButton.disabled = true;
    registerButton.classList.add('loading');
    registerButton.textContent = 'Registering...';
    
    // Simulate API call (1.5s delay)
    setTimeout(() => {
      // Show success message
      showToast('Registration Successful', `You have successfully registered for ${tournament.title}`);
      
      // Reset button state
      registerButton.classList.remove('loading');
      registerButton.textContent = 'Registered';
    }, 1500);
  });
}

// Show toast notification
function showToast(title, message) {
  // Create toast element
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      <div class="toast-message">${message}</div>
    </div>
  `;
  
  // Add toast styles
  const style = document.createElement('style');
  style.textContent = `
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background-color: var(--esports-card);
      border: 1px solid var(--esports-purple);
      border-radius: 4px;
      padding: 16px 24px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      z-index: 1000;
      animation: toast-slide-in 0.3s, toast-fade-out 0.3s 2.7s;
    }
    
    .toast-content {
      display: flex;
      flex-direction: column;
    }
    
    .toast-title {
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .toast-message {
      color: var(--gray-300);
    }
    
    @keyframes toast-slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes toast-fade-out {
      from {
        opacity: 1;
      }
      to {
        opacity: 0;
      }
    }
  `;
  
  document.head.appendChild(style);
  document.body.appendChild(toast);
  
  // Remove toast after 3 seconds
  setTimeout(() => {
    document.body.removeChild(toast);
  }, 3000);
}
