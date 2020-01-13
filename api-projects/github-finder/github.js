class GitHub {
  constructor() {
    this.client_id = '6538c1f9f1a2d330e5db';
    this.client_secret = 'b67919367f9426806f32356a4f04e2f5677d3e34';
    this.repos_count = 5;
    this.repos_sort = 'created: asc';
  }

  async getUser(user) {
    const clientId = `client_id=${this.client_id}`;
    const clientSecret = `client_secret=${this.client_secret}`;
    const reposCount = `per_page=${this.repos_count}`;
    const reposSort = `sort=${this.repos_sort}`;

    const profileResponse = await fetch(
      `https://api.github.com/users/${user}?${clientId}&${clientSecret}`
    );
    const repoResponse = await fetch(
      `https://api.github.com/users/${user}/repos?${clientId}&${clientSecret}&${reposCount}&${reposSort}`
    );

    const profile = await profileResponse.json();
    const repos = await repoResponse.json();

    return {
      profile,
      repos
    }
  }
}