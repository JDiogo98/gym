import LoadingSpinner from "@/components/Loading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export interface WorkoutCardProps {
  title: string;
  value: string;
  change: number;
}

interface WorkoutCardsProps {
  stats: WorkoutCardProps[] | null;
  loading: boolean;
}

const WorkoutCards: React.FC<WorkoutCardsProps> = ({ stats, loading }) => {
  if (loading) {
    return (
      <>
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <LoadingSpinner></LoadingSpinner>
          </Card>
        ))}
      </>
    );
  }

  return (
    <>
      {stats?.map((stat, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.change.toString() == "0.00%" ||
              stat.change.toString()[0] == "-"
                ? `${stat.change }`
                : `+${stat.change}`}{" "}
              em relação ao período anterior
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
export default WorkoutCards;
