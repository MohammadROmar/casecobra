import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatPrice } from '@/utils/format-price';
import { Progress } from '@/components/ui/progress';

type IncomeProps = {
  title: string;
  income: number;
  goal: number;
};

export default function Income({ title, income, goal }: IncomeProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="order-2 text-4xl">
          {formatPrice(income)}
        </CardTitle>
        <CardDescription className="order-1">{title}</CardDescription>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground text-sm">
          of {formatPrice(goal)} goal
        </p>
      </CardContent>

      <CardFooter>
        <Progress value={(income / goal) * 100} />
      </CardFooter>
    </Card>
  );
}
