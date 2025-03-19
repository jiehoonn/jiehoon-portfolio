import { Code2 } from 'lucide-react';

function Navigation() {
  const navItems = [
    { name: 'Home', to: 'home' },
    { name: 'Projects', to: 'projects' },
    { name: 'Resume', to: 'resume' },
    { name: 'Contact', to: 'contact' },
  ];

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed bottom-0 w-full bg-[#050505]/80 backdrop-blur-sm z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-center h-16">
          <div className="flex space-x-12">
            {navItems.map((item) => (
              <button
                key={item.to}
                onClick={() => scrollTo(item.to)}
                className="text-gray-300 hover:text-pink-500 cursor-pointer transition-colors text-lg"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;