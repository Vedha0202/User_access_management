import { useEffect, useState } from "react";
import API from "../services/api";

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    API.get("/requests").then((res) => setRequests(res.data));
  }, []);

  const updateStatus = async (id, status) => {
    await API.patch(`/requests/${id}`, { status });
    setRequests((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div>
      <h2>Pending Requests</h2>
      {requests.map((req) => (
        <div key={req.id}>
          <p><strong>{req.user.username}</strong> requested <strong>{req.accessType}</strong> for <strong>{req.software.name}</strong></p>
          <p>Reason: {req.reason}</p>
          <button onClick={() => updateStatus(req.id, "Approved")}>Approve</button>
          <button onClick={() => updateStatus(req.id, "Rejected")}>Reject</button>
        </div>
      ))}
    </div>
  );
}
