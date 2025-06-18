import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <i className="fas fa-cat text-white text-lg"></i>
            </div>
            <h1 className="text-xl font-bold text-slate-900">DocKitty</h1>
            <span className="text-sm text-slate-500 hidden sm:inline">AI Grammar Correction</span>
          </div>
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-slate-600 hover:text-slate-900 text-sm font-medium">Features</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 text-sm font-medium">Pricing</a>
            <a href="#" className="text-slate-600 hover:text-slate-900 text-sm font-medium">Support</a>
            <Button className="bg-primary text-white hover:bg-blue-600">
              Sign In
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
