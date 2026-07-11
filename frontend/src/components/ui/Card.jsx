import "../../styles/card.css";

function Card({
  title,
  subtitle,
  actions,
  children,
  className = "",
}) {
  return (
    <div className={`app-card ${className}`}>
      {(title || subtitle || actions) && (
        <div className="card-header">
          <div>
            {title && <h2 className="card-title">{title}</h2>}

            {subtitle && (
              <p className="card-subtitle">{subtitle}</p>
            )}
          </div>

          {actions && (
            <div className="card-actions">{actions}</div>
          )}
        </div>
      )}

      <div className="card-content">{children}</div>
    </div>
  );
}

export default Card;