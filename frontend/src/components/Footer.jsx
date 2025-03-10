const Footer = () => {
    return (
      <footer className="bg-gray-200 text-gray-700 py-6 mt-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <h3 className="font-bold mb-2">Kleinanzeigen</h3>
              <ul>
                <li><a href="#">Über uns</a></li>
                <li><a href="#">Karriere</a></li>
                <li><a href="#">Presse</a></li>
                <li><a href="#">Mobile Apps</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Informationen</h3>
              <ul>
                <li><a href="#">Hilfe</a></li>
                <li><a href="#">Datenschutz</a></li>
                <li><a href="#">Nutzungsbedingungen</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Für Unternehmen</h3>
              <ul>
                <li><a href="#">PRO für Unternehmen</a></li>
                <li><a href="#">Werben auf Kleinanzeigen</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Social Media</h3>
              <ul>
                <li><a href="#">Facebook</a></li>
                <li><a href="#">Instagram</a></li>
                <li><a href="#">YouTube</a></li>
              </ul>
            </div>
          </div>
          <p className="text-center mt-4 text-sm">
            © {new Date().getFullYear()} Kleinanzeigen.de - Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  