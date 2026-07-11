import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  Construction,
  Sparkles,
} from "lucide-react";

import "../../styles/coming-soon.css";

function ComingSoon({
  title,
  description,
}) {
  const navigate = useNavigate();

  return (
    <div className="coming-container">

      <div className="coming-card">

        <div className="coming-icon">

          <Construction size={46} />

        </div>

        <h1>{title}</h1>

        <p className="coming-description">
          {description}
        </p>

        <div className="coming-info">

          <div className="coming-label">

            <Sparkles size={18} />

            <span>Coming Soon</span>

          </div>

          <p>

            This feature is currently under development.
            RouteSense AI's core emergency features are already available.

          </p>

        </div>

        <button
          className="coming-button"
          onClick={() => navigate("/dashboard")}
        >

          <ArrowLeft size={18} />

          Back to Dashboard

        </button>

      </div>

    </div>
  );
}

export default ComingSoon;