import { CheckIcon } from '@phosphor-icons/react';
import { cn } from '@/lib/utils/cn';

interface Step {
  number: number;
  label: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <div key={step.number} className="flex items-center flex-1">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                    isCompleted && 'bg-primary text-primary-foreground',
                    isActive && 'bg-primary text-primary-foreground ring-2 ring-primary ring-offset-2',
                    !isCompleted && !isActive && 'bg-muted text-muted-foreground'
                  )}
                >
                  {isCompleted ? (
                    <CheckIcon className="h-4 w-4" weight="bold" />
                  ) : (
                    step.number
                  )}
                </div>
                <span
                  className={cn(
                    'text-xs mt-2 text-center',
                    isActive ? 'text-foreground font-medium' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-2 mt-[-20px]',
                    isCompleted ? 'bg-primary' : 'bg-muted'
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
