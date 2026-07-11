function AuthCard({ icon, title, subtitle, children }) {
  return (
    <div className="auth-card">
      <div className="auth-card-header">
        <div className="card-icon">{icon}</div>

        <h2>{title}</h2>

        <p>{subtitle}</p>
      </div>

      <div className="auth-card-body">
        {children}
      </div>
    </div>
  );
}

export default AuthCard;