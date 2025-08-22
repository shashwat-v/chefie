import React from "react";
import { Modal, Pressable, Text, View } from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  email?: string;
};

export default function VerifyEmailDialog({ visible, onClose, email }: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Backdrop */}
      <Pressable
        className="flex-1 bg-black/50 items-center justify-center px-6"
        onPress={onClose}
      >
        {/* Stop press bubbling into backdrop */}
        <View
          className="w-full max-w-md"
          onStartShouldSetResponder={() => true}
        >
          {/* Card */}
          <View className="bg-white rounded-2xl p-5">
            <Text className="text-lg font-semibold mb-1">
              Verify your email
            </Text>
            <Text className="text-neutral-600">
              {email
                ? `We sent a verification link to ${email}. Please check your inbox.`
                : "We sent a verification link to your email. Please check your inbox."}
            </Text>

            <Pressable
              onPress={onClose}
              className="mt-4 rounded-2xl px-4 py-3 bg-red-500 active:bg-red-600"
            >
              <Text className="text-white text-center font-medium">OK</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
}
