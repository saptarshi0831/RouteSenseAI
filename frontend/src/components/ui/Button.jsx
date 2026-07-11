function Button({
  children,
  loading = false,
  disabled = false,
  type = "button",
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`primary-btn ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <span className="btn-loader"></span>
          <span>Please wait...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;