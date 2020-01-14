const data = [
  {
    name: 'John Doe',
    age: 32,
    gender: 'male',
    lookingFor: 'female',
    location: 'Boston MA',
    image: 'https://cdn6.aptoide.com/imgs/a/9/0/a9048accbc246f8682db61eb1fb1ed94_icon.jpg?w=256'
  },
  {
    name: 'Jen Smith',
    age: 26,
    gender: 'female',
    lookingFor: 'male',
    location: 'Miami FL',
    image: 'https://i.pinimg.com/originals/74/00/de/7400def3d411768dfdd0205c5cc347e6.gif'
  },
  {
    name: 'William Johnson',
    age: 38,
    gender: 'male',
    lookingFor: 'female',
    location: 'Lynn MA',
    image: 'https://i.pinimg.com/originals/e5/25/f2/e525f208b1c6c60a171e70e3f8b1e2cb.jpg'
  }
];

const profiles = profileIterator(data);

// Call first profile
nextProfile();

// Next Event
document.querySelector('#next').addEventListener('click', nextProfile);

// Next Profile Display
function nextProfile() {
  const currentProfile = profiles.next().value;
  if (!currentProfile) {
    // No more profiles
    window.location.reload();
    return;
  }

  document.querySelector('#profileDisplay').innerHTML = `
    <ul class="list-group">
      <li class="list-group-item">Name: ${currentProfile.name}</li>
      <li class="list-group-item">Age: ${currentProfile.age}</li>
      <li class="list-group-item">Location: ${currentProfile.location}</li>
      <li class="list-group-item">
        Preference: ${currentProfile.gender} looking for ${currentProfile.lookingFor}
      </li>
    </ul>
  `;

  document.querySelector('#imageDisplay').innerHTML = `
    <img src="${currentProfile.image}" height="150px">
  `;
}

// Profile Iterator
function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < profiles.length
        ? { value: profiles[nextIndex++], done: false }
        : { done: true }
    }
  };
}