import { TExcalidrawData } from "./types";

/**
 * Получает превью изображения для сцены Excalidraw
 */
export const getExcalidrawPreview = async (
  sceneId: string,
): Promise<string | null> => {
  try {
    // Используем API Excalidraw для получения превью
    const response = await fetch(
      `https://excalidraw.com/api/v2/scenes/${sceneId}/preview`,
    );

    if (response.ok) {
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    }

    return null;
  } catch (error) {
    console.error("Failed to get Excalidraw preview:", error);
    return null;
  }
};

/**
 * Создает URL для открытия сцены в Excalidraw
 */
export const getExcalidrawSceneUrl = (sceneId?: string): string => {
  if (sceneId) {
    return `https://excalidraw.com/#room=${sceneId}`;
  }
  return "https://excalidraw.com";
};

/**
 * Создает URL для встраивания Excalidraw в iframe
 */
export const getExcalidrawEmbedUrl = (sceneId?: string): string => {
  const baseUrl = "https://excalidraw.com";
  const params = new URLSearchParams({
    embed: "true",
    theme: "light",
    ui: "minimal",
  });

  if (sceneId) {
    params.append("id", sceneId);
  }

  return `${baseUrl}?${params.toString()}`;
};

/**
 * Обрабатывает сообщения от iframe Excalidraw
 */
export const handleExcalidrawMessage = (
  event: MessageEvent,
  onSceneUpdate?: (data: Partial<TExcalidrawData>) => void,
): void => {
  // Проверяем, что сообщение от Excalidraw
  if (
    event.origin !== "https://excalidraw.com" &&
    event.origin !== "https://app.excalidraw.com"
  ) {
    return;
  }

  const { type, data } = event.data;

  switch (type) {
    case "excalidraw-scene-ready":
      console.log("Excalidraw scene ready:", data);
      break;

    case "excalidraw-scene-update":
      if (onSceneUpdate && data.sceneId) {
        onSceneUpdate({
          sceneId: data.sceneId,
          title: data.title,
          description: data.description,
        });
      }
      break;

    case "excalidraw-scene-save":
      console.log("Excalidraw scene saved:", data);
      break;
  }
};
