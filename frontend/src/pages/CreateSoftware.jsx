import { useState } from "react";
import API from "../services/api";

export default function CreateSoftware() {
  const [form, setForm] = useState({ name: "", description: "", accessLevels: "" });

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/software", {
      ...form,
      accessLevels: form.accessLevels.split(",").map((l) => l.trim()),
    });
    alert("Software created");
  };

  return (
    <form onSubmit={submit}>
      <h2>Create Software</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Access Levels (comma-separated)" onChange={(e) => setForm({ ...form, accessLevels: e.target.value })} />
      <button>Create</button>
    </form>
  );
}
