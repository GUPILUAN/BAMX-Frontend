import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";

export default function AuthScreen() {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLogin, setIsLogin] = useState(true); // Cambia entre login y registro
  const [isResetting, setIsResetting] = useState(false); // Para resetear la contraseña
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setLoading] = useState(false);

  const onSubmit = () => {
    setLoading(true);
    setInterval(() => {
      setLoading(false);
      navigation.navigate("Home");
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white"
      behavior="padding"
      keyboardVerticalOffset={-120}
    >
      <StatusBar style="auto" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="flex-1 justify-center px-4">
          {isLoading && <ActivityIndicator size="large" color="red" />}

          <Text className="font-bold text-xl text-center mb-2 text-black">
            {isResetting
              ? "Ingresa tu email"
              : isLogin
              ? "Iniciar Sesión"
              : "Registro"}
          </Text>

          {successMessage ? (
            <Text className="text-center mb-8 text-green-600">
              {successMessage}
            </Text>
          ) : null}

          {!isLogin && (
            <>
              <Controller
                control={control}
                name="username"
                rules={{ required: "El nombre de usuario es obligatorio" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border border-gray-300 p-2 rounded mb-3 text-black"
                    placeholder="Nombre de usuario"
                    placeholderTextColor="gray"
                    autoComplete="name"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.username && (
                <Text className="mb-8 text-center text-red-700">
                  {errors.username.message}
                </Text>
              )}

              <Controller
                control={control}
                name="phone"
                rules={{ required: "El teléfono es obligatorio" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border border-gray-300 p-2 rounded mb-3 text-black"
                    placeholder="Teléfono"
                    placeholderTextColor="gray"
                    onChangeText={(text) => {
                      const filteredText = text.replace(/\s/g, "");
                      onChange(filteredText);
                    }}
                    value={value}
                    maxLength={value && value.length >= 10 ? 10 : 12}
                    autoComplete="tel"
                    keyboardType="numeric"
                  />
                )}
              />
              {errors.phone && (
                <Text className="mb-8 text-center text-red-700">
                  {errors.phone.message}
                </Text>
              )}
            </>
          )}

          <Controller
            control={control}
            name="email"
            rules={{ required: "El correo es obligatorio" }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border border-gray-300 p-2 rounded mb-3 text-black"
                autoComplete="email"
                keyboardType="email-address"
                placeholder="Correo electrónico"
                placeholderTextColor="gray"
                onChangeText={(text) => {
                  const filteredText = text.replace(/\s/g, "");
                  onChange(filteredText);
                }}
                value={value}
              />
            )}
          />
          {errors.email && (
            <Text className="mb-2 text-center text-red-700">
              {errors.email.message}
            </Text>
          )}

          {!isResetting && (
            <>
              <Controller
                control={control}
                name="password"
                rules={{ required: "La contraseña es obligatoria" }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    className="border border-gray-300 p-2 rounded mb-3 text-black"
                    placeholder="Contraseña"
                    placeholderTextColor="gray"
                    secureTextEntry
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.password && (
                <Text className="mb-2 text-center text-red-700">
                  {errors.password.message}
                </Text>
              )}
            </>
          )}

          {errorMessage && (
            <Text className="mb-2 text-center text-red-700">
              {errorMessage}
            </Text>
          )}

          <View className="relative">
            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="bg-green-500 rounded-full py-4"
            >
              <Text className="text-lg text-white font-bold text-center">
                {isResetting
                  ? "Solicitar restablecimiento de contraseña"
                  : isLogin
                  ? "Iniciar Sesión"
                  : "Registrarse"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsLogin(!isLogin);
                setErrorMessage("");
                setSuccessMessage("");
              }}
            >
              <Text className="mt-4 text-center text-red-600">
                {isResetting
                  ? ""
                  : isLogin
                  ? "¿No tienes una cuenta? Regístrate"
                  : "¿Ya tienes cuenta? Inicia sesión"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsResetting(isLogin ? !isResetting : false);
                setIsLogin(true);
                setErrorMessage("");
                setSuccessMessage("");
              }}
            >
              <Text className="mt-4 text-center text-red-600">
                {!isResetting && isLogin
                  ? "¿Olvidaste tu contraseña?"
                  : "Volver"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
