import "../../styles/auth.css";

function AuthLayout({ children }) {
  return (
    <div className="auth-page">

      {/* Background Blur Circles */}
      <div className="bg-blob blob-one"></div>
      <div className="bg-blob blob-two"></div>
      <div className="bg-blob blob-three"></div>

      <div className="auth-container">

        {/* Left Side */}
        <div className="auth-left">

          <div className="brand">

            <div className="brand-icon">
              🤓
            </div>

            <h1> 📍 RouteSense AI</h1>

            <p>
              Navigate smarter.
              <br />
              Respond faster.
              <br />
              Stay connected.
            </p>

          </div>

          <div className="feature-list">

            <div className="feature-card">
              <span>📍</span>
              <p>Real-Time GPS Tracking</p>
            </div>

            <div className="feature-card">
              <span>🚨</span>
              <p>Emergency SOS</p>
            </div>

            <div className="feature-card">
              <span>🏥</span>
              <p>Nearby Hospitals</p>
            </div>

            <div className="feature-card">
              <span>🤖</span>
              <p>AI Emergency Assistant</p>
            </div>

          </div>

        </div>

        {/* Right Side */}
        <div className="auth-right">
          {children}
        </div>

      </div>

    </div>
  );
}

export default AuthLayout;