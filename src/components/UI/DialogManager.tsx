import { useAppDispatch, useAppSelector } from "@app/stores";
import { hideDialog } from "@app/stores/slices/dialog.slice";
import { DialogType } from "@app/stores/types/dialog.types";
import { ThemeType } from "@app/themes";
import images from "assets/images";
import {
  AlertDialog,
  Button,
  HStack,
  Image,
  useTheme,
  VStack,
} from "native-base";
import React from "react";
import TextView from "./TextView";

const DialogManager: React.FC = () => {
  const theme = useTheme() as ThemeType;
  const dispatch = useAppDispatch();
  const {
    isVisible,
    type,
    content,
    title,
    confirmButtonText = "OK",
    cancelButtonText = "Close",
    onConfirm,
    onCancel,
    isCustomizeButton,
  } = useAppSelector((state) => state.dialog);

  const cancelRef = React.useRef(null);

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    } else {
      dispatch(hideDialog());
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      dispatch(hideDialog());
    }
  };

  const getDialogStyles = () => {
    switch (type) {
      case DialogType.ERROR:
        return { color: "red.500", image: images.check_fail };
      case DialogType.WARNING:
        return { color: "yellow.500", image: images.check_warning };
      case DialogType.ALERT:
        return { color: "blue.500", image: images.check_info };
      case DialogType.SUCCESS:
        return {
          color: theme.colors.primary[500],
          image: images.check_success,
        };
      case DialogType.NORMAL:
      default:
        return { color: "blue.500", image: images.check_info };
    }
  };

  const { color, image } = getDialogStyles();

  return (
    <AlertDialog
      isOpen={isVisible}
      onClose={handleCancel}
      leastDestructiveRef={cancelRef}
    >
      <AlertDialog.Content
        borderRadius="lg"
        p={4}
        maxWidth="90%"
        alignSelf="center"
      >
        <VStack alignItems="center" space={4}>
          <TextView
            fontSize="2xl"
            fontWeight="bold"
            color={color}
            textAlign="center"
            numberOfLines={3}
          >
            {title}
          </TextView>
          <Image
            source={image}
            alt="Dialog Icon"
            resizeMode="contain"
            height={100}
            width={100}
          />
          <TextView numberOfLines={20} color={theme.colors.text}>
            {content}
          </TextView>
        </VStack>
        {!isCustomizeButton && (
          <AlertDialog.Footer
            bg="transparent"
            justifyContent="center"
            borderTopWidth={0}
            mt={2}
            px={0}
          >
            <HStack justifyContent="space-around" width="100%" space={2}>
              {type !== DialogType.NORMAL && (
                <Button
                  flex={1}
                  onPress={handleCancel}
                  borderRadius="full"
                  bg="coolGray.200"
                  _text={{ color: "coolGray.700", fontWeight: "bold" }}
                >
                  {cancelButtonText}
                </Button>
              )}
              <Button
                flex={1}
                onPress={handleConfirm}
                borderRadius="full"
                bg={color}
                _text={{ color: "white", fontWeight: "bold" }}
              >
                {confirmButtonText}
              </Button>
            </HStack>
          </AlertDialog.Footer>
        )}
      </AlertDialog.Content>
    </AlertDialog>
  );
};

export default DialogManager;
