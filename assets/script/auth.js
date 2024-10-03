$(document).ready(function() {
    let users = JSON.parse(localStorage.getItem("harmoniX_users")) || [];
    let loggedInUser = JSON.parse(localStorage.getItem("harmoniX_loggedInUser"));
    if(loggedInUser){
        window.location.href="./Home.html";
    }
    
    // Initially show loginCont and hide signupCont
    $("#loginCont").show();
    $("#signupCont").hide();
    
    // Function to toggle between login and signup forms
    function toggleForm(formType) {
        if (formType === 'login') {
            $("#loginCont").show();
            $("#signupCont").hide();
            $("#login-toggle").addClass("active");
            $("#signup-toggle").removeClass("active");
        } else if (formType === 'signup') {
            $("#loginCont").hide();
            $("#signupCont").show();
            $("#login-toggle").removeClass("active");
            $("#signup-toggle").addClass("active");
        }
    }
    
    // Event listeners for toggle buttons
    $("#login-toggle").click(function() {
        toggleForm('login');
    });
    
    $("#signup-toggle").click(function() {
        toggleForm('signup');
    });
    
    // Form submit handlers
    $("#loginForm").submit(function(event) {
        event.preventDefault();
        let email = $("#a-emailInput").val();
        let password = $("#a-passInput").val();
        
        let user = users.find(u => u.email === email && u.password === password);
        if (user) {
            localStorage.setItem("harmoniX_loggedInUser", JSON.stringify(user));
            showNotification("success", "Logged in successfully!");
            setTimeout(()=>{
                window.location.href="./Home.html";
            }, 1000);
        } else {
            showNotification("error", "Invalid email or password.");
        }
    });
    
    $("#signupForm").submit(function(event) {
        event.preventDefault();
        let username = $("#userInput").val();
        let email = $("#b-emailInput").val();
        let password = $("#b-passInput").val();
        let id=Math.floor(10 + Math.random() * 90);
        
        // Simulated signup logic
        let existingUser = users.find(u => u.email === email);
        if (existingUser) {
            showNotification("error", "Email already registered.");
        } else {
            users.push({ username, email, password,id });
            localStorage.setItem("harmoniX_users", JSON.stringify(users));
            showNotification("success", "Signup successful. Please login.");
            toggleForm('login'); 
        }
    });
    
    // Function to show notification
    function showNotification(type, message) {
        const notification = $("<div class='notification'></div>").addClass(type).text(message);
        $("body").append(notification);
        setTimeout(() => {
            notification.addClass("show");
        }, 100); 
        setTimeout(() => {
            notification.removeClass("show");
            setTimeout(() => {
                notification.remove();
            }, 500); 
        }, 3000); 
    }
});
