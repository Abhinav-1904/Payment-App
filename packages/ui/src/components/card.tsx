import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import { Button } from "./ui/button";
import React from "react";

export function Createdcard({
  title,
  Carddescription,
  children,
  cardfooter,
  onDeposit
}: {
  className?: string,
  title: string,
  Carddescription?:string,
  children: React.ReactNode,
  cardfooter?:string,
  onDeposit?:(e: React.MouseEvent<HTMLButtonElement>)=>void
}): JSX.Element {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {Carddescription && <CardDescription>Card Description</CardDescription>}
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
      {cardfooter &&
        <CardFooter className="flex justify-center">
          <Button variant="default" onClick={onDeposit}>
            {cardfooter}
          </Button>
        </CardFooter>
      }
  </Card>

  );
}
