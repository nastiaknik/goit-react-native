import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Keyboard,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import styles from "./CommentsScreenStyles";
const { format } = require("date-fns");

function formatDate(date) {
  return format(date, "dd MMMM',' yyyy | HH:mm", {
    locale: require("date-fns/locale/uk"),
  });
}

const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [createdAt, setCreatedAt] = useState(new Date());
  const [comments, setComments] = useState([
    {
      username: "duckness",
      comment: "nice",
      createdAt: new Date("2023-07-25T12:34:56"),
    },
    {
      username: "nugget",
      comment: "<3",
      createdAt: new Date("2023-07-25T15:12:34"),
    },
    {
      username: "qwerty",
      comment: "😍",
      createdAt: new Date(),
    },
  ]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { photo } = route?.params?.post;
  const username = "nugget";

  const onSubmitComment = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    setComments([...comments, { username, comment, createdAt }]);
    setComment("");
    setCreatedAt(new Date());
  };

  const dataList = [{ uri: photo }, ...comments];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
      style={styles.container}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dataList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return (
              <View
                style={{
                  paddingTop: 32,
                }}
              >
                <Image
                  source={{ uri: photo }}
                  style={{
                    height: 240,
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: 8,
                  }}
                />
              </View>
            );
          } else {
            return (
              <View
                style={{
                  flexDirection:
                    item.username !== username ? "row-reverse" : "row",
                  justifyContent: "space-between",
                  marginTop: 32,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    backgroundColor: "rgba(0, 0, 6, 0.03)",
                    marginRight: item.username === username ? 20 : 0,
                    marginLeft: item.username !== username ? 20 : 0,
                    overflow: "hidden",
                    borderRadius: 10,
                    padding: 16,
                  }}
                >
                  <Text
                    style={{
                      overflow: "hidden",
                      fontSize: 13,
                      lineHeight: 18,
                      color: "#212121",
                      fontWeight: "700",
                      textAlign: item.username !== username ? "left" : "right",
                    }}
                  >
                    {item.username}
                  </Text>
                  <Text
                    style={{
                      overflow: "hidden",
                      fontSize: 13,
                      lineHeight: 18,
                      color: "#212121",
                      marginBottom: 8,
                    }}
                  >
                    {item.comment}
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "#BDBDBD",
                      textAlign: item.username !== username ? "left" : "right",
                    }}
                  >
                    {formatDate(new Date(item.createdAt || new Date()))}
                  </Text>
                </View>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: 14,
                    backgroundColor: "#E8E8E8",
                  }}
                ></View>
              </View>
            );
          }
        }}
      />

      <View style={styles.input}>
        <TextInput
          style={styles.inputText}
          value={comment}
          placeholder="Коментувати..."
          onChangeText={(text) => setComment(text)}
          onFocus={() => setIsShowKeyboard(true)}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={onSubmitComment}>
          <AntDesign name="arrowup" size={14} color="#ffffff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default CommentsScreen;
