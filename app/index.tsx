/// import router สำหรับเปลี่ยนหน้า
import { router } from "expo-router";

/// import useEffect สำหรับทำงานตอนเปิดหน้า
import { useEffect } from "react";

/// import component ต่าง ๆ ของ React Native
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";

/// function หลักของหน้า index
export default function Index() {
  /// useEffect จะทำงานทันทีเมื่อเปิดหน้า
  useEffect(() => {
    /// ตั้งเวลา 3 วินาที ก่อนเปลี่ยนหน้า
    const timer = setTimeout(() => {
      /// เปลี่ยนไปหน้า taxi_fare
      router.replace("/taxi_fare");
    }, 3000);

    /// clear timeout เมื่อออกจากหน้า
    return () => clearTimeout(timer);
  }, []);

  return (
    /// container หลัก
    <View style={styles.container}>
      {/* รูปโลโก้ taxi */}
      <Image
        source={require("../assets/images/taxi.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* หัวข้อ */}
      <Text style={styles.title}>Taxi Fare Calculator</Text>

      {/* คำอธิบาย */}
      <Text style={styles.subtitle}>คำนวณค่าโดยสารแท็กซี่</Text>

      {/* loading animation */}
      <ActivityIndicator size="large" color="#F4B400" />

      {/* กล่อง profile */}
      <View style={styles.profileBox}>
        {/* รูปโปรไฟล์ */}
        <Image
          source={require("../assets/images/Profiles.jpg")}
          style={styles.profile}
        />

        {/* ชื่อ */}
        <Text style={styles.name}>พัฒนาโดย</Text>

        {/* รหัสนักศึกษา */}
        <Text style={styles.studentId}>6852D10037 Teerawat Sutipo</Text>
      </View>
    </View>
  );
}

/// Style ของหน้า
const styles = StyleSheet.create({
  /// container หลัก
  container: {
    flex: 1,

    /// พื้นหลังสีดำ
    backgroundColor: "#0F0F0F",

    justifyContent: "center",

    alignItems: "center",

    padding: 20,
  },

  /// รูป taxi
  logo: {
    width: 170,

    height: 170,

    marginBottom: 20,
  },

  /// title
  title: {
    fontSize: 28,

    fontWeight: "bold",

    /// สีทอง
    color: "#FFD54F",

    letterSpacing: 1,

    marginBottom: 5,
  },

  /// subtitle
  subtitle: {
    fontSize: 15,

    /// สีเทาอ่อน
    color: "#CFCFCF",

    marginBottom: 20,
  },

  /// loading
  loading: {
    marginTop: 5,

    marginBottom: 10,
  },

  /// กล่อง profile
  profileBox: {
    position: "absolute",

    bottom: 40,

    alignItems: "center",

    backgroundColor: "#1A1A1A",

    paddingVertical: 15,

    paddingHorizontal: 30,

    borderRadius: 20,

    borderWidth: 1,

    borderColor: "#333",
  },

  /// รูป profile
  profile: {
    width: 90,

    height: 90,

    borderRadius: 45,

    marginBottom: 10,

    borderWidth: 2,

    borderColor: "#FFD54F",
  },

  /// ชื่อ
  name: {
    fontSize: 16,

    fontWeight: "bold",

    color: "#FFFFFF",

    marginBottom: 3,
  },

  /// รหัสนักศึกษา
  studentId: {
    fontSize: 13,

    color: "#BBBBBB",
  },
});
