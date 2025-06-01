import { testProps, tid } from '@/lib/utils';

import DashboardConfig from './Dashboard.config';

const { examples } = DashboardConfig;

const Dashboard: React.FC = () => {
  return (
    <section
      className="flex flex-1 flex-col gap-6 p-6 pt-0"
      {...testProps(tid('Content'))}
    >
      <h2 className="text-xl font-semibold text-foreground">HOCs with Recompose</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {examples.map((example, index) => (
          <div
            key={index}
            className="flex items-start gap-4 rounded-xl bg-muted/50 p-4 shadow-sm"
          >
            <div className="text-muted-foreground">
              <example.icon className="w-5 h-5" />
            </div>
            <div>
              <div className="font-medium text-foreground">{example.title}</div>
              <div className="text-sm text-muted-foreground">
                {example.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;