import { USDETH, USDTUSDETH } from "@/components/config/Eth";
import { USDMATIC, USDTUSDMATIC } from "@/components/config/Polygon";
import { PriceFeed } from "@/components/core/priceFeed";
import { EthereumIcon } from "@/components/icons/ethereumIcon";
import { MaticIcon } from "@/components/icons/maticIcon";
import { RPC_URL_ETH_KEY, RPC_URL_POLYGON_KEY } from "@/constants/RpcURL";
import React from "react";
import { FC } from "react";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Chain } from "viem";
import CustomText from "../customText";
import { UsdtIcon } from "@/components/icons/usdtIcon";

const { width } = Dimensions.get("window");

interface LiveFeedContainerT {
  openModal: () => void;
  isConnected: boolean;
  chain: Chain | undefined;
  modalVisible: boolean;
}

export const LiveFeedContainer: FC<LiveFeedContainerT> = ({
  openModal,
  isConnected,
  chain,
  modalVisible,
}) => {
  return (
    <>
      <TouchableOpacity style={styles.middleContainer} onPress={openModal}>
        {isConnected && (
          <>
            {chain && chain.id === 1 ? (
              <PriceFeed
                name="ETH"
                icon={EthereumIcon}
                rpcContract={USDETH}
                rpcKey={RPC_URL_ETH_KEY}
                modal={true}
                modalType={modalVisible}
              />
            ) : (
              <PriceFeed
                name="POL"
                icon={MaticIcon}
                rpcContract={USDMATIC}
                rpcKey={RPC_URL_POLYGON_KEY}
                modal={true}
                modalType={modalVisible}
              />
            )}
          </>
        )}
      </TouchableOpacity>

      {/* Modal Component */}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={openModal}
      >
        <TouchableOpacity
          style={styles.modalBackdrop}
          activeOpacity={1} // Prevent accidental clicks through to the background
          onPress={openModal}
        >
          <View
            style={styles.modalContent}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.feedContainer}>
              <CustomText style={styles.headerText}>Live Prices</CustomText>
              <PriceFeed
                name="ETH"
                icon={EthereumIcon}
                rpcContract={USDETH}
                rpcKey={RPC_URL_ETH_KEY}
                containerStyle={styles.feedBox}
              />

              <PriceFeed
                name="POL"
                icon={MaticIcon}
                rpcContract={USDMATIC}
                rpcKey={RPC_URL_POLYGON_KEY}
                containerStyle={styles.feedBox}
              />

              {chain && chain.id === 1 ? (
                <PriceFeed
                  name="USDT"
                  icon={UsdtIcon}
                  rpcContract={USDTUSDETH}
                  rpcKey={RPC_URL_ETH_KEY}
                  containerStyle={styles.feedBox}
                />
              ) : (
                <PriceFeed
                  name="USDT"
                  icon={UsdtIcon}
                  rpcContract={USDTUSDMATIC}
                  rpcKey={RPC_URL_POLYGON_KEY}
                  containerStyle={styles.feedBox}
                />
              )}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  middleContainer: {
    backgroundColor: "#1A1A1A",
    borderRadius: 22,
    position: "relative",
    zIndex: 3,
    width: "100%",
    paddingVertical: 20,
    paddingHorizontal: 25,
    gap: 10,
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: width,
    height: "auto",
    padding: 20,
    backgroundColor: "#0E0E0E",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  feedContainer: {
    marginTop: 10,
    marginBottom: 70,
    gap: 5,
  },
  feedBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#151515",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#03AE79",
    marginBottom: 20,
  },
});
