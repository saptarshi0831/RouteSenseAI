import Button from "../ui/Button";

function ShareModal({
  isOpen,
  onClose,
  shareUrl,
  expiresAt,
}) {
  if (!isOpen) return null;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    alert("Link copied!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl">

        <h2 className="text-2xl font-bold">
          📤 Live Location Sharing
        </h2>

        <p className="mt-2 text-slate-500">
          Share this link with someone you trust.
        </p>

        <div className="mt-6 rounded-xl bg-slate-100 p-4">

          <label className="text-sm text-slate-500">
            Share Link
          </label>

          <input
            readOnly
            value={shareUrl}
            className="mt-2 w-full rounded-lg border bg-white p-3"
          />

        </div>

        <div className="mt-4 rounded-xl bg-blue-50 p-4">

          <p className="text-sm text-slate-600">
            ⏳ Expires
          </p>

          <p className="font-semibold">
            {new Date(expiresAt).toLocaleString()}
          </p>

        </div>

        <div className="mt-4 rounded-xl bg-green-50 p-4">

          <p className="font-semibold text-green-700">
            🟢 Sharing Live
          </p>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <Button
            className="bg-slate-600 hover:bg-slate-700"
            onClick={onClose}
          >
            Close
          </Button>

          <Button
            onClick={handleCopy}
          >
            📋 Copy Link
          </Button>

        </div>

      </div>

    </div>
  );
}

export default ShareModal;