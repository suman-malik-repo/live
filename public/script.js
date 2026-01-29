const searchInput = document.getElementById("search");
const results = document.getElementById("results");

let debounceTimer = null;

searchInput.addEventListener("keyup", () => {
  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(async () => {
    const query = searchInput.value.trim();

    if (!query) {
      results.innerHTML = "";
      return;
    }

    try {
      const response = await fetch(`/api/hello?q=${encodeURIComponent(query)}`);
      const data = await response.json();

      results.innerHTML = "";

      if (data.length === 0) {
        results.innerHTML = "<li>No results found</li>";
        return;
      }

      data.forEach(order => {
        const li = document.createElement("li");
        li.innerHTML = `
          <div class="name">${order.customer_name}</div>
          <div class="status">Status: ${order.status}</div>
          <small>${order.created_at}</small>
        `;
        results.appendChild(li);
      });
    } catch (err) {
      console.error(err);
      results.innerHTML = "<li>Error fetching data</li>";
    }
  }, 300); // debounce delay
});
