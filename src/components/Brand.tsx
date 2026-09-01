export function Brand() {
  return (
    <a className="brand" href="/" aria-label="SyncPro home">
      <span className="logo">
        <img src="/logo.png" alt="SyncPro" style={{ width: 22, height: 22, objectFit: "contain" }} />
      </span>
      <span className="brand-name">
        Sync<b>Pro</b>
      </span>
    </a>
  );
}
