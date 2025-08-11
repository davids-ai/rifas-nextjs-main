import { Gift, Trophy, Ticket, Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const userCards = [
  {
    title: 'Mis rifas activas',
    icon: <Gift className="text-[#000000]" size={18} />,
    value: '3',
    change: 'Participas en 3 rifas activas',
  },
  {
    title: 'Boletos comprados',
    icon: <Ticket className="text-[#000000]" size={18} />,
    value: '15',
    change: 'En total, este mes',
  },
  {
    title: 'Rifas ganadas',
    icon: <Trophy className="text-[#000000]" size={18} />,
    value: '1',
    change: '¡Felicidades! 🏆',
  },
  {
    title: 'Próximos sorteos',
    icon: <Calendar className="text-[#000000]" size={18} />,
    value: '2',
    change: 'En los próximos 7 días',
  },
];

export function DashboardUsageCardGroup() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
      {userCards.map((card) => (
        <Card key={card.title} className="bg-background/50 backdrop-blur-[24px] border-border p-6">
          <CardHeader className="p-0 space-y-0">
            <CardTitle className="flex justify-between items-center mb-6">
              <span className="text-base leading-4">{card.title}</span>
              {card.icon}
            </CardTitle>
            <CardDescription className="text-[32px] leading-[32px] text-black">{card.value}</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="text-sm leading-[14px] pt-2 text-secondary">{card.change}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
