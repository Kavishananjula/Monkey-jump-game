import "./Footer.css";

export const Footer = () => {
  return (
    <div className="copyright">Copyright © {new Date().getFullYear()} {" "}
      <a href="" target="_blank" rel="noreferrer" className="copyright-link">Kavishan</a>
    </div>
  )
}
