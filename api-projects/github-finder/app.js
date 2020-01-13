// Init GitHub
const github = new GitHub;
// Init UI
const ui = new UI;
// Search Input
const searchUser = document.querySelector('#searchUser');

// Search Input Event Listener
searchUser.addEventListener('keyup', (event) => {
  // Get input text
  const userText = event.target.value;

  if (userText.trim()) {
    // Make http call
    github.getUser(userText)
      .then(data => {
        if (data.profile.message === 'Not Found') {
          // Show alert
          ui.showAlert('User not found', 'alert alert-danger');
        } else {
          // Show profile
          ui.showProfile(data.profile);
          console.log(data);
          ui.showRepos(data.repos)
        }
      })
  } else {
    // Clear profile
    ui.clearProfile();
  }
});