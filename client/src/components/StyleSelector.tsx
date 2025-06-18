import { Briefcase, MessageCircle, GraduationCap, Palette } from "lucide-react";

interface StyleSelectorProps {
  selectedStyle: string;
  onStyleSelect: (style: string) => void;
}

const styles = [
  {
    id: "professional",
    name: "Professional",
    description: "Formal, clear, and business-appropriate language",
    icon: Briefcase,
    color: "text-primary"
  },
  {
    id: "casual",
    name: "Casual", 
    description: "Relaxed, conversational, and friendly tone",
    icon: MessageCircle,
    color: "text-secondary"
  },
  {
    id: "academic",
    name: "Academic",
    description: "Scholarly, precise, and research-oriented",
    icon: GraduationCap,
    color: "text-accent"
  },
  {
    id: "creative",
    name: "Creative",
    description: "Expressive, imaginative, and artistic language",
    icon: Palette,
    color: "text-amber-500"
  }
];

export default function StyleSelector({ selectedStyle, onStyleSelect }: StyleSelectorProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">Choose Your Writing Style</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {styles.map((style) => {
          const Icon = style.icon;
          const isSelected = selectedStyle === style.id;
          
          return (
            <div
              key={style.id}
              className={`
                border-2 rounded-lg p-4 cursor-pointer transition-colors
                ${isSelected 
                  ? 'border-primary bg-blue-50' 
                  : 'border-slate-200 hover:border-primary hover:bg-blue-50'
                }
              `}
              onClick={() => onStyleSelect(style.id)}
            >
              <div className="text-center">
                <Icon className={`mx-auto h-8 w-8 ${style.color} mb-3`} />
                <h4 className="font-semibold text-slate-900 mb-2">{style.name}</h4>
                <p className="text-sm text-slate-600">{style.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
