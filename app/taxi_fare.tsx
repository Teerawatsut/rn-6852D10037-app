/// import React และ useState สำหรับจัดการข้อมูลในหน้า
import React, { useState } from "react";

/// import component ต่าง ๆ ของ React Native
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

/// function หลักของหน้า Taxi Fare
export default function TaxiFare() {
  /// state เก็บค่าระยะทาง
  const [distance, setDistance] = useState("");

  /// state เก็บเวลารถติด
  const [traffic, setTraffic] = useState("");

  /// state เก็บค่าโดยสาร
  const [fare, setFare] = useState(0);

  /// function คำนวณค่าโดยสาร
  const calculateFare = () => {
    /// แปลงค่าระยะทางจาก string เป็น number
    const km = Number(distance);

    /// แปลงค่าเวลารถติดจาก string เป็น number
    const trafficMinute = Number(traffic);

    /// ตรวจสอบว่ากรอกข้อมูลครบหรือไม่
    if (
      distance === "" ||
      traffic === "" ||
      isNaN(km) ||
      isNaN(trafficMinute)
    ) {
      Alert.alert("แจ้งเตือน", "กรุณากรอกข้อมูลให้ครบ");
      return;
    }

    /// ค่าเริ่มต้นแท็กซี่ 35 บาท
    let total = 35;

    /// กิโลเมตรที่ 2 - 10 คิดกิโลเมตรละ 6.50 บาท
    if (km > 1 && km <= 10) {
      total += (km - 1) * 6.5;
    }

    /// กิโลเมตรที่ 11 - 20 คิดกิโลเมตรละ 7 บาท
    else if (km <= 20) {
      total += 9 * 6.5;
      total += (km - 10) * 7;
    }

    /// กิโลเมตรที่ 21 - 40 คิดกิโลเมตรละ 8 บาท
    else if (km <= 40) {
      total += 9 * 6.5;
      total += 10 * 7;
      total += (km - 20) * 8;
    }

    /// กิโลเมตรที่ 41 - 60 คิดกิโลเมตรละ 8.50 บาท
    else if (km <= 60) {
      total += 9 * 6.5;
      total += 10 * 7;
      total += 20 * 8;
      total += (km - 40) * 8.5;
    }

    /// กิโลเมตรที่ 61 - 80 คิดกิโลเมตรละ 9 บาท
    else if (km <= 80) {
      total += 9 * 6.5;
      total += 10 * 7;
      total += 20 * 8;
      total += 20 * 8.5;
      total += (km - 60) * 9;
    }

    /// มากกว่า 80 กิโลเมตร คิดกิโลเมตรละ 10.50 บาท
    else {
      total += 9 * 6.5;
      total += 10 * 7;
      total += 20 * 8;
      total += 20 * 8.5;
      total += 20 * 9;
      total += (km - 80) * 10.5;
    }

    /// ค่ารถติด นาทีละ 3 บาท
    total += trafficMinute * 3;

    /// แสดงผลลัพธ์ค่าโดยสาร
    setFare(total);
  };

  /// function ล้างข้อมูลทั้งหมด
  const clearData = () => {
    setDistance("");
    setTraffic("");
    setFare(0);
  };

  return (
    /// ป้องกัน keyboard บังช่องกรอกข้อมูล
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      {/* ScrollView ทำให้เลื่อนหน้าจอได้ ถ้าจอเล็ก */}
      <ScrollView style={styles.container}>
        {/* Header ด้านบน */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TAXI FARE</Text>
        </View>

        {/* เนื้อหาหลัก */}
        <View style={styles.content}>
          {/* รูป taxi */}
          <Image
            source={require("../assets/images/taxi.png")}
            style={styles.logo}
            resizeMode="contain"
          />

          {/* หัวข้อ */}
          <Text style={styles.title}>คำนวณค่าโดยสารแท็กซี่</Text>

          {/* label ระยะทาง */}
          <Text style={styles.label}>ระยะทาง (กิโลเมตร)</Text>

          {/* input ระยะทาง */}
          <TextInput
            style={styles.input}
            placeholder="กรุณากรอกระยะทาง"
            placeholderTextColor="#777"
            keyboardType="numeric"
            value={distance}
            onChangeText={setDistance}
          />

          {/* label เวลารถติด */}
          <Text style={styles.label}>เวลารถติด (นาที)</Text>

          {/* input เวลารถติด */}
          <TextInput
            style={styles.input}
            placeholder="กรุณากรอกเวลารถติด"
            placeholderTextColor="#777"
            keyboardType="numeric"
            value={traffic}
            onChangeText={setTraffic}
          />

          {/* ปุ่มคำนวณ */}
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={calculateFare}
          >
            <Text style={styles.calculateText}>คำนวณค่าโดยสาร</Text>
          </TouchableOpacity>

          {/* ปุ่มยกเลิก */}
          <TouchableOpacity style={styles.cancelButton} onPress={clearData}>
            <Text style={styles.cancelText}>ยกเลิก</Text>
          </TouchableOpacity>

          {/* กล่องแสดงผลลัพธ์ */}
          <View style={styles.resultBox}>
            <Text style={styles.resultTitle}>ค่าโดยสารแท็กซี่</Text>

            <Text style={styles.resultValue}>{fare.toFixed(2)}</Text>

            <Text style={styles.baht}>บาท</Text>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

/// styles ของหน้า
const styles = StyleSheet.create({
  /// กำหนดให้ KeyboardAvoidingView เต็มหน้าจอ
  keyboard: {
    flex: 1,
  },

  /// พื้นหลังหลักสีดำ
  container: {
    flex: 1,
    backgroundColor: "#0F0F0F",
  },

  /// Header ด้านบน
  header: {
    backgroundColor: "#1A1A1A",
    paddingVertical: 14,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },

  /// ตัวอักษร Header
  headerTitle: {
    color: "#FFD54F",
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 1,
  },

  /// พื้นที่เนื้อหา ลด padding เพื่อให้พอดีจอ iPhone
  content: {
    padding: 16,
  },

  /// รูป taxi ลดขนาดให้พอดีกับหน้าจอ iPhone
  logo: {
    width: 110,
    height: 110,
    alignSelf: "center",
    marginBottom: 10,
  },

  /// หัวข้อหลัก
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 18,
  },

  /// ข้อความ label
  label: {
    color: "#E0E0E0",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 6,
  },

  /// ช่องกรอกข้อมูล
  input: {
    backgroundColor: "#1E1E1E",
    color: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    fontSize: 14,
  },

  /// ปุ่มคำนวณ
  calculateButton: {
    backgroundColor: "#FFD54F",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 10,
  },

  /// ตัวอักษรปุ่มคำนวณ
  calculateText: {
    color: "#000000",
    fontSize: 14,
    fontWeight: "bold",
  },

  /// ปุ่มยกเลิก
  cancelButton: {
    backgroundColor: "#2C2C2C",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 18,
  },

  /// ตัวอักษรปุ่มยกเลิก
  cancelText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },

  /// กล่องผลลัพธ์
  resultBox: {
    backgroundColor: "#1A1A1A",
    width: "100%",
    minHeight: 200,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#333",
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  /// หัวข้อผลลัพธ์
  resultTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },

  /// ตัวเลขผลลัพธ์
  resultValue: {
    color: "#FFD54F",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },

  /// หน่วยบาท
  baht: {
    color: "#BBBBBB",
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
