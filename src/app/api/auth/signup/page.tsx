import React from "react";

export default function Component() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#161b22]">
      <div
        className="signin"
        style={{
          margin: "0px",
          padding: "0px",
          boxSizing: "inherit",
          textAlign: "center",
        }}
      >
        <div
          className="card"
          style={{
            boxSizing: "inherit",
            borderRadius: "2rem",
            padding: "1.25rem 2rem",
            backgroundColor: "#0d1117",
            margin: "2rem 0px",
            width: "368px",
            display: "block",
          }}
        >
          <div
            className="provider"
            style={{ margin: "0px", padding: "0px", boxSizing: "inherit" }}
          >
            <form
              action="http://localhost:3000/api/auth/callback/credentials"
              method="POST"
              style={{
                boxSizing: "inherit",
                margin: "0px",
                padding: "0px",
                display: "block",
              }}
            >
              <input
                name="csrfToken"
                type="hidden"
                style={{
                  margin: "0px",
                  color: "#fff",
                  display: "block",
                  background: "#0d1117",
                  border: "1px solid #555",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                  boxSizing: "border-box",
                  fontSize: "1rem",
                  width: "100%",
                  marginBottom: "0.5rem",
                }}
              />
              <div
                style={{ margin: "0px", padding: "0px", boxSizing: "inherit" }}
              >
                <label
                  className="section-header"
                  htmlFor="input-username-for-credentials-provider"
                  style={{
                    margin: "0px",
                    padding: "0px",
                    boxSizing: "inherit",
                    fontWeight: 500,
                    marginBottom: "0.25rem",
                    textAlign: "left",
                    display: "block",
                    color: "#fff",
                  }}
                >
                  Username
                </label>
                <input
                  id="input-username-for-credentials-provider"
                  name="username"
                  type="text"
                  placeholder="username"
                  style={{
                    margin: "0px",
                    color: "#fff",
                    background: "#0d1117",
                    border: "1px solid #555",
                    borderRadius: "0.5rem",
                    padding: "0.5rem 1rem",
                    boxSizing: "border-box",
                    fontSize: "1rem",
                    width: "100%",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                    marginBottom: "0.5rem",
                  }}
                />
              </div>
              <div
                style={{ margin: "0px", padding: "0px", boxSizing: "inherit" }}
              >
                <label
                  className="section-header"
                  htmlFor="input-password-for-credentials-provider"
                  style={{
                    margin: "0px",
                    padding: "0px",
                    boxSizing: "inherit",
                    fontWeight: 500,
                    marginBottom: "0.25rem",
                    textAlign: "left",
                    display: "block",
                    color: "#fff",
                  }}
                >
                  Password
                </label>
                <input
                  id="input-password-for-credentials-provider"
                  name="password"
                  type="password"
                  style={{
                    margin: "0px",
                    color: "#fff",
                    display: "block",
                    background: "#0d1117",
                    border: "1px solid #555",
                    borderRadius: "0.5rem",
                    padding: "0.5rem 1rem",
                    boxSizing: "border-box",
                    fontSize: "1rem",
                    width: "100%",
                    marginBottom: "0.5rem",
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  margin: "0px",
                  boxSizing: "inherit",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  transition: "all 0.1s ease-in-out 0s",
                  alignItems: "center",
                  backgroundColor: "var(--provider-bg)",
                  color: "var(--provider-color,#ccc)",
                  display: "flex",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  justifyContent: "center",
                  minHeight: "62px",
                  position: "relative",
                  width: "100%",
                }}
              >
                Sign in with Credentials
              </button>
            </form>
            <hr
              style={{
                padding: "0px",
                boxSizing: "inherit",
                borderRight: "0px",
                borderBottom: "0px",
                borderLeft: "0px",
                borderImage: "initial",
                borderTop: "1px solid #444",
                margin: "2rem auto 1rem",
                overflow: "visible",
                display: "block",
              }}
            />
          </div>
          <div
            className="provider"
            style={{
              margin: "0px",
              padding: "0px",
              boxSizing: "inherit",
              marginTop: "1rem",
            }}
          >
            <form
              action="http://localhost:3000/api/auth/signin/google"
              method="POST"
              style={{
                boxSizing: "inherit",
                margin: "0px",
                padding: "0px",
                display: "block",
              }}
            >
              <input
                name="csrfToken"
                type="hidden"
                style={{
                  margin: "0px",
                  color: "#fff",
                  display: "block",
                  background: "#0d1117",
                  border: "1px solid #555",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                  boxSizing: "border-box",
                  fontSize: "1rem",
                  width: "100%",
                  marginBottom: "0.5rem",
                }}
              />
              <input
                name="callbackUrl"
                type="hidden"
                defaultValue="http://localhost:3000/dashboard/users"
                style={{
                  margin: "0px",
                  color: "#fff",
                  display: "block",
                  background: "#0d1117",
                  border: "1px solid #555",
                  borderRadius: "0.5rem",
                  padding: "0.5rem 1rem",
                  boxSizing: "border-box",
                  fontSize: "1rem",
                  width: "100%",
                  marginBottom: "0.5rem",
                }}
              />
              <button
                className="button"
                type="submit"
                style={{
                  margin: "0px",
                  boxSizing: "inherit",
                  borderColor: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem 1rem",
                  transition: "all 0.1s ease-in-out 0s",
                  alignItems: "center",
                  backgroundColor: "#fff",
                  color: "var(--provider-color,#ccc)",
                  display: "flex",
                  fontSize: "1.1rem",
                  fontWeight: 500,
                  justifyContent: "center",
                  minHeight: "62px",
                  position: "relative",
                  width: "100%",
                }}
              >
                <img
                  id="provider-logo"
                  height={24}
                  width={24}
                  src="https://authjs.dev/img/providers/google.svg"
                  style={{
                    margin: "0px",
                    padding: "0px",
                    boxSizing: "inherit",
                    width: "25px",
                    display: "none",
                  }}
                />
                <img
                  id="provider-logo-dark"
                  height={24}
                  width={25}
                  src="https://authjs.dev/img/providers/google.svg"
                  style={{
                    margin: "0px",
                    padding: "0px",
                    boxSizing: "inherit",
                    width: "25px",
                    display: "block",
                  }}
                />
                <span
                  style={{
                    margin: "0px",
                    padding: "0px",
                    boxSizing: "inherit",
                    flexGrow: 1,
                  }}
                >
                  Sign in with Google
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      <style
        dangerouslySetInnerHTML={{
          __html: `
html {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
}

body {
  box-sizing: inherit;
  margin: 0px;
  padding: 0px;
  background-color: #161b22;
  font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
`,
        }}
      />
    </div>
  );
}
