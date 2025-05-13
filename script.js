document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const themeSelect = document.getElementById('theme');
    const animationSelect = document.getElementById('animation');
    const savePrefsBtn = document.getElementById('savePrefs');
    const animatedBox = document.getElementById('animatedBox');
    const triggerAnimationBtn = document.getElementById('triggerAnimation');
    const resetAnimationBtn = document.getElementById('resetAnimation');
    
    // Load saved preferences
    loadPreferences();
    
    // Event listeners
    savePrefsBtn.addEventListener('click', savePreferences);
    animatedBox.addEventListener('click', triggerAnimation);
    triggerAnimationBtn.addEventListener('click', triggerAnimation);
    resetAnimationBtn.addEventListener('click', resetAnimation);
    
    // Function to save preferences to localStorage
    function savePreferences() {
        const preferences = {
            theme: themeSelect.value,
            animation: animationSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        applyTheme(preferences.theme);
        
        // Show feedback
        alert('Preferences saved!');
    }
    
    // Function to load preferences from localStorage
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            
            // Set select values
            themeSelect.value = preferences.theme;
            animationSelect.value = preferences.animation;
            
            // Apply theme
            applyTheme(preferences.theme);
            
            // If there's a saved animation, show a message
            console.log('Loaded saved preferences:', preferences);
        }
    }
    
    // Function to apply theme
    function applyTheme(theme) {
        // Remove all theme classes first
        document.body.classList.remove('light', 'dark', 'blue');
        
        // Add the selected theme class
        document.body.classList.add(theme);
    }
    
    // Function to trigger animation
    function triggerAnimation() {
        // Get the selected animation (either from select or localStorage)
        let animationType;
        
        if (this.id === 'triggerAnimation' || this.id === 'animatedBox') {
            // Use the currently selected animation
            animationType = animationSelect.value;
        } else {
            // Try to use saved animation
            const savedPrefs = localStorage.getItem('userPreferences');
            if (savedPrefs) {
                animationType = JSON.parse(savedPrefs).animation;
            } else {
                animationType = 'bounce'; // default
            }
        }
        
        // Reset any current animations
        resetAnimation();
        
        // Add the animation class after a small delay to allow reset to complete
        setTimeout(() => {
            animatedBox.classList.add(animationType);
        }, 10);
    }
    
    // Function to reset animation
    function resetAnimation() {
        animatedBox.classList.remove('bounce', 'spin', 'pulse');
    }
    
    // Theme selector change event
    themeSelect.addEventListener('change', function() {
        applyTheme(this.value);
    });
});