import { usePriceFeed } from "@/hooks/usePriceFeed";
import { ChainProps } from "@/utils";
import CustomText from "../ui/customText";
import { View } from "react-native";

export const PriceFeed = ({ rpcContract, rpcKey, icon, name }: ChainProps) => {
  const { data: priceFeed } = usePriceFeed(rpcKey, rpcContract);

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        {icon({ containerStyle: { width: 40, height: 40 } })}
        <View style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <CustomText
            style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}
          >
            {name}
          </CustomText>

          <CustomText style={{ color: "#c7c7c7" }}>Live Price</CustomText>
        </View>
      </View>

      <CustomText style={{ fontSize: 18, fontWeight: "bold", color: "#fff" }}>
        ${priceFeed?.toFixed(2)}
      </CustomText>
    </View>
  );
};
