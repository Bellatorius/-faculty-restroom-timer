// Set the start date: July 21, 2025 at 15:43
const startDate = new Date('2025-07-21T15:43:00');

// Get DOM elements
const daysElement = document.getElementById('days');
const hoursElement = document.getElementById('hours');
const minutesElement = document.getElementById('minutes');
const secondsElement = document.getElementById('seconds');
const totalSecondsElement = document.getElementById('total-seconds');
const progressFill = document.getElementById('progress-fill');
const attentionLevel = document.getElementById('attention-level');

// Modal elements
const accessModal = document.getElementById('accessModal');
const handshakeModal = document.getElementById('handshakeModal');

// Knock sequence tracking
let knockSequence = 0; // 0,1,2 = random, 3 = "خراي ع الاسد", 4 = "جد و اب و ولد"

// Random knock messages
const randomKnockMessages = [
    "خراي ع الاسد",
    "جد و اب و ولد",
    "You hear faint laughter. You are not welcome.",
    "An invisible force field repels you.",
    "The door whispers: 'Students not allowed'.",
    "A holographic sign appears: 'Faculty Only - No Peasants'",
    "You hear the sound of a lock clicking. It's already locked.",
    "A voice booms: 'ACCESS DENIED - Return to your peasant bathroom!'",
    "The door glows red and makes a 'bzzt' sound.",
    "You see a tiny security camera pointing at you. It winks.",
    "A force field materializes with the text: 'STUDENT DETECTED'",
    "The door displays: 'Error 403: Insufficient Academic Credentials'"
];

// Toilet click counter for easter egg
let toiletClickCount = 0;

// Initialize toilet click events
document.addEventListener('DOMContentLoaded', function() {
    const toiletIcons = document.querySelectorAll('.toilet-icon');
    toiletIcons.forEach(icon => {
        icon.addEventListener('click', handleToiletClick);
    });
});

function handleToiletClick() {
    toiletClickCount++;
    if (toiletClickCount >= 10) {
        unlockHallOfShame();
        toiletClickCount = 0; // Reset counter
    }
}

function unlockHallOfShame() {
    alert('🎉 EASTER EGG UNLOCKED! 🎉\n\nWelcome to the Hall of Shame!\n\nPrevious unauthorized users:\n- "Bathroom Bandit" - Caught 47 times\n- "Toilet Tourist" - Repelled by sarcasm\n- "Restroom Raider" - Still trying to this day\n\nYou are now officially part of the legend! 🚽✨');
}

function updateTimer() {
    const now = new Date();
    const timeDifference = now - startDate;

    // If the start date hasn't been reached yet, show zeros
    if (timeDifference < 0) {
        daysElement.textContent = '0';
        hoursElement.textContent = '0';
        minutesElement.textContent = '0';
        secondsElement.textContent = '0';
        totalSecondsElement.textContent = '0';
        progressFill.style.width = '0%';
        attentionLevel.textContent = 'Minimal';
        return;
    }

    // Calculate time units
    const totalSeconds = Math.floor(timeDifference / 1000);
    const days = Math.floor(totalSeconds / (24 * 60 * 60));
    const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    // Update DOM elements
    daysElement.textContent = days;
    hoursElement.textContent = hours.toString().padStart(2, '0');
    minutesElement.textContent = minutes.toString().padStart(2, '0');
    secondsElement.textContent = seconds.toString().padStart(2, '0');
    totalSecondsElement.textContent = totalSeconds.toLocaleString();

    // Update progress bar and attention level
    updateProgressBar(totalSeconds);

    // Play sound effect every hour
    if (seconds === 0 && minutes === 0) {
        playHourlySound();
    }
}

function updateProgressBar(totalSeconds) {
    // Calculate progress based on time (max at 100 days)
    const maxSeconds = 100 * 24 * 60 * 60; // 100 days
    const progress = Math.min((totalSeconds / maxSeconds) * 100, 100);
    progressFill.style.width = progress + '%';

    // Update attention level
    if (progress < 10) {
        attentionLevel.textContent = 'Minimal';
    } else if (progress < 25) {
        attentionLevel.textContent = 'Low';
    } else if (progress < 50) {
        attentionLevel.textContent = 'Moderate';
    } else if (progress < 75) {
        attentionLevel.textContent = 'High';
    } else {
        attentionLevel.textContent = 'CRITICAL!';
        attentionLevel.style.color = '#e74c3c';
        attentionLevel.style.fontWeight = 'bold';
    }
}

function playHourlySound() {
    // Create a simple beep sound
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

function requestAccess() {
    accessModal.style.display = 'block';
}

function showHandshake() {
    handshakeModal.style.display = 'block';
}

function closeModal() {
    accessModal.style.display = 'none';
}

function closeHandshakeModal() {
    handshakeModal.style.display = 'none';
}

function submitForm() {
    const facultyId = document.getElementById('faculty-id').value;
    const tenureStatus = document.getElementById('tenure-status').value;
    
    if (!facultyId || !tenureStatus) {
        alert('Please fill in all fields!');
        return;
    }
    
    if (tenureStatus === 'student') {
        alert('🚫 ACCESS DENIED! Students are not allowed in faculty restrooms. Please return to your peasant bathroom! 🚫');
    } else {
        alert('✅ Application submitted successfully! Your request is being processed by the Faculty Restroom Committee. Please wait 3-5 business years for a response. 📋');
    }
}

function knockOnDoor() {
    let message;
    
    if (knockSequence === 0) {
        // First knock: Random English message
        message = randomKnockMessages[Math.floor(Math.random() * randomKnockMessages.length)];
        knockSequence = 1;
    } else if (knockSequence === 1) {
        // Second knock: Random English message
        message = randomKnockMessages[Math.floor(Math.random() * randomKnockMessages.length)];
        knockSequence = 2;
    } else if (knockSequence === 2) {
        // Third knock: Random English message
        message = randomKnockMessages[Math.floor(Math.random() * randomKnockMessages.length)];
        knockSequence = 3;
    } else if (knockSequence === 3) {
        // Fourth knock: "خراي ع الاسد"
        message = "خراي ع الاسد";
        knockSequence = 4;
    } else if (knockSequence === 4) {
        // Fifth knock: "جد و اب و ولد"
        message = "جد و اب و ولد";
        knockSequence = 0; // Reset back to first knock
    }

    // Create a temporary notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(45deg, #9b59b6, #8e44ad);
        color: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        z-index: 1001;
        max-width: 300px;
        font-weight: 600;
        text-align: center;
        animation: slideIn 0.5s ease-out;
    `;

    notification.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 10px;">🚪</div>
        <div>${message}</div>
    `;

    document.body.appendChild(notification);

    // Remove notification after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.5s ease-in';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 4000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target === accessModal) {
        accessModal.style.display = 'none';
    }
    if (event.target === handshakeModal) {
        handshakeModal.style.display = 'none';
    }
}

// Close modals when clicking close button
document.querySelectorAll('.close').forEach(closeBtn => {
    closeBtn.onclick = function() {
        accessModal.style.display = 'none';
        handshakeModal.style.display = 'none';
    }
});

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Update timer immediately
updateTimer();

// Update timer every second
setInterval(updateTimer, 1000);
