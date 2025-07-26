import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type Props = {
  boleto: {
    id: string;
    rifa_id: string;
    created_at: string;
    pagado: boolean;
    numeros_boletos: string[];
  };
};

export function BoletoCard({ boleto }: Props) {
  return (
    <Card className="bg-white text-black shadow-md border border-gray-200">
      <CardHeader>
        <CardTitle className="text-sm">
          Rifa: {boleto.rifa_id}
        </CardTitle>
        <p className="text-xs text-gray-500">
          Fecha: {new Date(boleto.created_at).toLocaleString()}
        </p>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm">
          Estado: {boleto.pagado ? 'Pagado' : 'Pendiente'}
        </p>
        <div className="flex flex-wrap gap-2">
          {boleto.numeros_boletos.map((n, i) => (
            <span
              key={i}
              className="bg-green-100 border border-green-500 px-2 py-1 text-xs rounded-full"
            >
              Boleto #{n}
            </span>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
