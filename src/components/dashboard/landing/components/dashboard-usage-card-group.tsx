import { Gift, Trophy, Ticket, DollarSign } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const cards = [
  {
    title: 'Rifas activas',
    icon: <Gift className="text-[#000000]" size={18} />,
    value: '5',
    change: '2 nuevas esta semana',
  },
  {
    title: 'Rifas finalizadas',
    icon: <Trophy className="text-[#000000]" size={18} />,
    value: '12',
    change: '1 esta semana',
  },
  {
    title: 'Boletos vendidos',
    icon: <Ticket className="text-[#000000]" size={18} />,
    value: '1,274',
    change: '+9% respecto al mes anterior',
  },
  {
    title: 'Total recaudado',
    icon: <DollarSign className="text-[#000000]" size={18} />,
    value: '$1.340.000',
    change: '+15% este mes',
  },
];

export function DashboardUsageCardGroup() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
      {cards.map((card) => (
        <Card
          key={card.title}
          className="bg-background/50 backdrop-blur-[24px] border-border p-6"
        >
          <CardHeader className="p-0 space-y-0">
            <CardTitle className="flex justify-between items-center mb-6">
              <span className="text-base leading-4">{card.title}</span>
              {card.icon}
            </CardTitle>
            <CardDescription className="text-[32px] leading-[32px] text-black">
              {card.value}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-sm leading-[14px] pt-2 text-secondary">
              {card.change}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
