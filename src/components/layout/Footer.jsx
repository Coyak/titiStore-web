const Footer = () => {
  return (
    <footer className="bg-brand-darker text-gray-400 py-8 mt-auto border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-2xl font-bold text-brand-orange">titiStore</span>
            <p className="text-sm mt-1">Tu tienda de tecnología favorita.</p>
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="hover:text-brand-orange transition-colors">Términos</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Privacidad</a>
            <a href="#" className="hover:text-brand-orange transition-colors">Contacto</a>
          </div>
        </div>
        <div className="mt-8 text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} titiStore. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
