import React, { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const fetchUsers = async () => {
    const res = await fetch(`${API_URL}/api/users`);
    const data = await res.json();
    setUsers(data);
  };

  const addUser = async () => {
    if (!name) return alert("Name required");

    const res = await fetch(`${API_URL}/api/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const newUser = await res.json();
    setUsers([...users, newUser]);
    setName("");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>User Management</h2>
      <input
        type="text"
        value={name}
        placeholder="Enter name"
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addUser}>Add User</button>

      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
