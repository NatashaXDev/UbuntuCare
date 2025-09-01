// Global state
let currentSection = "home";

// Initialize app
document.addEventListener("DOMContentLoaded", function () {
  setupEventListeners();
  showSection("home");
});

// Event Listeners
function setupEventListeners() {
  // Chat input
  const chatInput = document.getElementById("chatInput");
  if (chatInput) {
    chatInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });
  }

  // Smooth scrolling for navigation
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}

// Section Navigation
function showSection(sectionName) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  // Show target section
  const targetSection = document.getElementById(sectionName);
  if (targetSection) {
    targetSection.classList.add("active");
    currentSection = sectionName;
  }

  // Update navigation active state
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.classList.remove("active");
  });

  const activeLink = document.querySelector(
    `.nav-links a[href="#${sectionName}"]`
  );
  if (activeLink) {
    activeLink.classList.add("active");
  }
}

// Safe Exit Function
function safeExit() {
  // Clear any sensitive data
  if (typeof Storage !== "undefined") {
    sessionStorage.clear();
    localStorage.clear();
  }

  // Redirect to Google
  window.location.replace("https://www.google.com");
}

// Chat Functionality
function sendMessage() {
  const chatInput = document.getElementById("chatInput");
  const chatBox = document.getElementById("chatBox");
  const message = chatInput.value.trim();

  if (!message) return;

  // Add user message
  addMessage(message, "user");
  chatInput.value = "";

  // Simulate typing indicator
  setTimeout(() => {
    const botResponse = generateBotResponse(message);
    addMessage(botResponse, "bot");
  }, 1000 + Math.random() * 1000);
}

function addMessage(message, sender) {
  const chatBox = document.getElementById("chatBox");
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${sender}-message`;

  const avatar = document.createElement("div");
  avatar.className = "message-avatar";
  avatar.textContent = sender === "bot" ? "💜" : "🌟";

  const content = document.createElement("div");
  content.className = "message-content";
  content.innerHTML = `<p>${message}</p>`;

  messageDiv.appendChild(avatar);
  messageDiv.appendChild(content);
  chatBox.appendChild(messageDiv);

  // Scroll to bottom
  chatBox.scrollTop = chatBox.scrollHeight;
}

function generateBotResponse(userMessage) {
  const message = userMessage.toLowerCase();

  // Crisis keywords
  const crisisKeywords = [
    "suicide",
    "kill myself",
    "end it all",
    "hurt myself",
    "die",
    "can't go on",
  ];
  const abuseKeywords = [
    "abuse",
    "hurt",
    "violence",
    "assault",
    "rape",
    "beaten",
    "threatened",
  ];
  const anxietyKeywords = [
    "anxious",
    "panic",
    "scared",
    "afraid",
    "worried",
    "stress",
  ];
  const sadnessKeywords = [
    "sad",
    "depressed",
    "lonely",
    "hopeless",
    "empty",
    "worthless",
  ];

  if (crisisKeywords.some((keyword) => message.includes(keyword))) {
    return "I'm very concerned about what you're going through. Please reach out to the Crisis Helpline immediately at <strong>0800 567 567</strong>. You matter, and there are people who want to help you right now. You don't have to face this alone.";
  }

  if (abuseKeywords.some((keyword) => message.includes(keyword))) {
    return "I'm so sorry you're experiencing this. What you're going through is not okay, and it's not your fault. Please consider calling the Abuse Hotline at <strong>0800 150 150</strong> for immediate support. You deserve safety and respect.";
  }

  if (anxietyKeywords.some((keyword) => message.includes(keyword))) {
    return "It sounds like you're feeling overwhelmed right now. That's completely understandable given what you've been through. Try taking slow, deep breaths. Remember that you're safe in this moment. Would you like to talk about what's making you feel this way?";
  }

  if (sadnessKeywords.some((keyword) => message.includes(keyword))) {
    return "Your feelings are valid, and it's okay to feel sad. Healing isn't linear, and it's normal to have difficult days. You've shown incredible strength by reaching out. What's one small thing that might bring you a moment of comfort today?";
  }

  if (
    message.includes("hello") ||
    message.includes("hi") ||
    message.includes("hey")
  ) {
    return "Hello, and thank you for reaching out. I'm here to listen and support you. How are you feeling today? Remember, this is a safe space where you can share whatever is on your mind.";
  }

  if (message.includes("help") || message.includes("support")) {
    return "I'm here to help in whatever way I can. If you're in immediate danger, please call emergency services or one of our crisis numbers. For ongoing support, I'm here to listen. What kind of support are you looking for today?";
  }

  if (message.includes("thank")) {
    return "You're very welcome. It takes courage to reach out, and I'm honored that you've chosen to share with me. Remember, seeking support is a sign of strength, not weakness.";
  }

  // Default supportive responses
  const supportiveResponses = [
    "Thank you for sharing that with me. Your feelings are valid, and you're not alone in this journey.",
    "I hear you, and I want you to know that what you're experiencing matters. You matter.",
    "It takes courage to open up about difficult experiences. I'm here to listen without judgment.",
    "You've taken an important step by reaching out. How can I best support you right now?",
    "Your strength in sharing this is remarkable. What you're feeling is completely understandable.",
    "I'm here with you in this moment. You don't have to carry this burden alone.",
  ];

  return supportiveResponses[
    Math.floor(Math.random() * supportiveResponses.length)
  ];
}

// Utility Functions
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: white;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        border-left: 4px solid #8b5cf6;
        z-index: 3000;
        transform: translateX(400px);
        opacity: 0;
        transition: all 0.3s ease;
        max-width: 300px;
        font-family: Inter, sans-serif;
        color: #2d3748;
    `;

  if (type === "error") {
    notification.style.borderLeftColor = "#e53e3e";
  } else if (type === "success") {
    notification.style.borderLeftColor = "#10b981";
  }

  document.body.appendChild(notification);

  // Show notification
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
    notification.style.opacity = "1";
  }, 100);

  // Hide notification after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(400px)";
    notification.style.opacity = "0";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

// Initialize smooth animations
function initializeAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(".emergency-card, .resource-card, .value-item")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
      observer.observe(el);
    });
}

// Call animations after DOM is loaded
document.addEventListener("DOMContentLoaded", initializeAnimations);

// Add some gentle background animations
function createFloatingElements() {
  const container = document.querySelector(".hero");
  if (!container) return;

  for (let i = 0; i < 3; i++) {
    const element = document.createElement("div");
    element.style.cssText = `
            position: absolute;
            width: ${20 + Math.random() * 40}px;
            height: ${20 + Math.random() * 40}px;
            background: linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(168, 85, 247, 0.1));
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: float ${6 + Math.random() * 4}s ease-in-out infinite;
            animation-delay: ${Math.random() * 2}s;
            pointer-events: none;
            z-index: -1;
        `;
    container.appendChild(element);
  }
}

// Initialize floating elements
setTimeout(createFloatingElements, 1000);
