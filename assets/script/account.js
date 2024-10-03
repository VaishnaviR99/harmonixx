$(document).ready(function () {
  
  let loggedUser = JSON.parse(localStorage.getItem("harmoniX_loggedInUser"));
  
  if (loggedUser) {
    $(".loggedUser").text(loggedUser.username);
  } else {
    window.location.href = "./index.html";
  }

  // Function to load user details
  function loadUserDetails() {
    $("#mainContent").html(`
            <div class="card" id="userDetail">
                 <div>
                  <i class="fa-solid fa-circle-user"></i>
                  <h1>HarmoniX User</h1>
                </div>
              <h2>User Details</h2>
              <p><strong>Username:</strong> ${loggedUser.username}</p>
               <p><strong>Email:</strong> ${loggedUser.email}</p>
          </div>
        `);
  }

  // Function to load edit details form
  function loadEditDetails() {
    $("#mainContent").html(`
            <div class="card" id="editDeatail">
                <h2>Edit Details</h2>
                <form id="editForm">
                    <div class="inputField">
                    <p><strong>Email:</strong> ${loggedUser.email}</p>
                        <label for="editUsername">Username:</label>
                        <input type="text" id="editUsername" value="${loggedUser.username}" />
                    </div>
                    <button type="submit">Save</button>
                </form>
            </div>
        `);

    // Handle edit form submission
    $("#editForm").submit(function (event) {
      event.preventDefault();
      let newUsername = $("#editUsername").val();
      loggedUser.username = newUsername;
      localStorage.setItem("harmoniX_loggedInUser", JSON.stringify(loggedUser));
      $("#loggedUser").text(newUsername);
      $(".active").removeClass("active");
   
      loadUserDetails();
    });
  }

  // Function to load privacy settings
  function loadPrivacySettings() {
    $("#mainContent").html(`
            <div class="card" id="privacySett">
                <h2>Privacy Settings</h2>
                
                <div class="gif-container" align="center">
        <img src="../media/transistor-page-under-construction.gif" alt="User Activity GIF" class="user-gif" height="90%" width="70%">
    </div>
    <i >oops..page under construction!!</i>
            </div>
        `);
  }

  // Function to logout
  function logout() {
    localStorage.removeItem("harmoniX_loggedInUser");
    window.location.href = "/task_11/index.html";
  }

  // Event listeners for sidebar buttons
  $("#userDetailsBtn").click(function () {
    $(".active").removeClass("active");
    $(this).addClass("active");
    loadUserDetails();
  });

  $("#editDetailsBtn").click(function () {
    $(".active").removeClass("active");
    $(this).addClass("active");
    loadEditDetails();
  });

  $("#privacySettingsBtn").click(function () {
    $(".active").removeClass("active");
    $(this).addClass("active");
    loadPrivacySettings();
  });

  $("#logoutBtn").click(function () {
    $(".active").removeClass("active");
    $(this).addClass("active");
    logout();
  });

  $("#logo").click(function () {
    window.location.href = "./Home.html";
  });
  
  loadUserDetails();
});
