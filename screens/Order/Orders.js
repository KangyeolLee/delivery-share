import React from "react";
import {
  FlatList,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import ScreenHeader from "../../components/ScreenHeader";
import constants from "../../constants";
import styles from "../../styles";
import { getOpponent, getTimeStamp } from "../../utils";

const OrderListBar = styled.View`
  background-color: white;
  margin-top: 7.5;
  margin-bottom: 12;
`;

const OrderHeader = styled.View`
  padding-top: 12;
  padding-bottom: 12;
  padding-left: 20;
  padding-right: 20;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const OrderDate = styled.Text`
  opacity: 0.4;
`;

const OrderStatus = styled.Text`
  font-weight: bold;
  opacity: 0.7;
`;

const OrderBody = styled.View`
  padding-top: 10;
  padding-bottom: 10;
  padding-left: 20;
  padding-right: 20;
  flex-direction: row;
`;

const RestaurantImg = styled.Image`
  width: ${constants.restaurantImageSize};
  height: ${constants.restaurantImageSize};
  border-radius: ${constants.restaurantImageSize / 2};
  margin-right: 15;
`;

const OrderInfos = styled.View``;

const RestaurantName = styled.Text`
  font-size: 16;
  padding-right: 20;
  font-weight: bold;
  width: ${constants.width - 55 - constants.restaurantImageSize};
  overflow: hidden;
  margin-bottom: 5;
`;

const OpponentContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const OpponentName = styled.Text`
  opacity: 0.6;
  margin-left: 5;
  font-size: 14.5;
  margin-bottom: 3;
`;

const OrderContent = styled.Text`
  opacity: 0.6;
  font-size: 13.5;
`;

const OrderFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 10;
  margin-bottom: 15;
  padding-top: 1;
  padding-bottom: 1;
  padding-left: 20;
  padding-right: 20;
`;

const FooterBtnContainer = styled.Text`
  text-align: center;
  text-align-vertical: center;
  color: rgba(0, 0, 0, 0.75);
  width: ${(constants.width - 40) / 3 - 5};
  height: 40;
  border-radius: 5;
  border-color: ${styles.lightGrayColor};
  border-width: 1.3;
`;

const FooterBtn = ({ isAvailable, text, onPress }) =>
  isAvailable ? (
    <TouchableOpacity onPress={onPress}>
      <FooterBtnContainer>{text}</FooterBtnContainer>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity activeOpacity={1}>
      <FooterBtnContainer
        style={{ color: "rgba(0, 0, 0, 0.2)", borderColor: "#f2eded" }}
      >
        {text}
      </FooterBtnContainer>
    </TouchableOpacity>
  );

const NoOrderContainer = styled.View`
  background-color: white;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const NoOrderImage = () => (
  <View
    style={{
      padding: 30,
      paddingBottom: 20,
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Ionicons name="document-text-outline" size={120} color="#afafaf" />
    <Ionicons
      name="chatbox-ellipses-outline"
      size={60}
      color="#afafaf"
      style={{ position: "absolute", top: -10, right: 10 }}
    />
  </View>
);

const NoOrderMessage = styled.Text`
  font-size: 17;
  color: #545151;
`;

const orders = [
  {
    id: 1,
    restaurant: {
      id: 2,
      name: "엽기떡볶이 장위점",
      thumbnail:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxFnfMMuOyds6KPs2b51clDv-S3agSe84D4w&usqp=CAU",
    },
    createdAt: new Date(),
    deliveryTime: 60,
    status: "배달완료",
    users: [
      {
        id: 3,
        name: "콘요맘떼",
      },
      {
        id: 4,
        name: "Celebrity",
      },
    ],
    userReview: {},
    restaurantReview: {
      id: 1,
    },
    menus: [
      {
        menu: {
          name: "로제떡볶이",
        },
      },
      {
        menu: {
          name: "김치볶음밥",
        },
      },
    ],
  },
];

export default ({ navigation }) => {
  const renderOrderItem = ({ item: order }) => {
    // const opponent = getOpponent(order.participants, user.id);
    const opponent = getOpponent(order.users, "1");
    return (
      <>
        <OrderListBar>
          <OrderHeader>
            <OrderDate>{getTimeStamp(order.createdAt)}</OrderDate>
            <OrderStatus>{order.status}</OrderStatus>
          </OrderHeader>
          <OrderBody>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Restaurant", { id: order.restaurant.id })
              }
            >
              <RestaurantImg source={{ uri: order.restaurant.thumbnail }} />
            </TouchableOpacity>
            <OrderInfos>
              <TouchableOpacity>
                <RestaurantName numberOfLines={1}>
                  {order.restaurant.name}
                </RestaurantName>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("UserReviews", { userId: opponent.id })
                }
              >
                <OpponentContainer>
                  <FontAwesome
                    name="user"
                    size={15}
                    color="rgba(0, 0, 0, 0.6)"
                  />
                  <OpponentName>{opponent.name}</OpponentName>
                </OpponentContainer>
              </TouchableOpacity>
              <OrderContent>
                {order.menus.length > 1
                  ? `${order.menus[0].menu.name} 외 ${order.menus.length - 1}개`
                  : order.menus[0].menu.name}
              </OrderContent>
            </OrderInfos>
          </OrderBody>
          <OrderFooter>
            <FooterBtn
              isAvailable={true}
              text={"주문상세"}
              onPress={() =>
                navigation.navigate("Order", { orderId: order.id })
              }
            />
            <FooterBtn
              isAvailable={Boolean(order.restaurantReview)}
              text={"식당리뷰쓰기"}
              onPress={() =>
                navigation.navigate("WriteRestaurantReview", {
                  orderId: order.id,
                  restaurant: order.restaurant,
                  menus: order.menus,
                })
              }
            />
            <FooterBtn
              isAvailable={Boolean(order.userReview)}
              text={"유저리뷰쓰기"}
              onPress={() =>
                navigation.navigate("WriteUserReview", {
                  orderId: order.id,
                  toseq: opponent.id,
                })
              }
            />
          </OrderFooter>
        </OrderListBar>
      </>
    );
  };
  return (
    <>
      <ScreenHeader title={"주문내역"} />
      {orders && orders.length > 0 > 0 ? (
        <FlatList data={orders} renderItem={renderOrderItem} />
      ) : (
        <NoOrderContainer>
          <NoOrderImage />
          <NoOrderMessage>주문내역이 없습니다.</NoOrderMessage>
        </NoOrderContainer>
      )}
    </>
  );
};
