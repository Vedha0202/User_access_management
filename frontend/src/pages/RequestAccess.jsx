import { useEffect, useState } from "react";
import API from "../services/api";

export default function RequestAccess() {
  const [softwares, setSoftwares] = useState([]);
  const [form, setForm] = useState({ softwareId: "", accessType: "", reason: "" });

  useEffect(() => {
    API.get("/software").then((res) => setSoftwares(res.data));
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/requests", form);
    alert("Request submitted");
  };

  return (
    <form onSubmit={submit}>
      <h2>Request Access</h2>
      <select onChange={(e) => setForm({ ...form, softwareId: e.target.value })}>
        <option value="">Select Software</option>
        {softwares.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
      </select>
      <input placeholder="Access Type (Read/Write/Admin)" onChange={(e) => setForm({ ...form, accessType: e.target.value })} />
      <textarea placeholder="Reason" onChange={(e) => setForm({ ...form, reason: e.target.value })} />
      <button>Submit Request</button>
    </form>
  );
}
