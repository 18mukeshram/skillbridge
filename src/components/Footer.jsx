const Footer = () => {
  return (
    <footer className="border-t border-slate-800 bg-slate-900/80">
      <div className="max-w-6xl mx-auto px-4 py-3 text-xs text-slate-400 flex justify-between">
        <span>© {new Date().getFullYear()} SkillBridge</span>
        <span>Built by Mukesh Ram 🚀</span>
      </div>
    </footer>
  );
};

export default Footer;
