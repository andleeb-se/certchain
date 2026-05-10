import React from "react";

const Sidebar = ({ setPage, active, open, setOpen }) => {
  return (
    <>
      <div className={`sidebar ${open ? "active" : ""}`}>
        <span className="close" onClick={() => setOpen(false)}>×</span>

        <h2>CertChain</h2>

        <ul>
          <li
            className={active === "dashboard" ? "active" : ""}
            onClick={() => {
              setPage("dashboard");
              setOpen(false);
            }}
          >
            Dashboard
          </li>

          <li
            className={active === "upload" ? "active" : ""}
            onClick={() => {
              setPage("upload");
              setOpen(false);
            }}
          >
            Upload Certificate
          </li>

          <li
            className={active === "certificates" ? "active" : ""}
            onClick={() => {
              setPage("certificates");
              setOpen(false);
            }}
          >
            Certificates
          </li>

          <li
            className={active === "verify" ? "active" : ""}
            onClick={() => {
              setPage("verify");
              setOpen(false);
            }}
          >
            Verify
          </li>
        </ul>
      </div>

      {open && <div className="overlay" onClick={() => setOpen(false)}></div>}
    </>
  );
};

export default Sidebar;