import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createShareSession } from "../../api/share.api";

import ShareModal from "./ShareModal";

function ShareButton() {
  const [loading, setLoading] = useState(false);
  const [shareData, setShareData] = useState(null);

  const navigate = useNavigate();

  const handleShare = async () => {
    try {
      setLoading(true);

      const response = await createShareSession();

      setShareData(response.data);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to create session"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleGoToSession = () => {
    navigate(`/share/${shareData.shareCode}`);
  };

  return (
    <>
      <button
        onClick={handleShare}
        className="
          rounded-xl
          bg-blue-600
          px-5
          py-3
          text-white
          hover:bg-blue-700
        "
      >
        {loading ? "Creating..." : "📤 Share Live Location"}
      </button>

      <ShareModal
        isOpen={!!shareData}
        onClose={() => setShareData(null)}
        shareUrl={shareData?.shareUrl}
        expiresAt={shareData?.expiresAt}
        onOpenSession={handleGoToSession}
      />
    </>
  );
}

export default ShareButton;