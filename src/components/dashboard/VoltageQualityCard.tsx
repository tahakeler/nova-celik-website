'use client';

interface VoltageQualityCardProps {
  title: string;
  fluctuation: number;
  harmonics: number;
}

export default function VoltageQualityCard({ title, fluctuation, harmonics }: Readonly<VoltageQualityCardProps>) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm z-0" />
      <div className="relative z-10">
        <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-gray-400">Voltage Fluctuation</p>
            <p className="text-lg font-semibold text-gray-700">{fluctuation.toFixed(2)}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-400">Voltage Harmonics</p>
            <p className="text-lg font-semibold text-gray-700">{harmonics.toFixed(2)}%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
