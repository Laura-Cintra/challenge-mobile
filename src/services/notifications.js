import * as Notifications from "expo-notifications";

// Configuração global das notificações no foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Solicita permissão
export async function solicitarPermissaoNotificacao() {
  try {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      alert("Permissão para notificações não concedida.");
      return false;
    }

    return true;
  } catch (error) {
    console.log("Erro ao solicitar permissão de notificação:", error);
    return false;
  }
}

// Dispara uma notificação local imediata
export async function dispararNotificacao(title, body) {
  try {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: {
        type: "timeInterval",
        seconds: 1,
        repeats: false,
      },
    });
  } catch (error) {
    console.log("Erro ao disparar notificação local:", error);
  }
}