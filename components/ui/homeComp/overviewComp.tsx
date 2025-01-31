import React from "react";
import { FC } from "react";
import CustomText from "../customText";
import { useFetchTransactions } from "@/hooks/useFetchTransactions";

export const OverviewComp: FC = () => {
  const { data, isError, isLoading } = useFetchTransactions();

  console.log(data);

  return (
    <>
      <CustomText style={{ color: "#fff" }}>Hello there</CustomText>
    </>
  );
};
