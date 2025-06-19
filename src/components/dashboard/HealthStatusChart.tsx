'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface HealthStatusChartProps {
  healthy: number;
  risky: number;
  unhealthy: number;
}

export default function HealthStatusChart({ healthy, risky, unhealthy }: Readonly<HealthStatusChartProps>) {
  const data = [
    { name: 'Healthy', value: healthy, color: '#10B981' },
    { name: 'Risky', value: risky, color: '#F59E0B' },
    { name: 'Unhealthy', value: unhealthy, color: '#EF4444' },
  ];

  const total = healthy + risky + unhealthy;

  return (
    <div className="bg-white rounded-2xl p-4 shadow relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/10 backdrop-blur-sm z-0" />
      <div className="relative z-10">
        <h3 className="text-sm font-medium text-gray-500 mb-2">System Health Status</h3>
        <div className="h-[120px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={35}
                outerRadius={45}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(8px)',
                  borderRadius: '0.5rem',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                }}
                formatter={(value: number) => [`${((value / total) * 100).toFixed(1)}%`, '']}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between items-center mt-2 text-sm">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-gray-600">{item.name}</span>
              <span className="font-medium">{((item.value / total) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
