import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, Target, TrendingUp, Calendar, DollarSign } from "lucide-react";

interface EvaluationStepsProps {
  firm: {
    name: string;
    evaluationSteps: number;
    maxDailyLoss: string;
    maxTotalLoss: string; 
    profitTarget: string;
    minTradingDays: number;
    consistencyRule: string | null;
    activationFee: number;
  };
}

export default function EvaluationSteps({ firm }: EvaluationStepsProps) {
  return (
    <Card className="mb-6" data-testid="evaluation-steps">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Evaluation Process
          <Badge variant="secondary" data-testid="step-count">
            {firm.evaluationSteps} Step{firm.evaluationSteps > 1 ? 's' : ''}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {/* Max Daily Loss */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg" data-testid="max-daily-loss">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium">Max Daily Loss</p>
              <p className="text-lg font-bold text-destructive">{firm.maxDailyLoss}</p>
            </div>
          </div>

          {/* Max Total Loss */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg" data-testid="max-total-loss">
            <div className="p-2 bg-destructive/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-destructive" />
            </div>
            <div>
              <p className="text-sm font-medium">Max Total Loss</p>
              <p className="text-lg font-bold text-destructive">{firm.maxTotalLoss}</p>
            </div>
          </div>

          {/* Profit Target */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg" data-testid="profit-target">
            <div className="p-2 bg-success-500/10 rounded-lg">
              <Target className="h-4 w-4 text-success-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Profit Target</p>
              <p className="text-lg font-bold text-success-500">{firm.profitTarget}</p>
            </div>
          </div>

          {/* Min Trading Days */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg" data-testid="min-trading-days">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium">Min Trading Days</p>
              <p className="text-lg font-bold">{firm.minTradingDays} days</p>
            </div>
          </div>

          {/* Activation Fee */}
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg" data-testid="activation-fee">
            <div className="p-2 bg-warning-500/10 rounded-lg">
              <DollarSign className="h-4 w-4 text-warning-500" />
            </div>
            <div>
              <p className="text-sm font-medium">Activation Fee</p>
              <p className="text-lg font-bold">${firm.activationFee}</p>
            </div>
          </div>

          {/* Consistency Rule */}
          {firm.consistencyRule && (
            <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg" data-testid="consistency-rule">
              <div className="p-2 bg-accent/10 rounded-lg">
                <CheckCircle className="h-4 w-4 text-accent-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Consistency Rule</p>
                <p className="text-sm text-muted-foreground">{firm.consistencyRule}</p>
              </div>
            </div>
          )}
        </div>

        {/* Evaluation Steps Timeline */}
        <div className="space-y-4">
          <h4 className="font-semibold">Evaluation Steps:</h4>
          <div className="flex flex-col md:flex-row gap-4">
            {Array.from({ length: firm.evaluationSteps }, (_, index) => (
              <div key={index} className="flex-1">
                <div className="flex items-center gap-3 p-4 border rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-primary-foreground rounded-full text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">
                      {index === 0 ? 'Evaluation Phase' : 'Verification Phase'}
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      {index === 0 
                        ? `Reach ${firm.profitTarget} profit target within ${firm.minTradingDays} trading days`
                        : 'Demonstrate consistency and risk management skills'
                      }
                    </p>
                  </div>
                </div>
                {index < firm.evaluationSteps - 1 && (
                  <div className="hidden md:flex justify-center mt-2">
                    <div className="w-8 h-px bg-border"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}